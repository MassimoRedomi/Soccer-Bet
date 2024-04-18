function handleNationsClick(data) {
    const url = "/api/send-country";
    const elementId = "champions_nation_list";
    const limit =null;
    const processData = createChampionsLink;

    sendAxiosQuery(url, data, elementId, processData, limit);
}


function createNationsLink(nat) {
    return `<div class="item">
                <div class="container my-2">
                    <a href="#" class="nation-link links d-flex align-items-center" data-nation="${nat.name}">
                        <div class="svg-container mx-2">${nat.sig}</div>
                        ${nat.name}
                    </a>
                </div>
            </div>`;
}

function createClubsLink(club){
    return `<div class="item">
                <div class="container d-flex flex-row align-items-center my-2 item">
                    <img src="images/football-club.svg" alt="Offers" width="25px" class="mx-2">
                    <p class="mb-0">${club.name}</p>
                </div>
            </div>`;
}

function createChampionsLink(champ) {
    return `<div class="item">
                <div class="container d-flex flex-row align-items-center my-2">
                    <a href="#" class="champion-link links d-flex align-items-center" data-champion="${champ.competitionId}">
                        <div class="svg-container mx-2">${champ.sig}</div>
                        <p class="mb-0">${champ.name}</p>
                    </a>
                </div>
            </div>`;
}


document.addEventListener('DOMContentLoaded', () => {
    async function loadData() {
        await getAxiosQuery('/api/clubs-names', 'clubs', createClubsLink, {
            buttonHandler: () => attachButtonHandler('clubs', 'toggleClubs', 14)
        });
        await getAxiosQuery('/api/champions', 'champions', createChampionsLink,{
            buttonHandler: () => attachButtonHandler('champions', 'toggleChampions', 14)
        });
        await getAxiosQuery('/api/soccer-nations', 'nations', createNationsLink, {
            clickHandler: () => attachClickHandlers('.nation-link', handleNationsClick, 'data-nation')
        });
    }

    loadData().catch(error => console.error('Error loading data', error));
});


