defaultValue={nation: "Greece"};

function getInitialData() {
    const endpoints = [
        { url: '/api/clubs-names', elementId: 'clubs', contentFn: content.createClubsContent },
        { url: '/api/champions', elementId: 'champions', contentFn: content.createChampionsContent },
        { url: '/api/soccer-nations', elementId: 'nations', contentFn: content.createNationsListContent },
        { url: '/api/soccer-nations', elementId: 'nation_dropdown', contentFn: content.createNationsDropdownContent },
        { url: '/api/soccer-nations', elementId: 'language', contentFn: content.createLanguageContent},
        { url: '/api/champions', elementId: 'championChat', contentFn: content.createChampionChatContent}
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
    actions.controllerSoccerData(defaultValue);

});