const breadcrumbs = [];
let selectpath= [];

const actions = {
    async controllerSoccerData(data) {
        const endpoints = [
            { url: '/api/send-country', elementId:'champions_nation_list', contentFn: content.createChampionsContent },
            { url: '/api/seasons_by_champion', elementId: 'champions_years', contentFn: content.createSeasonsContent },
            { url: '/api/games_by_championNseason', elementId: 'gamesxchampion', contentFn:content.createGamesContent },
            { url: '/api/clubplayers', elementId: 'clubPlayers', contentFn: content.createClubPlayersContent },
            { url: '/api/competitionbyid', elementId:'dataDisplay', contentFn: content.createCompetitionDisplayContent},
            { url: '/api/gamebyid', elementId: 'dataDisplay', contentFn: content.createGameDisplayContent}
        ];

        try {
            activateSection('stats');
            if (data.club) {
                await actions.charge({clubId: data.club}, endpoints[3].url, endpoints[3].elementId, endpoints[3].contentFn);
            } else if (data.game){
                const gameData= await actions.charge({game_id: data.game}, endpoints[5].url, endpoints[5].elementId, endpoints[5].contentFn);
                await actions.controllerGameData(data);
                await actions.controllerSoccerData({club: gameData.home_club_id});
            } else if (data.season) {
                const gamesData = await actions.charge({competition_id: data.competition, season: data.season}, endpoints[2].url, endpoints[2].elementId, endpoints[2].contentFn);
                updateElementHtml('championName', `<h4 class="text-white bold">${actions.toUpperCase(data.name)}</h4>`, 'replace');
                await actions.controllerSoccerData({game: gamesData[0].game_id});
            } else if (data.champion) {
                const seasonsData = await actions.charge({competitionId: data.champion}, endpoints[1].url, endpoints[1].elementId, endpoints[1].contentFn);
                await actions.controllerSoccerData({competition: seasonsData[0].competition_id, season: seasonsData[0].season, name: seasonsData[0].competition_name});
            }
            if (data.nation) {
                actions.updateSelectOptions('nation_dropdown', data);
                const championsData = await actions.charge(data, endpoints[0].url, endpoints[0].elementId, endpoints[0].contentFn);
                await actions.controllerSoccerData(data.champion?{champion: data.champion}:{champion: championsData[0].competitionId});
            }
            actions.toggleSelectedClass(data);
            actions.chargeBreadCrumbs(data);
        }catch (error) {
            console.error('Error processing data:', error);
            updateElementHtml('nation_dropdown', '<p class="text-white">Error loading data</p>', 'replace');
        }
    },

    getInitialData: () => {
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
    },

    async controllerGameData(data){
        const endpoints = [
            { url: '/api/gamebyid', elementId: 'dataDisplay2', contentFn: content.createGameDisplay2Content},
            { url: 'api/lineupsbyid', elementId: "dataDisplay2", contentFn: content.createLineupContent, contentFn2: content.createLineupDisplay2Content},
            { url: 'api/eventsbygameid', elementId: "dataDisplay2", contentFn: content.createEventDisplay2Content}
        ];

        if(data.events){
            const events = await postAxiosQuery(endpoints[2].url, {game_id: data.game});
            const timeEvents = actions.separateEvents(events, data.homeclub, data.awayclub);
            const eventDisplayContent = endpoints[2].contentFn(timeEvents[0], timeEvents[1]);
            updateElementHtml(endpoints[2].elementId, eventDisplayContent, 'replace');
        } else if (data.formation){
            const mixedLineupsData = await postAxiosQuery(endpoints[1].url, {game_id: data.game});
            const separatedLineupsData = actions.separateLineups(mixedLineupsData, data.homeclub, data.awayclub);
            const htmlContentHome = renderDataAsHtml(separatedLineupsData[0], endpoints[1].contentFn);
            const htmlContentAway = renderDataAsHtml(separatedLineupsData[1], endpoints[1].contentFn);
            const lineupDisplayContent = endpoints[1].contentFn2(htmlContentHome, htmlContentAway);
            updateElementHtml(endpoints[1].elementId, lineupDisplayContent, 'replace');
        } else if(data.game){
            const gameData= await actions.charge({game_id: data.game}, endpoints[0].url, endpoints[0].elementId, endpoints[0].contentFn);
        }

        actions.toggleSelectedClass(data);
    },

    charge: async (data, url, htmlElementId, contentFunction) => {
        try {
            const responseData = await postAxiosQuery(url, data);
            const htmlContent = renderDataAsHtml(Array.isArray(responseData) ? responseData : [responseData], contentFunction);
            updateElementHtml(htmlElementId, htmlContent, 'replace');
            return responseData;
        } catch (error) {
            console.error(`Error in charge function for URL ${url}:`, error);
            return null;
        }
    },

    toggleSelectedClass:  data => {
        const keys = ['season', 'type'];
        keys.forEach(key => {
            if (data[key]) {
                const selectedClass = `.selected-${key}`;
                document.querySelectorAll(selectedClass).forEach(container => {
                    container.classList.remove('selected');
                });
            }
        });
        keys.forEach(key => {
            if (data[key]) {
                const index = selectpath.findIndex(crumb => crumb.key === key);
                if (index !== -1) {
                    selectpath[index].value = data[key];
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
        selectpath = selectpath.filter(crumb => keys.includes(crumb.key));
    },

    chargeBreadCrumbs: (data) => {
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
    },


    setColorNumbers: (num1, num2) => {
    let result = '';

    if (num1 > num2) {
        result = `<p><span class="text-green">${num1}</span> : <span class="text-red">${num2}</span></p>`;
    } else if (num1 < num2) {
        result = `<p><span class="text-red">${num1}</span> : <span class="text-green">${num2}</span></p>`;
    } else {
        result = `<p><span class="text-red">${num1}</span> : <span class="text-red">${num2}</span></p>`;
    }

    return result;
    },

    setDimNames: data => {
        if (data.length > 10) {
            const words = data.split(' ');
            if (words.length > 1) {
                return words[1];
            } else {
                return data.substring(0, 8);
            }
        }
        return data;
    },

    toUpperCase: data => {
        if (typeof data !== 'string') {
            return data;
        }
        return data.replace(/-/g, ' ').toUpperCase();
    },

    formatDate: data => {
        const date = new Date(data);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();

        if (hours === 0 && minutes === 0) {
            return `${day}.${month}.${year}`;
        } else {
            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            return `${day}.${month}.${year} ${formattedTime}`;
        }
    },

    separateLineups: (mixedLineupsData, homeId, awayId) => {
        if (!Array.isArray(mixedLineupsData)) {
            console.error("Invalid data format, expected an array");
            return [[], []];
        }

        // Convert homeId and awayId to strings
        const homeIdStr = String(homeId);
        const awayIdStr = String(awayId);

        const homeLineup = [];
        const awayLineup = [];

        mixedLineupsData.forEach(lineup => {
            // Convert lineup.club_id to string for comparison
            const clubIdStr = String(lineup.club_id);

            if (clubIdStr === homeIdStr) {
                homeLineup.push(lineup);
            } else if (clubIdStr === awayIdStr) {
                awayLineup.push(lineup);
            } else {
                console.warn("Unexpected club_id found in the data");
            }
        });

        if (homeLineup.length === 0 || awayLineup.length === 0) {
            console.warn("Expected lineups for both home and away clubs");
        }

        return [homeLineup, awayLineup];
    },

    separateEvents: (data, homeId, awayId) => {
        const homeIdNu = Number(homeId);
        const awayIdNu = Number(awayId);

        // Check if data is an array
        if (!Array.isArray(data)) {
            console.error("Invalid data format, expected an array");
            return ["", ""];
        }

        // Initialize strings to hold the separated events
        let firstHalfEvents = "";
        let secondHalfEvents = "";

        // Function to generate HTML content
        const generateHtmlContent = (data) => {
            const assistName = data.assist_name === 'NaN' ? '' : ` (${actions.formatNames(data.assist_name)})`;
            if (data.club_id === homeIdNu) {
                return `<div class="row border-bottom-grey py-2">
                            <div class="col-6 text-start">
                                <p class="text-grey mb-0">${data.minute}' ${data.type} ${actions.formatPlayerNames(data.player_name)} ${assistName}</p>
                            </div>
                            <div class="col-6 text-end">
                                <p class="text-grey mb-0">-</p>
                            </div>
                        </div>`;
            } else if (data.club_id === awayIdNu) {
                return `<div class="row border-bottom-grey py-2">
                            <div class="col-6 text-start">
                                <p class="text-grey mb-0">-</p>
                            </div>
                            <div class="col-6 text-end">
                                <p class="text-grey mb-0">${assistName} ${actions.formatPlayerNames(data.player_name)} ${data.type} ${data.minute}'</p>
                            </div>
                        </div>`;
            } else {
                return `<div class="row border-bottom-grey py-2">
                            <div class="col-6 text-start">
                                <p class="text-grey mb-0">-</p>
                            </div>
                            <div class="col-6 text-end">
                                <p class="text-grey mb-0">-</p>
                            </div>
                        </div>`;
            }
        };

        // Loop through the events and separate them based on the minute
        data.forEach(event => {
            const htmlContent = generateHtmlContent(event);
            if (event.minute <= 45) {
                firstHalfEvents += htmlContent;
            } else {
                secondHalfEvents += htmlContent;
            }
        });

        return [firstHalfEvents, secondHalfEvents];
    },




    formatPlayerNames: data => {
        if (typeof data !== 'string') return '';

        const names = data.trim().split(' ');
        if (names.length < 2) return data;

        const surname = names[names.length - 1];
        const initial = names[0].charAt(0).toUpperCase() + '.';

        return `${surname} ${initial}`;
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
