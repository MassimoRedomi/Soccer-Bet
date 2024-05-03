document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
    checkLoginStatus();
    loadLastActiveSection();
});

const sections = {
    newsChats: document.getElementById('news-chats-container'),
    stats: document.getElementById('stats-container'),
    chats: document.getElementById('chats-container'),
    news: document.getElementById('news-container')
};

const links = {
    news: document.getElementById('nav-news'),
    stats: document.getElementById('nav-stats'),
    chats: document.getElementById('nav-chats')
};

function hideAllSections(exclude) {
    Object.entries(sections).forEach(([key, section]) => {
        section.style.display = (key === exclude) ? 'block' : 'none';
    });
}

function deactivateAllLinks() {
    Object.values(links).forEach(link => link.classList.remove('active', 'disabled'));
}

function activateSection(sectionKey) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn && (sectionKey === 'stats' || sectionKey === 'chats')) {
        updateElementHtml('congrats', '<h3>Please log in to continue</h3>', 'replace');
        actions.openLoginModal();
        return;
    }

    hideAllSections(sectionKey);
    deactivateAllLinks();

    if (sectionKey === 'chats') {
        sections.newsChats.style.display = 'block';
        sections.news.style.display = 'none';
        sections.chats.style.display = 'block';
    } else if (sectionKey === 'news') {
        sections.newsChats.style.display = 'block';
        sections.news.style.display = 'block';
        sections.chats.style.display = 'none';
    } else if (sectionKey === 'stats') {
        sections.stats.style.display = 'block';
    }

    links[sectionKey].classList.add('active');
    localStorage.setItem('activeSection', sectionKey);
}

function setupEventListeners() {
    Object.keys(links).forEach(key => {
        links[key].addEventListener('click', function(event) {
            event.preventDefault();
            activateSection(key);
        });
    });
}

async function checkLoginStatus() {
    try {
        const response = await fetch('/api/check-login');
        const data = await response.json();
        console.log(data.isLoggedIn);
        localStorage.setItem('isLoggedIn', data.isLoggedIn);
        if (data.isLoggedIn) {
            actions.updateLoginUI('LOGOUT', 'userLogout');
            actions.setUserName();
            initChat();
        } else {
            actions.updateLoginUI('LOGIN', 'openLoginModal');
            links.stats.classList.add('disabled');
            links.chats.classList.add('disabled');
            activateSection('news');
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        activateSection('news');
    }
}

function loadLastActiveSection() {
    const lastActiveSection = localStorage.getItem('activeSection');
    if (lastActiveSection && sections[lastActiveSection]) {
        activateSection(lastActiveSection);
    } else {
        activateSection('news');
    }
}

