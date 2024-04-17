document.addEventListener('DOMContentLoaded', function () {
    const sections = {
        news: document.getElementById('news-container'),
        stats: document.getElementById('stats-container'),
        chats: document.getElementById('chats-container')
    };

    const links = {
        news: document.getElementById('nav-news'),
        stats: document.getElementById('nav-stats'),
        chats: document.getElementById('nav-chats')
    };

    function hideAllSections() {
        Object.values(sections).forEach(section => section.style.display = 'none');
    }

    function deactivateAllLinks() {
        Object.values(links).forEach(link => link.classList.remove('active'));
    }

    function activateSection(sectionKey) {
        hideAllSections();
        deactivateAllLinks();
        sections[sectionKey].style.display = 'block';
        links[sectionKey].classList.add('active');
        localStorage.setItem('activeSection', sectionKey);
    }

    function setupEventListeners() {
        Object.keys(links).forEach(key => {
            links[key].addEventListener('click', function (event) {
                event.preventDefault();
                activateSection(key);
            });
        });
    }

    // Initialization function to set up the page
    function init() {
        setupEventListeners();
        const lastActiveSection = localStorage.getItem('activeSection');
        if (lastActiveSection && sections[lastActiveSection]) {
            activateSection(lastActiveSection);
        } else {
            activateSection('news');
        }
    }

    init();
});
