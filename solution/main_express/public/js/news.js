document.addEventListener('DOMContentLoaded', function() {
    let showAll = false;

    const toggleLink = document.getElementById('toggleNews');

    function fetchArticles() {
        axios.get('/api/news')
            .then(function (response) {
                const articles = response.data.articles;
                updateArticles(articles);
            })
            .catch(function (error) {
                console.log('Error fetching news:', error);
                document.getElementById('news').innerHTML = '<p>Error loading news.</p>';
            });
    }

    function updateArticles(articles) {
        const container = document.getElementById('news');
        let htmlContent = '<div class="content-wrapper bg-grey rounded-3">';
        const limit = showAll ? articles.length : 24;

        articles.slice(0, limit).forEach(article => {
            if (article.title === "[Removed]") {
                return;
            }
            htmlContent += `
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
        });

        htmlContent += '</div>';
        container.innerHTML = htmlContent;
    }

    function toggleNews() {
        showAll = !showAll;
        toggleLink.textContent = showAll ? 'Show Less' : 'See More';
        fetchArticles();
    }

    window.toggleNews = toggleNews;

    fetchArticles();
});
