let breadcrumbs = [];
let selectedlist= [];
const suggestionsCache = {
    'nation-input': [],
    'competition-input': [],
    'club-input': []
};

/**
 * Fetches data from the given URL (using POST if data is provided, otherwise GET), renders HTML content from the data using the provided content function, and updates the specified HTML element with the generated content.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {string} elementId - The ID of the HTML element to update with the fetched data.
 * @param {Function} contentFn - A function that takes the fetched data and returns HTML content as a string.
 * @param {Object|null} data - Optional. If provided, a POST request is made with this data; otherwise, a GET request is made.
 * @returns {Promise<Object|null>} - The fetched data if successful, or null if an error occurs.
 */
async function fetchAndUpdate(url, elementId, contentFn, data = null) {
    try {
        const responseData = data ? await postAxiosQuery(url, data) : await getAxiosQuery(url);
        const htmlContent = renderDataAsHtml(Array.isArray(responseData) ? responseData : [responseData], contentFn);
        updateElementHtml(elementId, htmlContent, 'replace');
        return responseData;
    } catch (error) {
        console.error(`Error in fetchAndUpdateElement function for URL ${url}:`, error);
        updateElementHtml(elementId, `<p class="text-white">Error loading data.</p>`, 'replace');
        return null;
    }
}



function autoSelectionClass(data) {
    const keys = ['season', 'type', 'nationlist', 'game', 'nation', 'subtype', 'subsubtype'];

    keys.forEach(key => {
        if (data[key]) {
            document.querySelectorAll(`.selected-${key}`).forEach(container => {
                container.classList.remove('selected');
            });
        }
    });

    selectedlist = selectedlist.filter(crumb => keys.includes(crumb.key));
    keys.forEach(key => {
        if (data[key]) {
            const existingCrumb = selectedlist.find(crumb => crumb.key === key);
            if (existingCrumb) {
                existingCrumb.value = data[key];
            } else {
                selectedlist.push({ key: key, value: data[key] });
            }
        }
    });

    selectedlist.forEach(crumb => {
        if (data[crumb.key]) {
            const selector = `[data-${crumb.key}="${crumb.value}"]`;
            const selectedContainer = document.querySelector(selector)?.closest(`.selected-${crumb.key}`);
            if (selectedContainer) {
                selectedContainer.classList.add('selected');
            }
        }
    });
}


function chargeBreadCrumbs(data){
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
        `<span>${toUpperCase(crumb.value)}${index < sortedBreadcrumbs.length - 1 ? ' > ' : ''}</span>`
    ).join('');

    const wrappedBreadcrumbsHtml = `<h4 class="text-white">${breadcrumbsHtml}</h4>`;
    updateElementHtml('breadcrumbs', wrappedBreadcrumbsHtml, 'replace');
}


function setColorNumbers (num1, num2){
    let result = '';

    if (num1 > num2) {
        result = `<p><span class="text-green">${num1}</span> : <span class="text-red">${num2}</span></p>`;
    } else if (num1 < num2) {
        result = `<p><span class="text-red">${num1}</span> : <span class="text-green">${num2}</span></p>`;
    } else {
        result = `<p><span class="text-red">${num1}</span> : <span class="text-red">${num2}</span></p>`;
    }
    return result;
}


function setDimNames(data){
    if (data.length > 10) {
        const words = data.split(' ');
        if (words.length > 1) {
            return words[1];
        } else {
            return data.substring(0, 8);
        }
    }
    return data;
}

function toUpperCase(data) {
    if (typeof data !== 'string') {
        return data;
    }
    return data.replace(/-/g, ' ').toUpperCase();
}

function formatDate(data) {
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    return `${day}.${month} ${formattedTime}`;
}



function separateLineups(mixedLineupsData, homeId, awayId){
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
}



function separateEvents(data, homeId, awayId){
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
        const assistName = data.assist_name === 'NaN' ? '' : ` (${formatNames(data.assist_name)})`;
        if (data.club_id === homeIdNu) {
            return `<div class="row border-bottom-grey py-2">
                            <div class="col-6 text-start">
                                <p class="tooltip-container text-grey mb-0">${data.minute}' ${data.type} ${formatPlayerNames(data.player_name)} ${assistName}<span class="tooltip-text">${data.description}</span></p>
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
                                <p class="tooltip-container text-grey mb-0">${assistName} ${formatPlayerNames(data.player_name)} ${data.type} ${data.minute}'<span class="tooltip-text">${data.description}</span></p>
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
}



function formatPlayerNames(data){
    if (typeof data !== 'string') return '';

    const names = data.trim().split(' ');
    if (names.length < 2) return data;

    const surname = names[names.length - 1];
    const initial = names[0].charAt(0).toUpperCase() + '.';

    return `${surname} ${initial}`;
}

/**
 * Validates the signup data.
 * @function
 * @param {Object} data - The signup data.
 * @param {string} elementId - The element ID to display validation errors.
 * @returns {boolean} - Returns true if data is valid, otherwise false.
 */
function validateSigninData(data, elementId){
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
}



/**
 * Validates the login data.
 * @function
 * @param {Object} data - The login data.
 * @param {string} elementId - The element ID to display validation errors.
 * @returns {boolean} - Returns true if data is valid, otherwise false.
 */
function validateLoginData(data, elementId){
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
}

/**
 * Moves the user to the login modal after successful signup.
 * @function
 * @param {Object} data - The data returned from the signup request.
 */
function moveToLogin(data){
    const modaLogin = document.getElementById('loginModal');
    const modalSign = document.getElementById('signinModal');
    updateElementHtml('congrats', '<h3>Congratulations! Your account is created</h3>', 'replace');
    updateElementHtml('congrats2', '<p>Welcome, do your first login</p>', 'replace');
    modaLogin.style.display = 'block';
    modalSign.style.display = 'none';
}


/**
 * Updates the login UI with provided text and action.
 * @function
 * @param {string} text - The text to display.
 * @param {string} action - The action to set.
 */
function updateLoginUI(text, action){
    const loginLink = document.getElementById('nav-login');
    loginLink.innerHTML = `<h6>${text}</h6>`;
    loginLink.setAttribute('data-action', action);
}


/**
 * Sets the username in the UI after fetching user information.
 * @async
 * @function
 */
async function setUserName () {
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
}


/**
 * Formats names by capitalizing the first letter of each name part.
 * @function
 * @param {string} inputString - The input string to format.
 * @returns {string} - The formatted name string.
 */
function formatNames(inputString){
    const names = inputString.split('-');
    const capitalizedNames = names.map(name => {
        if (name) {
            return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        }
        return '';
    });
    return capitalizedNames.join(' ');
}

function formatValue(value) {
    // Check if the value starts with '+' or '-' to determine the text color
    let textColorClass = 'text-red';
    if (value.startsWith('+')) {
        textColorClass = 'text-green';
    }

    // Remove the '+' or '-' from the value
    let formattedValue = value.replace(/[+-]/g, '').trim();

    // Ensure the formatted value starts with '€'
    if (!formattedValue.startsWith('€')) {
        formattedValue = '€' + formattedValue;
    }

    return `<p class="${textColorClass} mb-0">${formattedValue}</p>`;
}


function divideGamesxChampion(games) {
    const groupedGames = games.reduce((acc, game) => {
        const competition = game.competition_name;
        if (!acc[competition]) {
            acc[competition] = [];
        }
        acc[competition].push(game);
        return acc;
    }, {});

    let contentHtml = '';

    for (const competition in groupedGames) {
        if (groupedGames.hasOwnProperty(competition)) {
            contentHtml += `
                <div class="row my-2 rounded-3" style="background-color: rgba(5,168,64,0.21);">
                    <h4 class="text-white mb-0">${toUpperCase(competition)}</h4>
                </div>
            `;
            groupedGames[competition].forEach(game => {
                contentHtml += `
                    <a href="#" class="interactable bg-links" data-action="actGamesChamp" data-game="${game.game_id}" data-clubname="${game.home_club_name} vs ${game.away_club_name}">
                        <div class="row border-bottom-grey">
                            <div class="col-3">
                                <p class="text-grey mb-0">${formatDate(game.date)}</p>
                            </div>
                            <div class="col-4 d-flex flex-column align-items-start">
                                <p class="tooltip-container mb-0 text-grey">${game.home_club_name} <span class="tooltip-text">${game.home_club_id}</span></p>
                            </div>
                            <div class="col-1 d-flex flex-column align-items-center">
                                ${setColorNumbers(game.home_club_goals, game.away_club_goals)}
                            </div>
                            <div class="col-4 d-flex flex-column align-items-end">
                                <p class="mb-0 text-grey">${game.away_club_name}</p>
                            </div>
                        </div>
                    </a>
                `;
            });
        }
    }

    return contentHtml;
}

function toFirstLetterUpperCase(data){
    if (typeof data !== 'string' || data.length === 0) {
        return data;
    }
    return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
}

async function prefetchAllSuggestions() {
    suggestionsCache['nation-input'] = await fetchSuggestions('/api/soccer-nations');
    suggestionsCache['competition-input'] = await fetchSuggestions('/api/champions');
    suggestionsCache['club-input'] = await fetchSuggestions('/api/clubs-names');
}

function initSearchBar() {
    const searchInputs = document.querySelectorAll('.search-area');

    searchInputs.forEach(input => {
        input.addEventListener('focus', () => showSuggestions(input, true));
        input.addEventListener('blur', hideSuggestions);
        input.addEventListener('input', () => showSuggestions(input));
        input.addEventListener('keydown', handleKeyDown);
    });
}

function showSuggestions(inputElement, isInitialFocus = false) {
    const value = inputElement.value;
    let suggestions = suggestionsCache[inputElement.id] || [];

    if (!isInitialFocus && value) {
        suggestions = filterSuggestions(suggestions, value);
    }
    renderSuggestions(suggestions, inputElement);
}

function filterSuggestions(suggestions, value) {
    return suggestions.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
}

async function fetchSuggestions(apiEndpoint) {
    try {
        const response = await getAxiosQuery(apiEndpoint);

        if (apiEndpoint.includes('soccer-nations')) {
            return response.map(item => ({ name: item.name, id: item.name }));
        } else if (apiEndpoint.includes('champions')) {
            return response.map(item => ({ name: formatNames(item.name), id: item.competitionId, nation: item.countryName }));
        } else if (apiEndpoint.includes('clubs-names')) {
            return response.map(item => ({ name: item.name, id: item.clubId, clubName: item.name }));
        } else {
            console.warn(`Unknown API endpoint: ${apiEndpoint}`);
            return [];
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
}

function hideSuggestions(event) {
    setTimeout(() => {
        const suggestionsContainer = event.target.nextElementSibling;
        suggestionsContainer.style.display = 'none';
    }, 200);
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector('.search-button').click();
    }
}

function renderSuggestions(suggestions, inputElement) {
    const suggestionsContainer = inputElement.nextElementSibling;
    if (suggestions.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    const suggestionItems = suggestions.map(item => `
        <div class="suggestion-item" 
             onclick="selectSuggestion('${item.name}', '${item.id}', '${inputElement.id}', '${item.clubName || ''}', '${item.nation || ''}')">
             ${item.name}
        </div>`).join('');

    suggestionsContainer.innerHTML = suggestionItems;
    suggestionsContainer.style.display = 'block';
    suggestionsContainer.style.width = inputElement.offsetWidth + 'px';
}

function selectSuggestion(name, id, inputId, clubName = '', nation = '') {
    const inputElement = document.getElementById(inputId);
    inputElement.value = name;
    inputElement.setAttribute('data-selected-id', id);
    if (clubName) {
        inputElement.setAttribute('data-clubname', clubName);
    }
    if (nation) {
        inputElement.setAttribute('data-nation', nation);
    }
    const suggestionsContainer = inputElement.nextElementSibling;
    suggestionsContainer.style.display = 'none';
}

const formatGames = (dataGames) => {
    if (!Array.isArray(dataGames)) {
        console.error('Error: dataGames is not an array');
        return '';
    }

    const gamesByRound = dataGames.reduce((acc, game) => {
        const round = game.round;
        if (!acc[round]) {
            acc[round] = [];
        }
        acc[round].push(game);
        return acc;
    }, {});

    const sortedRounds = Object.keys(gamesByRound).sort((a, b) => extractOrderValue(a) - extractOrderValue(b));

    let htmlContent = '';
    for (const round of sortedRounds) {
        htmlContent += `<div class="container-fluid p-0 mt-4">
                            <h5 class="mb-0 text-white">${toUpperCase(round)}</h5>
                        </div>`;
        gamesByRound[round].forEach(game => {
            htmlContent += `
                <div class="item my-2">
                    <div class="container-fluid p-0 m-0 selected-game">
                        <a href="#" class="interactable bg-links" data-action="actGamesChamp" data-game="${game.game_id}" data-clubname="${game.home_club_name} vs ${game.away_club_name}">
                            <div class="row border-bottom-grey">
                                <div class="col-4 d-flex flex-column align-items-start">
                                    <p class="tooltip-container mb-0">${setDimNames(game.home_club_name)} <span class="tooltip-text">${game.home_club_id}</span></p>
                                </div>
                                <div class="col-4 d-flex flex-column align-items-center">
                                    ${setColorNumbers(game.home_club_goals, game.away_club_goals)}
                                </div>
                                <div class="col-4 d-flex flex-column align-items-end">
                                    <p class="mb-0">${setDimNames(game.away_club_name)}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `;
        });
    }

    return htmlContent;
};



const extractOrderValue = (round) => {
    const matchDayMatch = round.match(/^(\d+)\. Matchday$/);
    if (matchDayMatch) return parseInt(matchDayMatch[1]);

    const qualifyingRoundMatch = round.match(/Qualifying Round (\d+)(st|nd|rd|th) leg/);
    if (qualifyingRoundMatch) return parseInt(qualifyingRoundMatch[1]);

    const groupMatch = round.match(/^Group ([A-Z])$/);
    if (groupMatch) return groupMatch[1].charCodeAt(0);

    const ordinalNumberMatch = round.match(/^(First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth) Round$/);
    if (ordinalNumberMatch) {
        const ordinalToNumber = {
            First: 1, Second: 2, Third: 3, Fourth: 4, Fifth: 5,
            Sixth: 6, Seventh: 7, Eighth: 8, Ninth: 9, Tenth: 10
        };
        return ordinalToNumber[ordinalNumberMatch[1]];
    }

    const finalRoundsMatch = round.match(/^(Quarter Finals|Semi Finals|Final)$/);
    if (finalRoundsMatch) {
        const finalRoundsToNumber = {
            "Quarter Finals": 1, "Semi Finals": 2, "Final": 3
        };
        return 1000 + finalRoundsToNumber[finalRoundsMatch[1]];
    }

    return Infinity;
};

