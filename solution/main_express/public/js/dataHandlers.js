const actions = {
    loadMoreLessChampions: () => toggleItemVisibility('champions', 'toggleChampions', 14),
    loadMoreLessClubs: ()     => toggleItemVisibility('clubs', 'toggleClubs', 14)
};

const content = {
    createClubsContent:             data => `<div class="item my-2">
                                                <a href="#" class="champion-link links d-flex align-items-center" data-club="${data.clubId}">
                                                    <img src="images/football-club.svg" alt="Offers" class="svg-container me-2">
                                                    <p class="mb-0">${data.name}</p>
                                                </a>
                                             </div>`,
    createNationsDropdownContent:   data => `<option value="${data.name}">${data.name}</option>`,
    createNationsListContent:       data => `<div class="item my-2">
                                                <a href="#" class="nation-link links d-flex align-items-center" data-nation="${data.name}">
                                                    <div class="svg-container me-2">${data.sig}</div>
                                                    ${data.name}
                                                </a>
                                            </div>`,
    createChampionsContent:         data => `<div class="item my-2">
                                                <a href="#" class="champion-link links d-flex align-items-center" data-champion="${data.competitionId}">
                                                    <div class="svg-container me-2">${data.sig}</div>
                                                    <p class="mb-0">${data.name}</p>
                                                </a>
                                            </div>`
};

function initializeClubsHandlers() {
    initializeItemsVisibility('clubs', 'toggleClubs', 14);
}

function initializeChampionsHandlers() {
    initializeItemsVisibility('champions', 'toggleChampions', 14);
}

function initializeNationsListHandlers() {
    // Add event handlers specific to nations list content
}

function initializeNationsDropdownHandlers() {
    // Add event handlers specific to nations dropdown content
}

document.addEventListener('DOMContentLoaded', function () {
    function loadData() {
        getAxiosQuery('/api/clubs-names')
            .then(data => {
                const htmlContent = renderDataAsHtml(data, content.createClubsContent);
                updateElementHtml('clubs', htmlContent, 'replace');
                initializeClubsHandlers();
            })
            .catch(error => {
                console.error('Failed to load club data:', error);
                updateElementHtml('clubs', '<p>Error loading club data.</p>', 'replace');
            });

        getAxiosQuery('/api/champions')
            .then(data => {
                const htmlContent = renderDataAsHtml(data, content.createChampionsContent);
                updateElementHtml('champions', htmlContent, 'replace');
                initializeChampionsHandlers();
            })
            .catch(error => {
                console.error('Failed to load champion data:', error);
                updateElementHtml('champions', '<p>Error loading champion data.</p>', 'replace');
            });

        getAxiosQuery('/api/soccer-nations')
            .then(data =>{
                const htmlContent=renderDataAsHtml(data, content.createNationsListContent);
                updateElementHtml('nations', htmlContent, 'replace');
                initializeNationsListHandlers();
            })
            .catch(error =>{
                console.error('Failed to load nations data:', error);
                updateElementHtml('nations', '<p>Error loading nations data</p>', 'replace');
            });

        getAxiosQuery('/api/soccer-nations')
            .then(data =>{
                const htmlContent=renderDataAsHtml(data, content.createNationsDropdownContent);
                updateElementHtml('nation_dropdown', htmlContent, 'replace');
                initializeNationsDropdownHandlers()
            })
            .catch(error =>{
                console.error('Failed to load nations data:', error);
                updateElementHtml('nation_dropdown', '<p>Error loading nations data</p>', 'replace');
            });
    }

    loadData();
});


