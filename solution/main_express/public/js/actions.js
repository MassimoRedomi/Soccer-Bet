const actions = {


    /**
     * Fetches data from multiple endpoints, updates HTML elements, and initializes visibility handlers.
     * Then it fetches and updates nation-specific data.
     * @async
     * @function actMain
     * @returns {Promise<void>}
     */
    async actMain() {
        const endpoints = [
            /*00*/{ url: '/api/clubs-names',                elementId: 'clubs',                 contentFn: content.createClubsContent               },
            /*01*/{ url: '/api/champions',                  elementId: 'champions',             contentFn: content.createChampionsContent           },
            /*02*/{ url: '/api/soccer-nations',             elementId: 'nations',               contentFn: content.createNationsListContent         },
            /*03*/{ url: '/api/soccer-nations',             elementId: 'nation_dropdown',       contentFn: content.createNationsDropdownContent     },
            /*04*/{ url: '/api/soccer-nations',             elementId: 'language',              contentFn: content.createLanguageContent            },
            /*05*/{ url: '/api/champions',                  elementId: 'championChat',          contentFn: content.createChampionChatContent        }
            ];
        try {
            await Promise.all(endpoints.map(endpoint =>
                fetchAndUpdate(endpoint.url, endpoint.elementId, endpoint.contentFn)
            ));
            [
                { elementId: 'clubs', buttonId: 'toggleClubs', limit: 14 },
                { elementId: 'champions', buttonId: 'toggleChampions', limit: 14 }
            ].forEach(config => initializeItemsVisibility(config.elementId, config.buttonId, config.limit));
            await actions.actNation({nation: "Greece"});
        } catch (error) {
            console.error('Error in actMain function:', error);
        }
    },


    /**
     * Fetches and updates nation-specific data, updates the dropdown, and fetches champion data.
     * @async
     * @function actNation
     * @param {Object} data - Contains nation information.
     * @returns {Promise<void>}
     */
    async actNation(data) {
        try {
            chargeBreadCrumbs(data);
            activateSection('stats');
            const selectElement = document.getElementById('nation_dropdown');
            selectElement.innerHTML = Array.from(selectElement.options).map(option =>
                `<option value="${option.value}"${option.value === data.nation ? ' selected' : ''}>${option.value}</option>`
            ).join('');
            const championsData = await fetchAndUpdate('/api/send-country','champions_nation_list', content.createChampionsContent, {nation: data.nation});
            await actions.actChampion( { champion: championsData[0].competitionId });
        } catch (error) {
            console.error('Error processing actNation data:', error);
        }
    },


    /**
     * Fetches and updates champion data for a specific nation.
     * @async
     * @function actNatDrop
     * @param {Object} data - Contains nation information.
     * @returns {Promise<void>}
     */
    async actNatDrop(data){
        try{
            chargeBreadCrumbs(data);
            const championsData = await fetchAndUpdate(
                '/api/send-country',
                'champions_nation_list',
                content.createChampionsContent,
                {nation: data.nation}
            );
            await actions.actChampion({champion: championsData[0].competitionId});
        }catch (error){
            console.error('Error processing  actNatDrop data:', error);
        }
    },


    /**
     * Fetches and updates seasons data for a specific champion.
     * @async
     * @function actChampion
     * @param {Object} data - Contains champion information.
     * @returns {Promise<void>}
     */
    async actChampion(data){
        try{
            console.log(data);
            activateSection('stats');
            const seasonsData = await fetchAndUpdate(
                '/api/seasons_by_champion',
                'champions_years',
                content.createSeasonsContent,
                {competitionId: data.champion}
            );

            let selectedSeason = selectedlist.find(item => item.key === "season")?.value;
            let season = selectedSeason ? selectedSeason : seasonsData[0].season;
            if (!seasonsData.some(seasonItem => seasonItem.season === season)) {
                season = seasonsData[0].season;
            }

            await actions.actSeason({competition: seasonsData[0].competition_id, season: season, name: seasonsData[0].competition_name});
        } catch (error){
            console.error('Error processing actChampion data:', error);
        }
    },


    /**
     * Fetches and updates games data for a specific season and competition.
     * @async
     * @function actSeason
     * @param {Object} data - Contains competition and season information.
     * @returns {Promise<void>}
     */
    async actSeason(data){
        try{
            chargeBreadCrumbs(data);
            autoSelectionClass({season: data.season});
            const gamesData = await fetchAndUpdate(
                '/api/games_by_championNseason',
                'gamesxchampion',content.createGamesContent,
                {competition_id: data.competition, season: data.season}
            );
            updateElementHtml('championName', `<h4 class="text-white bold">${toUpperCase(data.name)}</h4>`, 'replace');
            await actions.actGamesChamp({game: gamesData[0].game_id, clubname:`${gamesData[0].home_club_name} vs ${gamesData[0].away_club_name}` });
        }catch (error){
            console.error('Error processing actSeason data:', error);
        }
    },


    /**
     * Fetches and updates game data for a specific game.
     * @async
     * @function actGamesChamp
     * @param {Object} data - Contains game and club name information.
     * @returns {Promise<void>}
     */
    async actGamesChamp(data){
        try{
            chargeBreadCrumbs(data);
            autoSelectionClass({game: data.game});
            const gameData= await fetchAndUpdate(
                '/api/gamebyid',
                'dataDisplay',
                content.createGameDisplayContent  ,
                {game_id: data.game}
            );
            await actions.actDispGame({club: gameData.home_club_id, game: gameData.game_id});
        }catch (error){
            console.error('Error processing actClubPlayers data:', error);
        }
    },


    /**
     * Fetches and updates club players for a specific game.
     * @async
     * @function actDispGame
     * @param {Object} data - Contains club and game information.
     * @returns {Promise<void>}
     */
    async actDispGame(data){
        try{
            await fetchAndUpdate(
                '/api/clubplayers',
                'clubPlayers',
                content.createClubPlayersContent,
                {clubId: data.club}
            );
            await actions.actDispGameSum({game: data.game, type: 'summary'});
        }catch (error){
            console.error('Error processing actDispGame data:', error);
        }
    },


    /**
     * Fetches and updates detailed game summary data for a specific game.
     * @async
     * @function actDispGameSum
     * @param {Object} data - Contains game information.
     * @returns {Promise<void>}
     */
    async actDispGameSum(data){
        try{
            autoSelectionClass({type: data.type});
            const gameData= await fetchAndUpdate(
                '/api/gamebyid',
                'dataDisplay2',
                content.createGameDisplay2Content,
                {game_id: data.game}
            );
        }catch (error){
            console.error('Error processing actDispGame data:', error);
        }
    },


    /**
     * Fetches and updates lineup data for a specific game.
     * @async
     * @function actDispGameForm
     * @param {Object} data - Contains game, homeclub, and awayclub information.
     * @returns {Promise<void>}
     */
    async actDispGameForm(data){
        try{
            autoSelectionClass({type: data.type});
            const mixedLineupsData = await postAxiosQuery('api/lineupsbyid', {game_id: data.game});
            const separatedLineupsData = separateLineups(mixedLineupsData, data.homeclub, data.awayclub);
            const htmlContentHome = renderDataAsHtml(separatedLineupsData[0], content.createLineupContent);
            const htmlContentAway = renderDataAsHtml(separatedLineupsData[1], content.createLineupContent);
            const lineupDisplayContent = content.createLineupDisplay2Content(htmlContentHome, htmlContentAway);
            updateElementHtml('dataDisplay2', lineupDisplayContent, 'replace');
        }catch (error){
            console.error('Error processing actDispGameForm data:', error);
        }
    },


    /**
     * Fetches and updates event data for a specific game.
     * @async
     * @function actDispGameEvents
     * @param {Object} data - Contains game, homeclub, and awayclub information.
     * @returns {Promise<void>}
     */
    async actDispGameEvents(data){
        try{
            autoSelectionClass({type: data.type});
            const events = await postAxiosQuery('api/eventsbygameid', {game_id: data.game});
            const timeEvents = separateEvents(events, data.homeclub, data.awayclub);
            const eventDisplayContent = content.createEventDisplay2Content(timeEvents[0], timeEvents[1]);
            updateElementHtml('dataDisplay2', eventDisplayContent, 'replace');
        }catch (error){
            console.error('Error processing actDispGameEvents data:', error);
        }
    },


    /**
     * Fetches and updates club information.
     * @async
     * @function actDispClub
     * @param {Object} data - Contains club information.
     * @returns {Promise<void>}
     */
    async actDispClub(data){
        try{
            chargeBreadCrumbs(data);
            await fetchAndUpdate(
                '/api/clubbyid',
                'dataDisplay',
                content.createClubDisplayContent,
                {clubId: data.club}
            );
            let players= await fetchAndUpdate(
                '/api/clubplayers',
                'clubPlayers',
                content.createClubPlayersContent,
                {clubId: data.club}
            );
            console.log(players);
            await actions.actDispClubSum({club: data.club, type: 'summary'});
        }catch (error){
            console.error('Error processing actDispClub data:', error);
        }
    },


    /**
     * Fetches and updates additional club summary data for a specific club.
     * @async
     * @function actDispClubSum
     * @param {Object} data - Contains club information.
     * @param {number} data.club - The ID of the club.
     * @returns {Promise<void>}
     */
    async actDispClubSum(data){
        try{
            autoSelectionClass({type: data.type});
            await fetchAndUpdate(
                '/api/clubbyid',
                'dataDisplay2',
                content.createClubDisplay2Content,
                {clubId: data.club}
            );
        }catch (error){
            console.error('Error processing actDispClubSum data:', error);
        }
    },

    async actDispClubRes(data){
        try{
            autoSelectionClass({type: data.type});
            let season=selectedlist.find(item => item.key === "season").value;
            const games = await postAxiosQuery('api/getgamesbyclubnseason', {club_id: data.club, season: season});
            const contentHtml = divideGamesxChampion(games);
            const contentHtml2 = content.createClubResDisplay2Content(contentHtml);
            updateElementHtml('dataDisplay2', contentHtml2, 'replace');
        }catch (error){
            console.error('Error processing actDispClubRes data:', error);
        }
    },

    async actDispPlayer(data){
        try{
            chargeBreadCrumbs(data);
            await fetchAndUpdate(
                '/api/playerbyid',
                'dataDisplay',
                content.createPlayerDisplayContent,
                {player: data.player}
            );
            await actions.actDispPlayerSum({player: data.player, type: 'summary'});
        }catch (error){
            console.error('Error processing actDispPlayer data:', error);
        }
    },

    async actDispPlayerSum(data){
        try{
            autoSelectionClass({type: data.type});
            await fetchAndUpdate(
                '/api/playerbyid',
                'dataDisplay2',
                content.createPlayerDisplay2Content,
                {player: data.player}
            );
        } catch (error){
            console.error('Error processing actDispPlayerSum data:', error);
        }
    },

    /**
     * Updates the chat section with the selected language information.
     * @function actLangChat
     * @param {Object} data - Contains language information.
     * @param {string} data.language - The name of the selected language.
     */
    async actLangChat(data){
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
     * Displays the login modal and hides the signup modal.
     * @function actLoginModal
     */
    actLoginModal: () => {
        const modaLogin = document.getElementById('loginModal');
        const modalSign = document.getElementById('signinModal');
        modaLogin.style.display = 'block';
        modalSign.style.display = 'none';
    },


    /**
     * Displays the signup modal and hides the login modal.
     * @function actSignModal
     */
    actSignModal: () => {
        const modaLogin = document.getElementById('loginModal');
        const modalSign = document.getElementById('signinModal');
        modaLogin.style.display = 'none';
        modalSign.style.display = 'block';
    },

    /**
     * Hides both the login and signup modals.
     * @function actCloseModal
     */
    actCloseModal: () => {
        const modaLogin = document.getElementById('loginModal');
        const modaSign = document.getElementById('signinModal');
        modaLogin.style.display = 'none';
        modaSign.style.display = 'none';
    },


    /**
     * Sends a login request to the server and handles the response.
     * @function actLoginReq
     */
    actLoginReq: () => {
        const form = document.getElementById('loginForm');
        const data = extractDataFromElement(form);
        if (validateLoginData(data, 'loginErrors')) {
            postAxiosQuery('/api/login', data)
                .then(response => {
                    if (response.message === 'OK') {
                        actions.actCloseModal();
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
     * Sends a signup request to the server and handles the response.
     * @function actSignRequest
     */
    actSignRequest: () => {
        const form = document.getElementById('signForm');
        const data = extractDataFromElement(form);
        if (validateSigninData(data, 'passwordErrors')) {
            postAxiosQuery('/api/signup', data)
                .then(data => moveToLogin(data))
                .catch(error => {
                    console.error(`Failed to load data from /api/signup:`, error);
                    updateElementHtml('congrats', `<h3 class="text-white">We are sorry! Your account wasn't created</h3>`, 'replace');
                    updateElementHtml('congrats2', `<p class="text-white">Please try again later! We are working at the problem</p>`, 'replace');
                    return null;
                });
        }
    },


    /**
     * Logs the user out by calling the server's logout endpoint and checking login status.
     * @function actUsrLogout
     */
    actUsrLogout: () => {
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
     * Updates the chat section with the selected champion information.
     * @function actChampChat
     * @param {Object} data - Contains champion information.
     * @param {string} data.champion - The name of the champion.
     */
    actChampChat: data => {
        const championLanguageElement = document.getElementById('championLanguageName');
        const championLanguageInfo= document.getElementById('championLanguageInfo');
        const startChatButton = document.getElementById('startChatButton');

        if (!championLanguageElement) {
            console.error("The languageName element does not exist in the DOM.");
            return;
        }

        championLanguageElement.innerHTML = `Champion chat selected: ${formatNames(data.champion)}`;
        championLanguageInfo.innerHTML = `Start your conversation by pressing the button above`;
        championLanguageInfo.style.display = 'block';
        startChatButton.style.display = 'block';
        startChatButton.setAttribute('data-champion', data.champion);
    },

    /**
     * Initiates the chat connection to the specified room.
     * @function actStartChat
     * @param {Object} data - Contains chat information.
     * @param {string} data.champion - The name of the champion.
     * @param {string} data.username - The username of the participant.
     */
    actStartChat: data => {
        connectToRoom(data.champion, data.username);
    }
};

