function postInitialData() {
    const defaultinfo={nation: "Italy"};
    const endpoints = [
        {url: '/api/send-country', data:defaultinfo, elementId:'champions_nation_list', contentFn: content.createNationsListContent}
    ];

    const dataFetchPromises = endpoints.map(endpoint =>{
        console.log(endpoint.data);
        return postAxiosQuery(endpoint.url, endpoint.data)
            .then(data =>{
                const htmlContent = renderDataAsHtml(data, endpoint.contentFn);
                updateElementHtml(endpoint.elementId, htmlContent, 'replace');
            })
            .catch(error => {
               console.error(`Failed to load data from ${endpoint.url}:`, error);
               updateElementHtml(endpoint.elementId, `<p class="text-white">Error loading data</p>`, 'replace');
               return null;
            });
    });

    Promise.all(dataFetchPromises).then(() => {
        actions.initDefaultInfo(defaultinfo);
    }).catch(error => {
        console.error('Error initializing default information after data load:', error);
    });
}

function getInitialData() {
    const endpoints = [
        { url: '/api/clubs-names', elementId: 'clubs', contentFn: content.createClubsContent },
        { url: '/api/champions', elementId: 'champions', contentFn: content.createChampionsContent },
        { url: '/api/soccer-nations', elementId: 'nations', contentFn: content.createNationsListContent },
        { url: '/api/soccer-nations', elementId: 'nation_dropdown', contentFn: content.createNationsDropdownContent }
    ];

    const dataFetchPromises = endpoints.map(endpoint => {
        return getAxiosQuery(endpoint.url)
            .then(data => {
                const htmlContent = renderDataAsHtml(data, endpoint.contentFn);
                updateElementHtml(endpoint.elementId, htmlContent, 'replace');
            })
            .catch(error => {
                console.error(`Failed to load data from ${endpoint.url}:`, error);
                updateElementHtml(endpoint.elementId, `<p class="text-white">Error loading data.</p>`, 'replace');
                return null;
            });
    });

    Promise.all(dataFetchPromises).then(() => {
        actions.initVisibilityHandlers();
    }).catch(error => {
        console.error('Error initializing visibility handlers after data load:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    getInitialData();
    postInitialData();

});