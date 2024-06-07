const actions = {
    async controllerSoccerData(data) {
        try {
            activateSection('stats');

            if (data.nation) {
                actions.updateSelectOptions('nation_dropdown', data);
                const championsData = await actions.chargeChampions(data);
                let formattedData = championsData.map(item => ({ competitionId: item.competitionId }));
                let competitionId = formattedData[0];
                const seasonsData= await actions.chargeSeasons(competitionId);
                let championAndSeason = {competition_id: seasonsData[0].competition_id, season: seasonsData[0].season};
                let nameAndSeason = [{ name : actions.formatNames(championsData[0].name), season: seasonsData[0].season}];
                actions.chargeBreadCrumbs(nameAndSeason);
                const gamesData= await actions.chargeGames(championAndSeason);
                let clubId= {clubId: gamesData[0].home_club_id};
                const clubPlayersData = await actions.chargePlayers(clubId);
            }
            if (data.club) {
                const clubPlayersData = await actions.chargePlayers({clubId: data.club});
            }
            if (data.champion) {
                actions.updateSelectOptions('nation_dropdown', {nation: data.country});
                const championsData = await actions.chargeChampions({nation: data.country});
                const seasonsData= await actions.chargeSeasons({competitionId: data.champion});
                let championAndSeason = {competition_id: data.champion, season: seasonsData[0].season};
                let nameAndSeason = [{ name : actions.formatNames(data.name), season: seasonsData[0].season}];
                actions.chargeBreadCrumbs(nameAndSeason);
                const gamesData= await actions.chargeGames(championAndSeason);
                let clubId= {clubId: gamesData[0].home_club_id};
                const clubPlayersData = await actions.chargePlayers(clubId);
            }

            if (data.season) {
                const gamesData= await actions.chargeGames({competition_id: data.competition, season: data.season});
                let clubId= {clubId: gamesData[0].home_club_id};
                const clubPlayersData = await actions.chargePlayers(clubId);
            }
        } catch (error) {
            console.error('Error processing data:', error);
            updateElementHtml('nation_dropdown', '<p class="text-white">Error loading data</p>', 'replace');
        }
    },
    chargeChampions: async (data) => {
        const championsData = await postAxiosQuery('/api/send-country', data);
        const ChampionsHtmlContent = renderDataAsHtml(championsData, content.createChampionsContent);
        updateElementHtml('champions_nation_list', ChampionsHtmlContent, 'replace');
        return championsData;
    },
    chargeSeasons: async (data) => {
        const seasonsData= await postAxiosQuery('/api/seasons_by_champion', data);
        const SeasonsHtmlContent = renderDataAsHtml(seasonsData, content.createSeasonsContent);
        updateElementHtml('champions_years', SeasonsHtmlContent, 'replace');
        return seasonsData;
    },
    chargeGames: async (data) => {
        const gamesData= await postAxiosQuery('/api/games_by_championNseason', data);
        const GamesHtmlContent = renderDataAsHtml(gamesData, content.createGamesContent);
        updateElementHtml('gamesxchampion', GamesHtmlContent, 'replace');
        return gamesData;
    },
    chargePlayers: async (data) => {
        const clubPlayersData = await postAxiosQuery('/api/clubplayers', data);
        const ClubPlayersHtmlContent = renderDataAsHtml(clubPlayersData, content.createClubPlayersContent);
        updateElementHtml('clubPlayers', ClubPlayersHtmlContent, 'replace');
        return clubPlayersData;
    },
    chargeBreadCrumbs: data => {
        const GamesBreadHtmlContent   = renderDataAsHtml(data, content.createBreadCrumbsContent);
        updateElementHtml('breadcrumbs', GamesBreadHtmlContent ,'replace');
    },

    /**
     * Toggles the visibility of items in the "champions" section.
     * @function
     */
    loadMoreLessChampions: () => toggleItemVisibility('champions', 'toggleChampions', 14),

    /**
     * Toggles the visibility of items in the "clubs" section.
     * @function
     */
    loadMoreLessClubs: () => toggleItemVisibility('clubs', 'toggleClubs', 14),

    /**
     * Initializes visibility handlers for multiple elements.
     * @function
     */
    initVisibilityHandlers: () => {
        const configurations = [
            { elementId: 'clubs', buttonId: 'toggleClubs', limit: 14 },
            { elementId: 'champions', buttonId: 'toggleChampions', limit: 14 }
        ];

        configurations.forEach(config => {
            initializeItemsVisibility(config.elementId, config.buttonId, config.limit);
        });
    },

    /**
     * Loads chat information for champions based on the selected language.
     * @function
     * @param {Object} data - The data containing language information.
     */
    loadChampionsChats: data => {
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

    /**
     * Opens the login modal.
     * @function
     */
    openLoginModal: () => {
        const modaLogin = document.getElementById('loginModal');
        const modalSign = document.getElementById('signinModal');
        modaLogin.style.display = 'block';
        modalSign.style.display = 'none';
    },

    /**
     * Closes both login and signup modals.
     * @function
     */
    closeModal: () => {
        const modaLogin = document.getElementById('loginModal');
        const modaSign = document.getElementById('signinModal');
        modaLogin.style.display = 'none';
        modaSign.style.display = 'none';
    },

    /**
     * Opens the signup modal.
     * @function
     */
    openSignModal: () => {
        const modaLogin = document.getElementById('loginModal');
        const modalSign = document.getElementById('signinModal');
        modaLogin.style.display = 'none';
        modalSign.style.display = 'block';
    },

    /**
     * Sends a login request to the server.
     * @function
     */
    sendLoginRequest: () => {
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

    /**
     * Sends a signup request to the server.
     * @function
     */
    sendSignRequest: () => {
        const form = document.getElementById('signForm');
        const data = extractDataFromElement(form);
        if (actions.validateSigninData(data, 'passwordErrors')) {
            postAxiosQuery('/api/signup', data)
                .then(data => actions.moveToLogin(data))
                .catch(error => {
                    console.error(`Failed to load data from /api/signup:`, error);
                    updateElementHtml('congrats', `<h3 class="text-white">We are sorry! Your account wasn't created</h3>`, 'replace');
                    updateElementHtml('congrats2', `<p class="text-white">Please try again later! We are working at the problem</p>`, 'replace');
                    return null;
                });
        }
    },

    /**
     * Validates the signup data.
     * @function
     * @param {Object} data - The signup data.
     * @param {string} elementId - The element ID to display validation errors.
     * @returns {boolean} - Returns true if data is valid, otherwise false.
     */
    validateSigninData: (data, elementId) => {
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

    /**
     * Validates the login data.
     * @function
     * @param {Object} data - The login data.
     * @param {string} elementId - The element ID to display validation errors.
     * @returns {boolean} - Returns true if data is valid, otherwise false.
     */
    validateLoginData: (data, elementId) => {
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

    /**
     * Moves the user to the login modal after successful signup.
     * @function
     * @param {Object} data - The data returned from the signup request.
     */
    moveToLogin: data => {
        console.log('we are here');
        const modaLogin = document.getElementById('loginModal');
        const modalSign = document.getElementById('signinModal');
        updateElementHtml('congrats', '<h3>Congratulations! Your account is created</h3>', 'replace');
        updateElementHtml('congrats2', '<p>Welcome, do your first login</p>', 'replace');
        modaLogin.style.display = 'block';
        modalSign.style.display = 'none';
    },

    /**
     * Updates select options based on provided data.
     * @function
     * @param {string} selectId - The ID of the select element to update.
     * @param {Object} defaultValue - The default value to set in the select options.
     */
    updateSelectOptions: (selectId, defaultValue) => {
        const selectElement = document.getElementById(selectId);
        if (!selectElement) {
            console.error('Select element not found:', selectId);
            return;
        }

        const options = Array.from(selectElement.options).map(option => ({ name: option.value }));

        const optionsHtml = options.map(option => {
            const isSelected = option.name === defaultValue.nation ? ' selected' : '';
            return `<option value="${option.name}"${isSelected}>${option.name}</option>`;
        }).join('');

        selectElement.innerHTML = optionsHtml;
    },

    /**
     * Logs the user out by sending a request to the server.
     * @function
     */
    userLogout: () => {
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

    /**
     * Updates the login UI with provided text and action.
     * @function
     * @param {string} text - The text to display.
     * @param {string} action - The action to set.
     */
    updateLoginUI: (text, action) => {
        const loginLink = document.getElementById('nav-login');
        loginLink.innerHTML = `<h6>${text}</h6>`;
        loginLink.setAttribute('data-action', action);
    },

    /**
     * Sets the username in the UI after fetching user information.
     * @async
     * @function
     */
    setUserName: async () => {
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

    /**
     * Formats names by capitalizing the first letter of each name part.
     * @function
     * @param {string} inputString - The input string to format.
     * @returns {string} - The formatted name string.
     */
    formatNames: inputString => {
        const names = inputString.split('-');
        const capitalizedNames = names.map(name => {
            if (name) {
                return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            }
            return '';
        });
        return capitalizedNames.join(' ');
    },

    /**
     * Loads chat information for a selected champion.
     * @function
     * @param {Object} data - The data containing champion information.
     */
    loadChampionChat: data => {
        const championLanguageElement = document.getElementById('championLanguageName');
        const championLanguageInfo= document.getElementById('championLanguageInfo');
        const startChatButton = document.getElementById('startChatButton');

        if (!championLanguageElement) {
            console.error("The languageName element does not exist in the DOM.");
            return;
        }

        championLanguageElement.innerHTML = `Champion chat selected: ${actions.formatNames(data.champion)}`;
        championLanguageInfo.innerHTML = `Start your conversation by pressing the button above`;
        championLanguageInfo.style.display = 'block';
        startChatButton.style.display = 'block';
        startChatButton.setAttribute('data-champion', data.champion);
    },

    /**
     * Starts a chat session by connecting to the chat room.
     * @function
     * @param {Object} data - The data containing champion and username information.
     */
    startChat: data => {
        connectToRoom(data.champion, data.username);
    }
};
