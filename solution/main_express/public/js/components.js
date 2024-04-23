function validateSigninData(data, elementId) {
    const mail = data.email;
    const password1 = data.password1;
    const password2 = data.password2;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(mail)) {
        updateElementHtml(elementId, '<p class="text-red">Invalid email format.</p>', 'replace');
        return false;
    }

    if (password1 !== password2) {
        updateElementHtml(elementId, '<p class="text-red">Passwords do not match.</p>', 'replace');
        return false;
    }

    if (password1.length < 8 || password1.length > 72) {
        updateElementHtml(elementId, '<p class="text-red">Password must be between 8 and 72 characters.</p>', 'replace');
        return false;
    }

    const hasUppercase = /[A-Z]/.test(password1);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password1);

    if (!hasUppercase || !hasSymbol) {
        updateElementHtml(elementId, '<p class="text-red">Password must contain at least one uppercase letter and one symbol.</p>', 'replace');
        return false;
    }

    return true;
}

function validateLoginData(data, elementId) {
    const email = data.email;
    const password = data.password;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for validating email

    if (!emailRegex.test(email)) {
        updateElementHtml(elementId, '<p class="text-red">Invalid email format.</p>', 'replace');
        return false;
    }

    if (password.length < 8 || password.length > 72) {
        updateElementHtml(elementId, '<p class="text-red">Password must be between 8 and 72 characters.</p>', 'replace');
        return false;
    }

    return true;
}


function fullContentAfterLogin(data){
    return null;
}

function moveToLogin(data){
    const modaLogin = document.getElementById('loginModal');
    const modalSign = document.getElementById('signinModal');
    updateElementHtml('congrats', '<h3>Congratulations! Your account is created</h3>', 'replace');
    updateElementHtml('congrats2', '<p>Welcome, do your first login</p>', 'replace');
    modaLogin.style.display = 'block';
    modalSign.style.display = 'none';
}

/**
 * Updates the select dropdown options marking the specified default value as selected.
 *
 * @param {string} selectId - The ID of the select element to update.
 * @param {string} defaultValue - The value that should be marked as selected in the dropdown.
 */
function updateSelectOptions(selectId, defaultValue) {
    const selectElement = document.getElementById(selectId);
    if (!selectElement) {
        console.error('Select element not found:', selectId);
        return;
    }

    const options = Array.from(selectElement.options).map(option => ({name: option.value}));

    const optionsHtml = options.map(option => {
        const isSelected = option.name === defaultValue.nation ? ' selected' : '';
        return `<option value="${option.name}"${isSelected}>${option.name}</option>`;
    }).join('');

    selectElement.innerHTML = optionsHtml;
}

