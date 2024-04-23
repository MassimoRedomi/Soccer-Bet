document.body.addEventListener('click', event => handleEvent(event));
document.body.addEventListener('change', event => handleEvent(event));

/**
 * Makes a POST request to a specified URL using axios and returns the response data.
 * This function also handles any errors that may occur during the request process.
 *
 * @param {string} url - The URL to which the POST request should be sent.
 * @param {Object} data - The payload to be sent in the POST request. This should be a JSON object.
 * @returns {Promise<Object>} A promise that resolves with the response data if the request is successful.
 * If the request fails, the promise will resolve with an error message, and an alert may be displayed.
 */
function postAxiosQuery(url, data) {
    return axios.post(url, data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (error.response) {
                console.error("Error status:", error.response.status);
                console.error("Error data:", error.response.data);
                console.error("Error headers:", error.response.headers);
                alert(`Error ${error.response.status}: ${error.response.data.message}`);
            } else if (error.request) {
                console.error("Error request:", error.request);
                alert("No response was received from the server.");
            } else {
                console.error("Error message:", error.message);
            }
            console.error("Error config:", error.config);
        });
}


/**
 * Makes a GET request to the specified URL using axios and returns the response data.
 * This function handles different types of errors that might occur during the request.
 *
 * @param {string} url - The URL from which to fetch data.
 * @returns {Promise<Object>} A promise that resolves with the data part of the response if the
 * request is successful. If the request fails, the error is handled internally and logged.
 */
function getAxiosQuery(url) {
    return axios.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (error.response) {
                console.error("Error status:", error.response.status);
                console.error("Error data:", error.response.data);
                alert(`Error ${error.response.status}: ${error.response.data.message}`);
            } else if (error.request) {
                console.error("Error request:", error.request);
                alert("No response was received from the server.");
            } else {
                console.error("Error message:", error.message);
                alert("Error: " + error.message);
            }
            console.error("Error config:", error.config);
        });
}


/**
 * Converts an array of data into HTML strings by applying a rendering function to each item.
 * This function handles errors by ensuring the data is a valid array and that the render function
 * is indeed a function.
 *
 * @param {Array} data - An array of data items that will be converted to HTML.
 * @param {Function} renderFunc - A function that takes a single data item and returns an HTML string.
 * @returns {string} A string containing the HTML representation of all items in the data array,
 *                   concatenated together. Returns an empty string if an error occurs.
 */
function renderDataAsHtml(data, renderFunc) {
    if (!Array.isArray(data)) {
        console.error('Invalid data type. Expected an array but received:', typeof data);
        return '';
    }
    if (typeof renderFunc !== 'function') {
        console.error('Invalid render function. Expected a function but received:', typeof renderFunc);
        return '';
    }

    try {
        return data.map(renderFunc).join('');
    } catch (error) {
        console.error('Error processing data into HTML:', error);
        return '';
    }
}



/**
 * Updates the HTML content of a DOM element identified by its ID, based on the specified update mode.
 * This function allows you to modify the DOM by either replacing the existing content, appending new content,
 * or prepending new content within the selected element.
 *
 * @param {string} elementId - The ID of the DOM element whose content is to be updated.
 * @param {string} htmlContent - The new HTML content to be used for updating the element.
 * @param {string} [updateMode='replace'] - The mode of updating the content. Valid options are:
 *                                         'replace' (default): Replaces the existing content of the element with `htmlContent`.
 *                                         'append': Adds the `htmlContent` to the end of the existing content of the element.
 *                                         'prepend': Adds the `htmlContent` before the existing content of the element.
 */
function updateElementHtml(elementId, htmlContent, updateMode = 'replace') {
    if (typeof elementId !== 'string' || elementId.trim() === '') {
        console.error('Invalid or empty elementId provided.');
        return;
    }
    const container = document.getElementById(elementId);
    if (!container) {
        console.error('Element not found for ID:', elementId);
        return;
    }

    try {
        switch (updateMode) {
            case 'append':
                container.innerHTML += htmlContent;
                break;
            case 'prepend':
                container.innerHTML = htmlContent + container.innerHTML;
                break;
            case 'replace':
            default:
                container.innerHTML = htmlContent;
        }
    } catch (error) {
        console.error('Failed to update HTML content:', error);
    }
}


/**
 * Handles events on elements that match a specific selector by preventing the default action,
 * extracting relevant data from the element, and executing a predefined action based on the data.
 * It logs the data and manages execution based on the element's 'data-action' attribute.
 *
 * @param {Event} event - The event object provided by the event listener.
 *                        This contains all the data about the event, including the target element.
 */
function handleEvent(event) {
    const element = event.target;
    const selector = '.interactable';

    if (element.matches(selector)) {
        event.preventDefault();

        const data = extractDataFromElement(element);

        const actionName = element.getAttribute('data-action');
        const action = actions[actionName];

        if (typeof action === 'function') {
            try {
                action(data);
            } catch (error) {
                console.error('Error executing action:', error);
            }
        } else {
            console.warn('Action not found:', actionName);
        }
    }
}


/**
 * Extracts data from a DOM element based on its type. This function determines the element's type and
 * delegates the data extraction to the appropriate helper function. It handles select elements, forms, and elements
 * with data attributes.
 *
 * @param {HTMLElement} element - The element from which data is to be extracted.
 * @returns {Object} An object containing key-value pairs of extracted data.
 */
function extractDataFromElement(element) {
    try {
        if (!element) {
            throw new Error("No element provided for data extraction.");
        }

        let data = {};
        const tagName = element.tagName.toLowerCase();

        switch (tagName) {
            case 'select':
                data = extractFromSelect(element);
                break;
            case 'form':
                data = extractFromForm(element);
                break;
            default:
                data = extractFromDataAttributes(element);
                break;
        }

        return data;
    } catch (error) {
        console.error('Failed to extract data:', error);
        return {};
    }
}

/**
 * Extracts data from a select element.
 * @param {HTMLElement} select - The select element.
 * @returns {Object} An object containing the select name and its value.
 */
function extractFromSelect(select) {
    return { [select.name]: select.value };
}

/**
 * Extracts data from a form element using FormData to handle inputs, including files.
 * @param {HTMLFormElement} form - The form element.
 * @returns {Object} An object with key-value pairs representing form data.
 */
function extractFromForm(form) {
    const formData = new FormData(form);
    let data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
}

/**
 * Extracts data from an element's data attributes.
 * @param {HTMLElement} element - Any HTML element with data attributes.
 * @returns {Object} An object containing key-value pairs from the data attributes.
 */
function extractFromDataAttributes(element) {
    let data = {};
    Object.entries(element.dataset).forEach(([key, value]) => {
        data[key] = value;
    });
    return data;
}


/**
 * Toggles the visibility of list items in a container based on a given limit.
 * Initially hides items beyond the limit and provides a button to toggle their visibility.
 *
 * @param {string} elementId - The ID of the container element whose items are to be toggled.
 * @param {string} buttonId - The ID of the button used to toggle visibility.
 * @param {number} limit - The number of items to show initially; items beyond this are toggled.
 */
function toggleItemVisibility(elementId, buttonId, limit) {
    const button = document.getElementById(buttonId);
    const container = document.getElementById(elementId);

    if (!button || !container) {
        console.error('Element not found for provided ID:', elementId, 'or', buttonId);
        return;
    }

    let items = container.querySelectorAll('.item');
    if (!items.length) {
        console.error('No items found within the container:', elementId);
        return;
    }

    if (typeof button.isLimited === 'undefined') {
        button.isLimited = true;
    }

    if (button.isLimited) {
        items.forEach((item, index) => {
            if (index >= limit) {
                item.style.display = 'block';
            }
        });
        button.textContent = 'Show Less';
        button.isLimited = false;
    } else {
        items.forEach((item, index) => {
            if (index >= limit) {
                item.style.display = 'none';
            }
        });
        button.textContent = 'Show More';
        button.isLimited = true;
    }
}


/**
 * Initializes the visibility of items in a specified container by showing only a limited number
 * of items initially. All items beyond this limit are hidden. Also sets the initial text for a toggle button.
 *
 * @param {string} elementId - The ID of the container element that holds the items.
 * @param {string} buttonId - The ID of the button used to expand or collapse the items list.
 * @param {number} limit - The maximum number of items to be displayed initially.
 */
function initializeItemsVisibility(elementId, buttonId, limit) {
    const container = document.getElementById(elementId);
    if (!container) {
        console.error('Failed to find the container with ID:', elementId);
        return;
    }

    const items = container.querySelectorAll('.item');
    if (items.length === 0) {
        console.error('No items found within the container:', elementId);
        return;
    }

    items.forEach((item, index) => {
        item.style.display = index < limit ? '' : 'none';
    });

    const button = document.getElementById(buttonId);
    if (button) {
        button.textContent = 'Show More';
        button.isLimited = true;
    } else {
        console.error('Failed to find the button with ID:', buttonId);
    }
}