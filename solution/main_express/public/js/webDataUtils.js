function sendAxiosQuery(url, data, elementId, fun, callbacks) {
    axios.post(url , data)
        .then(response => {
            processData(response.data, elementId, fun);
            if (callbacks && callbacks.clickHandler){
                callbacks.clickHandler();
            }
            if (callbacks && callbacks.buttonHandler){
                callbacks.buttonHandler();
            }
        })
        .catch( function (response) {
            alert (response.toJSON());
        })
}

function getAxiosQuery(url, elementId, fun, callbacks) {
    axios.get(url)
        .then(response => {
            processData(response.data, elementId, fun);
            if (callbacks && callbacks.clickHandler){
                callbacks.clickHandler();
            }
            if (callbacks && callbacks.buttonHandler){
                callbacks.buttonHandler(response.data);
            }
        })
        .catch( function (response) {
            alert (response.toJSON());
        })
}

function processData(data, elementId, fun) {
    const container = document.getElementById(elementId);
    let htmlContent = '';

    data.forEach(dat => {
        htmlContent += fun(dat);
    });

    container.innerHTML = htmlContent;
}

function attachClickHandlers(selector, action) {
    document.querySelectorAll(selector).forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let data = {};
            if (this.tagName.toLowerCase() === 'form') {
                const arr = $(this).serializeArray();
                arr.forEach(item => {
                    data[item.name] = item.value;
                });
            } else {
                Object.entries(this.dataset).forEach(([key, value]) => {
                    data[key] = value;
                });
            }
            action(data);
        });
    });
}


function attachButtonHandler(elementId, buttonId, limit) {
    const button = document.getElementById(buttonId);
    let isLimited = true;

    initializeItemsVisibility(elementId, buttonId, limit);

    button.addEventListener('click', function() {
        event.preventDefault();
        const container = document.getElementById(elementId);
        let items = container.querySelectorAll('.item');

        if (isLimited) {
            items.forEach((item, index) => {
                if (index >= limit) {
                    item.style.display = 'block';
                }
            });
            button.textContent = 'Show Less';
            isLimited = false;
        } else {
            items.forEach((item, index) => {
                if (index >= limit) {
                    item.style.display = 'none';
                }
            });
            button.textContent = 'Show More';
            isLimited = true;
        }
    });
}

function initializeItemsVisibility(elementId, buttonId, limit) {
    const container = document.getElementById(elementId);
    const items = container.querySelectorAll('.item');

    items.forEach((item, index) => {
        if (index >= limit) {
            item.style.display = 'none';
        } else {
            item.style.display = '';
        }
    });

    // Initialize the button text
    const button = document.getElementById(buttonId);
    if (button) {
        button.textContent = 'Show More';
    }
}
