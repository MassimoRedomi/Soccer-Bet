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
    loadConnectedDataNation: data         => {
                                                activateSection('stats');
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