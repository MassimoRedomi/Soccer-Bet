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

                                             },
    openLoginModal: ()              => {
                                                const modaLogin = document.getElementById('loginModal');
                                                const modalSign = document.getElementById('signinModal');
                                                modaLogin.style.display = 'block';
                                                modalSign.style.display = 'none';
                                             },
    closeModal: ()                  => {
                                                const modaLogin = document.getElementById('loginModal');
                                                const modaSign = document.getElementById('signinModal');
                                                modaLogin.style.display = 'none';
                                                modaSign.style.display = 'none';
                                             },
    openSignModal: ()               => {
                                                const modaLogin = document.getElementById('loginModal');
                                                const modalSign = document.getElementById('signinModal');
                                                modaLogin.style.display = 'none';
                                                modalSign.style.display = 'block';
                                             },
    sendLoginRequest: ()              => {
                                                const form = document.getElementById('loginForm');
                                                const data = extractDataFromElement(form);

                                                if (validateLoginData(data, 'loginErrors')) {
                                                    postAxiosQuery('/api/login', data)
                                                        .then(response => {
                                                            if (response.message === 'OK') {
                                                                fullContentAfterLogin(response);
                                                            } else {
                                                                updateElementHtml('loginErrors', `<p class="text-red">${response.message}</p>`, 'replace');
                                                            }
                                                        })
                                                        .catch(error => {
                                                            console.error(`Failed to load data from /api/login:`, error);
                                                            const errorMessage = (error.response && error.response.data && error.response.data.message)
                                                                                            ? error.response.data.message
                                                                                            : 'Login failed due to wrong password. Please try again.';
                                                            updateElementHtml('loginErrors', `<p class="text-red">${errorMessage}</p>`, 'replace');
                                                        });
                                                }
                                             },
    sendSignRequest: ()             => {
                                                const form = document.getElementById('signForm');
                                                data = extractDataFromElement(form);
                                                if(validateSigninData(data, 'passwordErrors')){
                                                    postAxiosQuery('/api/signup', data)
                                                        .then(data => moveToLogin(data))
                                                        .catch(error =>{
                                                            console.error(`Failed to load data from /api/signup:`, error);
                                                            updateElementHtml('congrats', `<h3 class="text-white">We are sorry! Your account wasn't created</h3>`, 'replace');
                                                            updateElementHtml('congrats2', `<p class="text-white">Please try again later! We are working at the problem</p>`, 'replace');
                                                            return null;
                                                        });
                                                }

                                             }

};
