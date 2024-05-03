const content = {
    createClubsContent:             data => `<div class="item my-2">
                                                <a href="#" class="interactable links d-flex align-items-center" data-club="${data.clubId}">
                                                    <img src="images/football-club.svg" alt="Offers" class="svg-container me-2">
                                                    <p class="mb-0">${data.name}</p>
                                                </a>
                                             </div>`,
    createNationsDropdownContent:   data => `<option value="${data.name}">${data.name}</option>`,
    createNationsListContent:       data => `<div class="item my-2">
                                                <a href="#" class="interactable links d-flex align-items-center" data-action="loadConnectedDataNation" data-nation="${data.name}">
                                                    <div class="svg-container me-2">${data.sig}</div>
                                                    ${data.name}
                                                </a>
                                            </div>`,
    createChampionsContent:         data => `<div class="item my-2">
                                                <a href="#" class="interactable links d-flex align-items-center" data-champion="${data.competitionId}">
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
                                            </div>`
};