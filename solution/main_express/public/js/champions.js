let allChampions = [];
let isChampionsExpanded = false;  // Track expanded state for champions

function displayChampions(limit) {
    const container = document.getElementById('champions');
    let htmlContent = '';

    const champsToShow = allChampions.slice(0, limit);
    champsToShow.forEach(comp => {
        htmlContent += `<div class="container d-flex flex-row align-items-center my-2">
                                    <div class="svg-container mx-2">${comp.sig}</div>
                                    <p class="mb-0">${comp.name}</p>
                                </div>`;
    });

    container.innerHTML = htmlContent;
}

function toggleChampions() {
    if (isChampionsExpanded) {
        displayChampions(14);  // Collapse to first 14 champions
        document.getElementById('toggleChampions').textContent = 'See More';
        isChampionsExpanded = false;
    } else {
        displayChampions(allChampions.length);  // Expand to show all champions
        document.getElementById('toggleChampions').textContent = 'Show Less';
        isChampionsExpanded = true;
    }
}

axios.get('/api/champions')
    .then(function (response) {
        allChampions = response.data;
        displayChampions(14);  // Initially display only 14 champions
        if (allChampions.length > 14) {
            document.getElementById('toggleChampions').style.display = 'block';  // Show toggle button
        }
    })
    .catch(function (error) {
        console.log('Error fetching data:', error);
        document.getElementById('champions').innerHTML = '<p>Error loading data.</p>';
    });

