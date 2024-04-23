const actions = {
    loadMoreLessChampions:  ()      => toggleItemVisibility('champions', 'toggleChampions', 14),
    loadMoreLessClubs:      ()      => toggleItemVisibility('clubs', 'toggleClubs', 14),
    initVisibilityHandlers: ()      => {
                                                const configurations = [
                                                    { elementId: 'clubs', buttonId: 'toggleClubs', limit: 14 },
                                                    { elementId: 'champions', buttonId: 'toggleChampions', limit: 14 }
                                                ];

                                                configurations.forEach(config => {
                                                    initializeItemsVisibility(config.elementId, config.buttonId, config.limit);
                                                });
                                             },
    initDefaultInfo:         data         => {
                                                updateSelectOptions('nation_dropdown', data );
                                             },
    loadConnectedDataNation: data         => {
                                                activateSection('stats');
                                                actions.initDefaultInfo(data);
                                                postAxiosQuery('/api/send-country', data)
                                                    .then(data =>{
                                                        const htmlContent = renderDataAsHtml(data, content.createChampionsContent);
                                                        updateElementHtml('champions_nation_list', htmlContent, 'replace');
                                                    })
                                                    .catch(error =>{
                                                        console.error('Failed to load champions data on stats:', error);
                                                        updateElementHtml('nation_dropdown', '<p class="text-white">Error loading champions data</p>', 'replace');
                                                    });

                                             }
};


/**
 * Updates the select dropdown options marking the specified default value as selected.
 *
 * @param {string} selectId - The ID of the select element to update.
 * @param {string} defaultValue - The value that should be marked as selected in the dropdown.
 */
function updateSelectOptions(selectId, defaultValue) {
    const selectElement = document.getElementById(selectId);
    if (!selectElement) {
        console.error('Select element not found:', selectId);
        return;
    }

    const options = Array.from(selectElement.options).map(option => ({name: option.value}));

    const optionsHtml = options.map(option => {
        const isSelected = option.name === defaultValue.nation ? ' selected' : '';
        return `<option value="${option.name}"${isSelected}>${option.name}</option>`;
    }).join('');

    selectElement.innerHTML = optionsHtml;
}

