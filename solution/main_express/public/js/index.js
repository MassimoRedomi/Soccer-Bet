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
    Object.values(links).forEach(link => link.classList.remove('active', 'disabled'));
}

function activateSection(sectionKey) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if ((sectionKey === 'stats' || sectionKey === 'chats') && !isLoggedIn) {
        updateElementHtml('congrats', '<h3>Please, Log in to continue</h3>', 'replace');
        actions.openLoginModal();
        return;
    }

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

async function checkLoginStatus() {
    try {
        const response = await fetch('/api/check-login');
        const data = await response.json();
        console.log(data.isLoggedIn);
        localStorage.setItem('isLoggedIn', data.isLoggedIn);
        if (data.isLoggedIn) {
            const loginLink = document.getElementById('nav-login');
            loginLink.innerHTML = '<h6>LOGOUT</h6>';
            loginLink.setAttribute('data-action', 'userLogout');
            const lastActiveSection = localStorage.getItem('activeSection') || 'news';
            activateSection(lastActiveSection);
            initChat();
            actions.closeModal();
        } else {
            const loginLink = document.getElementById('nav-login');
            loginLink.innerHTML = '<h6>LOGIN</h6>';
            loginLink.setAttribute('data-action', 'openLoginModal');
            links.stats.classList.add('disabled');
            links.chats.classList.add('disabled');
            activateSection('news');
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        activateSection('news');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
    checkLoginStatus();
});
