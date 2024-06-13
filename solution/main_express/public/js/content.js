const content = {
    createClubsContent:             data => `<div class="item my-2">
                                                <a href="#" class="interactable links d-flex align-items-center"  data-action="controllerSoccerData" data-club="${data.clubId}" data-clubName="${data.name}">
                                                    <img src="images/football-club.svg" alt="Offers" class="svg-container me-2">
                                                    <p class="mb-0">${data.name}</p>
                                                </a>
                                             </div>`,
    createNationsDropdownContent:   data => `<option value="${data.name}">${data.name}</option>`,
    createNationsListContent:       data => `<div class="container rounded-3 my-2 selected-nation">
                                                <div class="item my-2">
                                                    <a href="#" class="interactable links d-flex align-items-center" data-action="actNation" data-nation="${data.name}">
                                                        <div class="svg-container me-2">${data.sig}</div>
                                                        ${formatNames(data.name)}
                                                    </a>
                                                </div>
                                             </div>`,
    createChampionsContent:         data => `<div class="container rounded-3 my-2">
                                                <div class="item my-2">
                                                    <a href="#" class="interactable links d-flex align-items-center" data-action="actChampion"  data-champion="${data.competitionId}">
                                                        <div class="svg-container me-2">${data.sig}</div>
                                                        <p class="mb-0">${formatNames(data.name)}</p>
                                                    </a>
                                                </div>
                                             </div>`,
    createLanguageContent:          data => `<div class="item my-2">
                                                <a href="#" class="interactable links d-flex align-items-center" data-action="actLangChat" data-language="${data.name}">
                                                    <div class="svg-container me-2">${data.sig}</div>
                                                </a>
                                            </div>`,
    createChampionChatContent:      data => `<div class="col-md-4">
                                                <div class="item my-2">
                                                     <a href="#" class="interactable links d-flex align-items-center" data-action="actChampChat" data-champion="${data.name}">
                                                        <div class="svg-container me-2">${data.sig}</div>
                                                        <p class="mb-0">${formatNames(data.name)}</p>
                                                    </a>
                                                </div>
                                            </div>`,
    createSeasonsContent:           data => `<div class="col-6">
                                                <div class="container-fluid bg-black text-white rounded-3  px-0 my-2 text-center selected-season">
                                                    <div class="item">
                                                        <a href="#" class="interactable links" data-action="actSeason" data-season="${data.season}" data-competition="${data.competition_id}" data-name="${data.competition_name}">
                                                            <p class="mb-0">${data.season}</p>
                                                        </a>
                                                    </div>
                                                </div>
                                             </div>`,
    createGamesContent:             data => `<div class="item my-2">
                                                <div class="container-fluid p-0 m-0 selected-game">
                                                    <a href="#" class="interactable bg-links" data-action="actGamesChamp" data-game="${data.game_id}" data-clubname="${data.home_club_name} vs ${data.away_club_name}">
                                                        <div class="row border-bottom-grey">
                                                            <div class="col-4 d-flex flex-column align-items-start">
                                                                <p class="tooltip-container mb-0">${setDimNames(data.home_club_name)} <span class="tooltip-text">${data.home_club_id}</span></p>
                                                            </div>
                                                            <div class="col-4 d-flex flex-column align-items-center">
                                                                ${setColorNumbers(data.home_club_goals, data.away_club_goals)}
                                                            </div>
                                                            <div class="col-4 d-flex flex-column align-items-end">
                                                                <p class="mb-0">${setDimNames(data.away_club_name)}</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>`,
    createClubPlayersContent:       data => `<div class="item my-2">
                                                 <a href="#" class="interactable bg-links" data-action="actDispPlayer" data-player="${data.playerId}" data-clubname="${toUpperCase(data.currentClub.clubCode)} > ${toUpperCase(data.name)}">
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-4 d-flex align-items-start">
                                                            <p class="text-white bold mb-0">${data.name}</p>
                                                        </div>
                                                        <div class="col-1 d-flex justify-content-center align-items-center">
                                                            <p class="text-white bold mb-0">${data.age}</p>
                                                        </div>
                                                        <div class="col-1 d-flex justify-content-center align-items-center">
                                                            <p class="text-white bold mb-0">${data.partite}</p>
                                                        </div>
                                                        <div class="col-2 d-flex justify-content-center align-items-center">
                                                            <p class="text-white bold mb-0">${data.minutesPlayed}</p>
                                                        </div>
                                                        <div class="col-1 d-flex justify-content-center align-items-center">
                                                            <p class="text-white bold mb-0">${data.goals}</p>
                                                        </div>
                                                        <div class="col-1 d-flex justify-content-center align-items-center">
                                                            <p class="text-white bold mb-0">${data.assists}</p>
                                                        </div>
                                                        <div class="col-1 d-flex justify-content-center align-items-center">
                                                            <p class="text-white bold mb-0">${data.redCards}</p>
                                                        </div>
                                                        <div class="col-1 d-flex justify-content-center align-items-center">
                                                            <p class="text-white bold mb-0">${data.yellowCards}</p>
                                                        </div>
                                                    </div>
                                                 </a>
                                             </div>`,
    createCompetitionDisplayContent: data =>`<p class="text-white">${data.name}</p>
                                             <p class="text-white">${data.type}</p>
                                             <p class="text-white">${data.countryName}</p>
                                             <p class="text-white">${data.url}</p>
                                             <p class="text-white">${data.confederation}</p>`,

    createGameDisplayContent:        data => `<div class="item my-2">
                                                <div class="container-fluid bg-black rounded-3">
                                                    <div class="row">
                                                        <div class="col-4 d-flex flex-column justify-content-center align-items-center text-center">
                                                            <a href="#" class="interactable bg-links" data-action="actDispClub" data-club="${data.home_club_id}" data-clubName="${data.home_club_name}">
                                                                <p class="text-grey">HOME</p>
                                                                <img src="images/football-club.png" alt="CLub" style="width: 100px;">
                                                                <p class="text-grey">${data.home_club_name}</p>
                                                            </a>
                                                        </div>
                                                        <div class="col-4 d-flex flex-column justify-content-center align-items-center text-center">
                                                            <p class="text-grey">${formatDate(data.date)}</p>
                                                            <h3 class="text-grey">${setColorNumbers(data.home_club_goals, data.away_club_goals)}</h3>
                                                            <p class="text-grey">${data.round}</p>
                                                            <p class="text-grey">${data.stadium}</p>
                                                        </div>
                                                        <div class="col-4 d-flex flex-column justify-content-center align-items-center text-center">
                                                            <a href="#" class="interactable bg-links" data-action="actDispClub" data-club="${data.away_club_id}" data-clubName="${data.away_club_name}">
                                                                <p class="text-grey">AWAY</p>
                                                                <img src="images/football-club.png" alt="CLub" style="width: 100px;">
                                                                <p class="text-grey">${data.away_club_name}</p>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="row border-top-green mt-2 py-2">
                                                        <div class="col-3 d-flex flex-column justify-content-center align-items-center text-center rounded-3 selected-type">
                                                            <a href="#" class="interactable links" data-action="actDispGameSum" data-game="${data.game_id}" data-type="summary">
                                                                <p class="text-grey">SUMMARY</p>
                                                            </a>
                                                        </div>
                                                        <div class="col-3 d-flex flex-column justify-content-center align-items-center text-center selected-type">
                                                            <a href="#" class="interactable links" data-action="actDispGameForm" data-game="${data.game_id}" data-homeclub="${data.home_club_id}" data-awayclub="${data.away_club_id}" data-type="formation">
                                                                <p class="text-grey">FORMATION</p>
                                                            </a>
                                                        </div>
                                                        <div class="col-3 d-flex flex-column justify-content-center align-items-center text-center selected-type">
                                                            <a href="#" class="interactable links" data-action="actDispGameEvents" data-type="events" data-game="${data.game_id}" data-homeclub="${data.home_club_id}" data-awayclub="${data.away_club_id}">
                                                                <p class="text-grey">EVENTS</p>
                                                            </a>
                                                        </div>
                                                        <div class="col-3 d-flex flex-column justify-content-center align-items-center text-center selected-type">
                                                            <a href="#" class="interactable links" data-action="actDispGame" data-type="charts">
                                                                <p class="text-grey">CHARTS</p>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                              </div>`,
    createGameDisplay2Content:        data => `<div class="item my-2">
                                                <div class="container-fluid bg-black rounded-3 my-4 py-4">
                                                    <div class="row my-2 rounded-3" style="background-color: rgba(5,168,64,0.21);">
                                                        <h4 class="text-white mb-0">INFORMATION</h4>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                           <img src="images/whistle.png" alt="Offers" class="svg-container me-2">
                                                           <p class="text-white">REFEREE:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                            <p class="text-white">${data.referee}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/football-field.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">STADIUM:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.stadium}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/customer.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">ATTENDANCE:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.attendance}</p>
                                                        </div>
                                                    </div>
                                                     <div class="row">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/calendar.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">SEASON:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.season}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="container-fluid bg-black rounded-3 my-4 py-4">
                                                     <div class="row rounded-3" style="background-color: rgba(5,168,64,0.21);">
                                                        <div class="col-6 d-flex flex-column justify-content-center align-items-center text-center">
                                                            <h4 class="text-white mb-0">HOME</h4>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column justify-content-center align-items-center text-center">
                                                           <h4 class="text-white mb-0">AWAY</h4>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-12">
                                                            <p class="text-white">POSITIONS:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column justify-content-center align-items-center text-center">
                                                           <p class="text-white">${data.home_club_position}</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column justify-content-center align-items-center text-center">
                                                            <p class="text-white">${data.away_club_position}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-12">
                                                            <p class="text-white">MANAGERS:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column justify-content-center align-items-center text-center">
                                                            <p class="text-white">${data.home_club_manager_name}</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column justify-content-center align-items-center text-center">
                                                           <p class="text-white">${data.away_club_manager_name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                              </div>`,
    createLineupContent:               data =>`<div class="row">
                                                    <div class="col-1">
                                                        <p class="text-white">${data.number}</p>
                                                    </div>
                                                    <div class="col-5">
                                                        <p class="text-white">${formatPlayerNames(data.player_name)}</p>
                                                    </div>
                                                    <div class="col-6">
                                                        <p class="text-white">${data.position}</p>
                                                    </div>
                                                </div>`,
    createLineupDisplay2Content:(home, away) =>`<div class="item my-2">
                                                            <div class="container-fluid bg-black rounded-3 my-4 py-4">
                                                                <div class="container-fluid mb-4 rounded-3" style="background-color: rgba(5,168,64,0.21);">
                                                                    <h4 class="text-white mb-0">FORMATION</h4>
                                                                </div>
                                                                <div class="container-fluid px-0">
                                                                    <div class="row">
                                                                        <div class="col-5 border-green rounded-3">
                                                                            <div class="row bg-black mb-2">
                                                                                <div class="col-1"><p class="text-white mb-0">#</p></div>
                                                                                <div class="col-6"><p class="text-white mb-0">NAME</p></div>
                                                                                <div class="col-5"><p class="text-white mb-0">POSITION</p></div>
                                                                            </div>
                                                                            <div class="scroll-container2">
                                                                                ${home}
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-2 d-flex flex-row align-items-center align-content-center"><img src="images/versus.png" class="me-2" style="width: 100%;"></div>
                                                                        <div class="col-5 border-green rounded-3">
                                                                            <div class="row bg-black mb-2">
                                                                                <div class="col-1"><p class="text-white mb-0">#</p></div>
                                                                                <div class="col-6"><p class="text-white mb-0">NAME</p></div>
                                                                                <div class="col-5"><p class="text-white mb-0">POSITION</p></div>  
                                                                            </div>
                                                                            <div class="scroll-container2">
                                                                                ${away}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                       </div>`,
    createEventDisplay2Content:(first, second) =>   `<div class="item my-2">
                                                                <div class="container-fluid bg-black rounded-3 my-4 py-4">
                                                                    <div class="container-fluid mb-4 rounded-3" style="background-color: rgba(5,168,64,0.21);">
                                                                        <h4 class="text-white mb-0">1° TIME</h4>
                                                                    </div>
                                                                    <div class="scroll-container2">
                                                                        <div class="container-fluid">
                                                                            ${first}
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div class="container-fluid bg-black rounded-3 my-4 py-4">
                                                                    <div class="container-fluid mb-4 rounded-3" style="background-color: rgba(5,168,64,0.21);">
                                                                        <h4 class="text-white mb-0">2° TIME</h4>
                                                                    </div>
                                                                    <div class="scroll-container2">
                                                                        <div class="container-fluid">
                                                                            ${second}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>`,
    createClubDisplayContent: data => `<div class="item my-2">
                                                <div class="container-fluid bg-black rounded-3">
                                                    <a href="${data.url}" class="bg-links" target="_blank">
                                                    <div class="row py-3">
                                                        <div class="col-3 d-flex flex-column justify-content-center align-items-end">
                                                            <img src="images/football-club.png" alt="CLub" style="width: 100px;">
                                                        </div>
                                                        <div class="col-9 d-flex flex-column justify-content-center align-items-start">
                                                            <h3 class="text-grey">${formatNames(data.name)}</h3>
                                                            <p class="text-grey">Stadium: ${data.stadiumName}</p>
                                                            <p class="text-grey">Capacity: ${data.stadiumSeats}</p>
                                                        </div>
                                                    </div>
                                                    </a>
                                                    <div class="row border-top-green mt-2 py-2">
                                                        <div class="col-3 d-flex flex-column justify-content-center align-items-center text-center rounded-3 selected-type">
                                                            <a href="#" class="interactable links" data-action="actDispClubSum" data-club="${data.clubId}" data-type="summary">
                                                                <p class="text-grey">SUMMARY</p>
                                                            </a>
                                                        </div>
                                                        <div class="col-3 d-flex flex-column justify-content-center align-items-center text-center selected-type">
                                                            <a href="#" class="interactable links" data-action="actDispClubRes" data-club="${data.clubId}" data-type="results">
                                                                <p class="text-grey">RESULTS</p>
                                                            </a>
                                                        </div>
                                                        <div class="col-3 d-flex flex-column justify-content-center align-items-center text-center selected-type">
                                                            <a href="#" class="interactable links" data-action="actDispClubChar" data-type="charts" data-game="${data.game_id}" data-homeclub="${data.home_club_id}" data-awayclub="${data.away_club_id}" >
                                                                <p class="text-grey">CHARTS</p>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                              </div>`,
    createClubDisplay2Content: data =>`<div class="item my-2">
                                                <div class="container-fluid bg-black rounded-3 my-4 py-4">
                                                    <div class="row my-2 rounded-3" style="background-color: rgba(5,168,64,0.21);">
                                                        <h4 class="text-white mb-0">INFORMATION</h4>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/growth.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">NET TRANSFER RECORD:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${formatValue(data.netTransferRecord)}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/full-size.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">SQUAD SIZE:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.squadSize}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/customer.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">FOREIGNERS PLAYERS:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">(${data.foreignersPercentage}%) ${data.foreignersNumber}/${data.squadSize}</p>
                                                        </div>
                                                    </div>
                                                     <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/customer.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">NATIONAL PLAYERS:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.nationalTeamPlayers}/${data.squadSize}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/age.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">AVARAGE AGE:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.averageAge}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/whistle.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">COACH:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.coachName}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/calendar.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">LAST SEASON:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.lastSeason}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                              </div>`,
    createClubResDisplay2Content: data =>`<div class="item my-2">
                                                <div class="container-fluid bg-black rounded-3 my-4">
                                                    <div class="row rounded-3 bg-black">
                                                        <div class="col-3">
                                                            <p class="text-grey mb-0">DATE</p>
                                                        </div>
                                                        <div class="col-4">
                                                            <p class="text-grey mb-0">HOME</p>
                                                        </div>
                                                        <div class="col-1">
                                                            <p class="text-grey mb-0">GOALS</p>
                                                        </div>
                                                        <div class="col-4 text-end">
                                                            <p class="text-grey mb-0">AWAY</p>
                                                        </div>
                                                    </div>
                                                    ${data}
                                                </div>
                                           </div>`,
    createPlayerDisplayContent: data =>`<div class="item my-2">
                                                <div class="container-fluid bg-black rounded-3">
                                                    <a href="${data.url}" class="bg-links" target="_blank">
                                                    <div class="row py-3">
                                                        <div class="col-3 d-flex flex-column justify-content-center align-items-end">
                                                            <img src="images/user-white.png" alt="CLub" style="width: 100px;">
                                                        </div>
                                                        <div class="col-9 d-flex flex-column justify-content-center align-items-start">
                                                            <h3 class="text-grey">${toUpperCase(data.name)}</h3>
                                                            <p class="text-grey">Position: ${data.position}</p>
                                                            <p class="text-grey">Birth: ${data.dateOfBirth}</p>
                                                        </div>
                                                    </div>
                                                    </a>
                                                    <div class="row border-top-green mt-2 py-2">
                                                        <div class="col-3 d-flex flex-column justify-content-center align-items-center text-center rounded-3 selected-type">
                                                            <a href="#" class="interactable links" data-action="actDispPlayerSum" data-player="${data.playerId}" data-type="summary">
                                                                <p class="text-grey">SUMMARY</p>
                                                            </a>
                                                        </div>
                                                        <div class="col-3 d-flex flex-column justify-content-center align-items-center text-center selected-type">
                                                            <a href="#" class="interactable links" data-action="actDispPlayerRes" data-club="${data.clubId}" data-type="results">
                                                                <p class="text-grey">LAST RESULTS</p>
                                                            </a>
                                                        </div>
                                                        <div class="col-3 d-flex flex-column justify-content-center align-items-center text-center selected-type">
                                                            <a href="#" class="interactable links" data-action="actDispPlayerCar" data-type="charts" data-game="${data.game_id}" data-homeclub="${data.home_club_id}" data-awayclub="${data.away_club_id}" >
                                                                <p class="text-grey">CAREER</p>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                              </div>`,
    createPlayerDisplay2Content: data =>`<div class="item my-2">
                                                <div class="container-fluid bg-black rounded-3 my-4 py-4">
                                                    <div class="row my-2 rounded-3" style="background-color: rgba(5,168,64,0.21);">
                                                        <h4 class="text-white mb-0">INFORMATION</h4>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/flag.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">COUNTRY OF BIRTH:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.countryOfBirth}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/city.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">CITY OF BIRTH:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.cityOfBirth}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/calendar.png" class="svg-container me-2">
                                                            <p class="text-white">DATE OF BIRTH:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.dateOfBirth}</p>
                                                        </div>
                                                    </div>
                                                     <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/football-club.png" class="svg-container me-2">
                                                            <p class="text-white">CURRENT CLUB:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.currentClubName}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/footprint.png"  class="svg-container me-2">
                                                            <p class="text-white">FOOT:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.foot}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/height.png" class="svg-container me-2">
                                                            <p class="text-white">HEIGHT:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.heightInCm}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/growth.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">MARKET VALUE:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.marketValueInEur}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/gps.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">POSITION:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.position}</p>
                                                        </div>
                                                    </div>
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-6 d-flex flex-row align-items-start">
                                                            <img src="images/gps.png" alt="Offers" class="svg-container me-2">
                                                            <p class="text-white">SUB-POSITION:</p>
                                                        </div>
                                                        <div class="col-6 d-flex flex-column align-items-end">
                                                           <p class="text-white">${data.subPosition}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                              </div>`
};

//                                              <p class="text-white">${data.url}</p>
