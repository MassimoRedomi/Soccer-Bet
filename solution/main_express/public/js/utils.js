let breadcrumbs = [];
let selectedlist= [];


/**
 * Fetches data from the given URL (using POST if data is provided, otherwise GET), renders HTML content from the data using the provided content function, and updates the specified HTML element with the generated content.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {string} elementId - The ID of the HTML element to update with the fetched data.
 * @param {Function} contentFn - A function that takes the fetched data and returns HTML content as a string.
 * @param {Object|null} data - Optional. If provided, a POST request is made with this data; otherwise, a GET request is made.
 * @returns {Promise<Object|null>} - The fetched data if successful, or null if an error occurs.
 */
async function fetchAndUpdate(url, elementId, contentFn, data = null) {
    try {
        const responseData = data ? await postAxiosQuery(url, data) : await getAxiosQuery(url);
        const htmlContent = renderDataAsHtml(Array.isArray(responseData) ? responseData : [responseData], contentFn);
        updateElementHtml(elementId, htmlContent, 'replace');
        return responseData;
    } catch (error) {
        console.error(`Error in fetchAndUpdateElement function for URL ${url}:`, error);
        updateElementHtml(elementId, `<p class="text-white">Error loading data.</p>`, 'replace');
        return null;
    }
}



function autoSelectionClass(data) {
    const keys = ['season', 'type', 'nationlist', 'gamef', 'nation'];

    keys.forEach(key => {
        if (data[key]) {
            document.querySelectorAll(`.selected-${key}`).forEach(container => {
                container.classList.remove('selected');
            });
        }
    });

    selectedlist = selectedlist.filter(crumb => keys.includes(crumb.key));
    keys.forEach(key => {
        if (data[key]) {
            const existingCrumb = selectpath.find(crumb => crumb.key === key);
            if (existingCrumb) {
                existingCrumb.value = data[key];
            } else {
                selectpath.push({ key: key, value: data[key] });
            }
        }
    });

    selectpath.forEach(crumb => {
        if (data[crumb.key]) {
            const selector = `[data-${crumb.key}="${crumb.value}"]`;
            const selectedContainer = document.querySelector(selector)?.closest(`.selected-${crumb.key}`);
            if (selectedContainer) {
                selectedContainer.classList.add('selected');
            }
        }
    });
}


function chargeBreadCrumbs(data){
    const keys = ['nation', 'season', 'name', 'clubname'];
    keys.forEach(key => {
        if (data[key]) {
            const existingCrumbIndex = breadcrumbs.findIndex(crumb => crumb.key === key);
            if (existingCrumbIndex !== -1) {
                breadcrumbs[existingCrumbIndex].value = data[key];
            } else {
                breadcrumbs.push({ key: key, value: data[key] });
            }
        }
    });

    const sortedBreadcrumbs = keys
        .map(key => breadcrumbs.find(crumb => crumb.key === key))
        .filter(crumb => crumb);

    const breadcrumbsHtml = sortedBreadcrumbs.map((crumb, index) =>
        `<span>${actions.toUpperCase(crumb.value)}${index < sortedBreadcrumbs.length - 1 ? ' > ' : ''}</span>`
    ).join('');

    const wrappedBreadcrumbsHtml = `<h4 class="text-white">${breadcrumbsHtml}</h4>`;
    updateElementHtml('breadcrumbs', wrappedBreadcrumbsHtml, 'replace');
}
