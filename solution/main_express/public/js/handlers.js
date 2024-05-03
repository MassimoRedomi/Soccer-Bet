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
                                                actions.updateSelectOptions('nation_dropdown', data );
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
    loadChampionsChats: data               =>{
                                                    const languageNameElement = document.getElementById('languageName');
                                                    const languageContainer= document.getElementById('languageChampionContainer');
                                                    const startChatButton = document.getElementById('startChatButton');

                                                    if (!languageNameElement) {
                                                        console.error("The languageName element does not exist in the DOM.");
                                                        return;
                                                    }

                                                    languageNameElement.innerHTML = `Nation selected: ${data.language}`;
                                                    languageContainer.style.display = 'block';
                                                    startChatButton.setAttribute('data-language', data.language);
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
                                                if (actions.validateLoginData(data, 'loginErrors')) {
                                                    postAxiosQuery('/api/login', data)
                                                        .then(response => {
                                                            if (response.message === 'OK') {
                                                                actions.closeModal();
                                                                checkLoginStatus();
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
                                                if(actions.validateSigninData(data, 'passwordErrors')){
                                                    postAxiosQuery('/api/signup', data)
                                                        .then(data => actions.moveToLogin(data))
                                                        .catch(error =>{
                                                            console.error(`Failed to load data from /api/signup:`, error);
                                                            updateElementHtml('congrats', `<h3 class="text-white">We are sorry! Your account wasn't created</h3>`, 'replace');
                                                            updateElementHtml('congrats2', `<p class="text-white">Please try again later! We are working at the problem</p>`, 'replace');
                                                            return null;
                                                        });
                                                }
                                             },
    validateSigninData: (data, elementId)=> {
                                                const mail = data.email;
                                                const password1 = data.password1;
                                                const password2 = data.password2;

                                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                                if (!emailRegex.test(mail)) {
                                                    updateElementHtml(elementId, '<p class="text-red">Invalid email format.</p>', 'replace');
                                                    return false;
                                                }

                                                if (password1 !== password2) {
                                                    updateElementHtml(elementId, '<p class="text-red">Passwords do not match.</p>', 'replace');
                                                    return false;
                                                }

                                                if (password1.length < 8 || password1.length > 72) {
                                                    updateElementHtml(elementId, '<p class="text-red">Password must be between 8 and 72 characters.</p>', 'replace');
                                                    return false;
                                                }

                                                const hasUppercase = /[A-Z]/.test(password1);
                                                const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password1);

                                                if (!hasUppercase || !hasSymbol) {
                                                    updateElementHtml(elementId, '<p class="text-red">Password must contain at least one uppercase letter and one symbol.</p>', 'replace');
                                                    return false;
                                                }

                                                return true;
                                             },
    validateLoginData: (data, elementId) =>  {
                                                const email = data.email;
                                                const password = data.password;
                                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for validating email

                                                if (!emailRegex.test(email)) {
                                                    updateElementHtml(elementId, '<p class="text-red">Invalid email format.</p>', 'replace');
                                                    return false;
                                                }

                                                if (password.length < 8 || password.length > 72) {
                                                    updateElementHtml(elementId, '<p class="text-red">Password must be between 8 and 72 characters.</p>', 'replace');
                                                    return false;
                                                }

                                                return true;

                                                },
    moveToLogin: data                        => {
        console.log('we are here');
                                                    const modaLogin = document.getElementById('loginModal');
                                                    const modalSign = document.getElementById('signinModal');
                                                    updateElementHtml('congrats', '<h3>Congratulations! Your account is created</h3>', 'replace');
                                                    updateElementHtml('congrats2', '<p>Welcome, do your first login</p>', 'replace');
                                                    modaLogin.style.display = 'block';
                                                    modalSign.style.display = 'none';
                                                },
    updateSelectOptions: (selectId, defaultValue) => {
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
                                                },
    userLogout: ()                     => {
                                                        fetch('/api/logout')
                                                            .then(response => {
                                                                if (response.ok) {
                                                                    checkLoginStatus();
                                                                }
                                                                throw new Error('Failed to log out.');
                                                            })
                                                            .catch(error => {
                                                                console.error('Logout failed:', error);
                                                            });
                                                },
    updateLoginUI: (text, action)      => {
                                                    const loginLink = document.getElementById('nav-login');
                                                    loginLink.innerHTML = `<h6>${text}</h6>`;
                                                    loginLink.setAttribute('data-action', action);
                                                },
    setUserName: async ()                    => {
                                                    const userNameElement = document.getElementById('userName');
                                                    const startChatButton = document.getElementById('startChatButton');

                                                    if (!userNameElement) {
                                                        console.error("The userName element does not exist in the DOM.");
                                                        return;
                                                    }

                                                    try {
                                                        const response = await fetch('/api/userinfo');
                                                        if (!response.ok) {
                                                            throw new Error('Failed to fetch user information from the server');
                                                        }

                                                        const data = await response.json();
                                                        if (data) {
                                                            userNameElement.innerHTML = `Welcome, ${data}!`;
                                                            startChatButton.setAttribute('data-userName', data);
                                                            localStorage.setItem('userEmail', data);
                                                        } else {
                                                            userNameElement.innerHTML = `<h4>Guest</h4>`;
                                                            console.log("No email address available for the user.");
                                                        }
                                                    } catch (error) {
                                                        console.error('Error retrieving user information:', error);
                                                        userNameElement.innerHTML = `<h4>Error loading user data</h4>`;
                                                        activateSection('news');
                                                    }
                                                },
    formatNames:    inputString              => {
                                                    const names = inputString.split('-');
                                                    const capitalizedNames = names.map(name => {
                                                        if (name) {
                                                            return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                                                        }
                                                        return '';
                                                    });
                                                    return capitalizedNames.join(' ');
                                                },
    loadChampionChat: data                           => {
                                                    const championLanguageElement = document.getElementById('championLanguageName');
                                                    const championLanguageInfo= document.getElementById('championLanguageInfo');
                                                    const startChatButton = document.getElementById('startChatButton');

                                                    if (!championLanguageElement) {
                                                        console.error("The languageName element does not exist in the DOM.");
                                                        return;
                                                    }

                                                    championLanguageElement.innerHTML = `Champion chat selected: ${actions.formatNames(data.champion)}`;
                                                    championLanguageInfo.innerHTML= `Start your conversation by pressing the button above`;
                                                    championLanguageInfo.style.display = 'block';
                                                    startChatButton.style.display = 'block';
                                                    startChatButton.setAttribute('data-champion', data.champion);
                                                },
    startChat: data                          => {
                                                    connectToRoom(data.champion, data.username);
                                                }

};
