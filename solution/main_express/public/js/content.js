const content = {
    createClubsContent:             data => `<div class="item my-2">
                                                <a href="#" class="interactable links d-flex align-items-center" data-club="${data.clubId}">
                                                    <img src="images/football-club.svg" alt="Offers" class="svg-container me-2">
                                                    <p class="mb-0">${data.name}</p>
                                                </a>
                                             </div>`,
    createNationsDropdownContent:   data => `<option value="${data.name}">${data.name}</option>`,
    createNationsListContent:       data => `<div class="item my-2">
                                                <a href="#" class="interactable links d-flex align-items-center" data-action="controllerSoccerData" data-nation="${data.name}">
                                                    <div class="svg-container me-2">${data.sig}</div>
                                                    ${actions.formatNames(data.name)}
                                                </a>
                                            </div>`,
    createChampionsContent:         data => `<div class="item my-2">
                                                <a href="#" class="interactable links d-flex align-items-center" data-action="controllerSoccerData"  data-country="${data.countryName}" data-name="${data.name}" data-champion="${data.competitionId}">
                                                    <div class="svg-container me-2">${data.sig}</div>
                                                    <p class="mb-0">${actions.formatNames(data.name)}</p>
                                                </a>
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
                                                <div class="item my-2">
                                                    <a href="#" class="interactable links d-flex align-items-center" data-action="controllerSoccerData" data-season="${data.season}" data-competition="${data.competition_id}">
                                                        <p class="mb-0">${data.season}</p>
                                                    </a>
                                                </div>
                                             </div>`,
    createGamesContent:             data => `<div class="item my-2">
                                                    <div class="row">
                                                        <div class="col-5">
                                                            <a href="#" class="interactable links d-flex align-items-center" data-action="controllerSoccerData" data-club="${data.home_club_id}">
                                                                <p class="mb-0">${data.home_club_name}</p>
                                                            </a>
                                                        </div>
                                                        <div class="col-2">
                                                            <p class="mb-0">${data.home_club_goals} ${data.away_club_goals}</p>
                                                        </div>
                                                        <div class="col-5">
                                                            <a href="#" class="interactable links d-flex align-items-center" data-action="controllerSoccerData" data-club="${data.away_club_id}">
                                                                <p class="mb-0">${data.away_club_name}</p>
                                                             </a>
                                                        </div>
                                                    </div>
                                            </div>`,
    createBreadCrumbsContent:       data => `<h4 class="mb-0 text-white">${data.name} > ${data.season}</h4>`,
    createClubPlayersContent:       data => `<div class="item my-2">
                                                 <a href="#" class="interactable links" data-action="controllerSoccerData" data-playerId="${data.playerId}">
                                                    <div class="row">
                                                        <div class="col-4 d-flex justify-content-center align-items-center">
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