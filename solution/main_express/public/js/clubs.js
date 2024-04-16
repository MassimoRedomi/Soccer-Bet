let allClubs = [];
let isExpanded = false;

function displayClubs(limit) {
    const container = document.getElementById('clubs');
    let htmlContent = '';

    const clubsToShow = allClubs.slice(0, limit);
    clubsToShow.forEach(comp => {
        htmlContent += `<div class="container d-flex flex-row align-items-center my-2">
                                    <img src="images/football-club.svg" alt="Offers" width="25px" class="mx-2">
                                    <p class="mb-0">${comp.name}</p>
                                </div>`;
    });

    container.innerHTML = htmlContent;
}

function toggleClubs() {
    if (isExpanded) {
        displayClubs(14); // Show limited clubs
        document.getElementById('toggleButton').textContent = 'See More';
        isExpanded = false;
    } else {
        displayClubs(allClubs.length); // Show all clubs
        document.getElementById('toggleButton').textContent = 'Show Less';
        isExpanded = true;
    }
}

axios.get('/api/clubs-names')
    .then(function (response) {
        allClubs = response.data;
        displayClubs(14);
        if (allClubs.length > 14) {
            document.getElementById('toggleButton').style.display = 'block';
        }
    })
    .catch(function (error) {
        console.log('Error fetching data:', error);
        document.getElementById('clubs').innerHTML = '<p>Error loading data.</p>';
    });