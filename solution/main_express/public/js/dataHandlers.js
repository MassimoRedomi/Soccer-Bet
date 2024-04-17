function handleNationsClick(data) {
    const url = "/api/send-country";
    const elementId = "champions_nation_list";
    const limit =null;
    const processData = createChampionsLink;

    sendAxiosQuery(url, data, elementId, processData, limit);
}


function createNationsLink(nat) {
    return `<div class="container my-2">
              <a href="#" class="nation-link links d-flex align-items-center" data-nation="${nat.name}">
                  <div class="svg-container mx-2">${nat.sig}</div>
                  ${nat.name}
              </a>
            </div>`;
}

function createClubsLink(club){
    return `<div class="container d-flex flex-row align-items-center my-2">
                <img src="images/football-club.svg" alt="Offers" width="25px" class="mx-2">
                <p class="mb-0">${club.name}</p>
             </div>`;
}

function createChampionsLink(champ) {
    return `<div class="container d-flex flex-row align-items-center my-2">
                <a href="#" class="champion-link links d-flex align-items-center" data-champion="${champ.competitionId}">
                    <div class="svg-container mx-2">${champ.sig}</div>
                    <p class="mb-0">${champ.name}</p>
                </a>
           </div>`;
}

function createNewsLink(article){
    return htmlContent += `
                <div class="news-card">
                    <a href="${article.url}" target="_blank" class="news-card__card-link"></a>
                    <img src="${article.urlToImage}" alt="News Image" style="width:100%;" class="news-card__image">
                    <div class="news-card__text-wrapper">
                        <h3 class="news-card__title">${article.title}</h3>
                        <div class="news-card__details-wrapper">
                            <p class="news-card__excerpt">${article.description}</p>
                        </div>
                    </div>
                </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    async function loadData() {
        getAxiosQuery('/api/clubs-names', 'clubs', createClubsLink, null);
        getAxiosQuery('/api/champions', 'champions', createChampionsLink, null);
        getAxiosQuery('/api/soccer-nations', 'nations', createNationsLink, null, function () {
            attachClickHandlers('.nation-link', handleNationsClick, 'data-nation');
        });
    }

    loadData().catch(error => console.error('Error loading data', error));
});


