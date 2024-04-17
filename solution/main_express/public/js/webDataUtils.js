function sendAxiosQuery(url, data, elementId, fun, limit, callback) {
    axios.post(url , data)
        .then(response => {
            processData(response.data, elementId, fun, limit);
            if (callback) callback();
        })
        .catch( function (response) {
            alert (response.toJSON());
        })
}

function getAxiosQuery(url, elementId, fun, limit, callback) {
    axios.get(url)
        .then(response => {
            processData(response.data, elementId, fun, limit);
            if (callback) callback();
        })
        .catch( function (response) {
            alert (response.toJSON());
        })
}

function processData(data, elementId, fun, limit) {
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



