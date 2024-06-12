const actions = {

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


    async actChampion(data){
        try{
            activateSection('stats');
            const seasonsData = await fetchAndUpdate(
                '/api/seasons_by_champion',
                'champions_years',
                content.createSeasonsContent,
                {competitionId: data.champion}
            );
            await actions.actSeason({competition: seasonsData[0].competition_id, season: seasonsData[0].season, name: seasonsData[0].competition_name});
        } catch (error){
            console.error('Error processing actChampion data:', error);
        }
    },


    async actSeason(data){
        try{
            chargeBreadCrumbs(data);
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


    async actGamesChamp(data){
        try{
            chargeBreadCrumbs(data);
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


    async actDispGame(data){
        try{
            await fetchAndUpdate(
                '/api/clubplayers',
                'clubPlayers',
                content.createClubPlayersContent,
                {clubId: data.club}
            );
            await actions.actDispGameSum({game: data.game});
        }catch (error){
            console.error('Error processing actDispGame data:', error);
        }
    },

    async actDispGameSum(data){
        try{
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

    async actDispGameForm(data){
        try{
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


    async actDispGameEvents(data){
        try{
            const events = await postAxiosQuery('api/eventsbygameid', {game_id: data.game});
            const timeEvents = separateEvents(events, data.homeclub, data.awayclub);
            const eventDisplayContent = content.createEventDisplay2Content(timeEvents[0], timeEvents[1]);
            updateElementHtml('dataDisplay2', eventDisplayContent, 'replace');
        }catch (error){
            console.error('Error processing actDispGameEvents data:', error);
        }
    },

    async actDispClub(data){
        try{
            await fetchAndUpdate(
                '/api/clubbyid',
                'dataDisplay',
                content.createClubDisplayContent,
                {clubId: data.club}
            );
            await actions.actDispClubSum({club: data.club});
        }catch (error){
            console.error('Error processing actDispClub data:', error);
        }
    },

    async actDispClubSum(data){
        try{
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


    actLoginModal: () => {
        const modaLogin = document.getElementById('loginModal');
        const modalSign = document.getElementById('signinModal');
        modaLogin.style.display = 'block';
        modalSign.style.display = 'none';
    },

    actSignModal: () => {
        const modaLogin = document.getElementById('loginModal');
        const modalSign = document.getElementById('signinModal');
        modaLogin.style.display = 'none';
        modalSign.style.display = 'block';
    },

    actCloseModal: () => {
        const modaLogin = document.getElementById('loginModal');
        const modaSign = document.getElementById('signinModal');
        modaLogin.style.display = 'none';
        modaSign.style.display = 'none';
    },



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
     * Sends a signup request to the server.
     * @function
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


    actStartChat: data => {
        connectToRoom(data.champion, data.username);
    }
};

