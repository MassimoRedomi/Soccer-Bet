const content = {
    createClubsContent:             data => `<div class="item my-2">
                                                <a href="#" class="interactable links d-flex align-items-center"  data-action="controllerSoccerData" data-club="${data.clubId}" data-clubName="${data.name}">
                                                    <img src="images/football-club.svg" alt="Offers" class="svg-container me-2">
                                                    <p class="mb-0">${data.name}</p>
                                                </a>
                                             </div>`,
    createNationsDropdownContent:   data => `<option value="${data.name}">${data.name}</option>`,
    createNationsListContent:       data => `<div class="container rounded-3 my-2">
                                                <div class="item my-2">
                                                    <a href="#" class="interactable links d-flex align-items-center" data-action="controllerSoccerData" data-nation="${data.name}">
                                                        <div class="svg-container me-2">${data.sig}</div>
                                                        ${actions.formatNames(data.name)}
                                                    </a>
                                                </div>
                                             </div>`,
    createChampionsContent:         data => `<div class="container rounded-3 my-2">
                                                <div class="item my-2">
                                                    <a href="#" class="interactable links d-flex align-items-center" data-action="controllerSoccerData"  data-champion="${data.competitionId}" data-nation="${data.countryName}">
                                                        <div class="svg-container me-2">${data.sig}</div>
                                                        <p class="mb-0">${actions.formatNames(data.name)}</p>
                                                    </a>
                                                </div>
                                             </div>`,
    createLanguageContent:          data => `<div class="item my-2">
                                                <a href="#" class="interactable links d-flex align-items-center" data-action="loadChampionsChats" data-language="${data.name}">
                                                    <div class="svg-container me-2">${data.sig}</div>
                                                </a>
                                            </div>`,
    createChampionChatContent:      data => `<div class="col-md-4">
                                                <div class="item my-2">
                                                     <a href="#" class="interactable links d-flex align-items-center" data-action="loadChampionChat" data-champion="${data.name}">
                                                        <div class="svg-container me-2">${data.sig}</div>
                                                        <p class="mb-0">${actions.formatNames(data.name)}</p>
                                                    </a>
                                                </div>
                                            </div>`,
    createSeasonsContent:           data => `<div class="col-4">
                                                <div class="container bg-black text-white rounded-3 my-2 selected-season">
                                                    <div class="item">
                                                        <a href="#" class="interactable links" data-action="controllerSoccerData" data-season="${data.season}" data-competition="${data.competition_id}" data-name="${data.competition_name}">
                                                            <p class="mb-0">${data.season}</p>
                                                        </a>
                                                    </div>
                                                </div>
                                             </div>`,
    createGamesContent:             data => `<div class="item my-2">
                                                    <div class="row border-bottom-grey">
                                                        <div class="col-4 d-flex flex-column align-items-start">
                                                            <a href="#" class="interactable links" data-action="controllerSoccerData" data-club="${data.home_club_id}" data-clubName="${data.home_club_name}">
                                                                <p class="tooltip-container mb-0">${actions.setDimNames(data.home_club_name)} <span class="tooltip-text">${data.home_club_id}</span></p>
                                                            </a>
                                                        </div>
                                                        <div class="col-4 d-flex flex-column align-items-center">
                                                           ${actions.setColorNumbers(data.home_club_goals, data.away_club_goals)}
                                                        </div>
                                                        <div class="col-4 d-flex flex-column align-items-end">
                                                            <a href="#" class="interactable links" data-action="controllerSoccerData" data-club="${data.away_club_id}" data-clubName="${data.away_club_name}">
                                                                <p class="mb-0">${actions.setDimNames(data.away_club_name)}</p>
                                                             </a>
                                                        </div>
                                                    </div>
                                            </div>`,
    createBreadCrumbsContent:       data => `<h4 class="mb-0 text-white">${actions.formatNames(data.name)} > ${data.season}</h4>`,
    createClubPlayersContent:       data => `<div class="item my-2">
                                                 <a href="#" class="interactable links" data-action="controllerSoccerData" data-playerId="${data.playerId}">
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
                                             </div>`
};