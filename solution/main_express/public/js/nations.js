function handleNationsClick(data) {
    const url = "/api/send-country";
    const elementId = "champions_nation_list";
    const processData = createChampionsLink;

    sendAxiosQuery(url, data, elementId, processData);
}


function createNationsLink(nat) {
    return `<div class="container my-2">
              <a href="#" class="nation-link links d-flex align-items-center" data-nation="${nat.name}">
                  <div class="svg-container mx-2">${nat.sig}</div>
                  ${nat.name}
              </a>
            </div>`;
}


function createChampionsLink(champ) {
    return `<div class="container my-2">
              <a href="#" class="champion-link links d-flex align-items-center" data-champion="${champ.competitionId}">
                  ${champ.name}
              </a>
            </div>`;
}


document.addEventListener('DOMContentLoaded', () => {
    getAxiosQuery('/api/soccer-nations', 'nations', createNationsLink, function() {
        attachClickHandlers('.nation-link', handleNationsClick, 'data-nation');
    });
});


