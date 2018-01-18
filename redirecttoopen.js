var getContent = function(url, acceptType, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    if (acceptType == 'application/json') {
        xhr.responseType = 'json';
    }
    xhr.setRequestHeader('Accept', acceptType);
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function redirectToOpen(doi) {
    const oadoi_url = `https://api.oadoi.org/v2/${doi}?email=test@example.com`;
    const scihub_url = `http://sci-hub.la/${doi}`;
    
    getContent(oadoi_url, 'application/json', function (status, response) {
        if (response.best_oa_location && response.best_oa_location.url_for_pdf){
            window.location.replace(response.best_oa_location.url_for_pdf);
        } else {
            window.location.replace(scihub_url);
        }
        console.log(response)
    })
}