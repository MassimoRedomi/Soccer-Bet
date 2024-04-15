axios.get('/api/soccer-nations')
    .then(function (response) {
        const competitions = response.data;
        const container = document.getElementById('nations');
        let htmlContent = '';

        competitions.forEach(comp => {
            htmlContent += `<div class="container d-flex flex-row align-items-center my-2">
                                <div class="svg-container mx-2">${comp.sig}</div>
                                <p class="mb-0">${comp.name}</p>
                            </div>`;
        });

        container.innerHTML = htmlContent;
    })
    .catch(function (error) {
        console.log('Error fetching data:', error);
        document.getElementById('nations').innerHTML = '<p>Error loading data.</p>';
    });