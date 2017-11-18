const baseApi = "https://en.wikipedia.org/w/api.php";
const userInput = document.querySelector('.user-input > input#search');
const result = document.getElementsByClassName('result')[0];

function getResults() {
    const text = userInput.value;

    const headers = new Headers();
    headers.append('Origin', '*');

    const url = baseApi +
        "?action=query" +
        "&list=search" +
        "&srsearch=" + text +
        "&format=json";

    var script;

    const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());
    window[callbackName] = function (data) {
        delete window[callbackName];
        document.body.removeChild(script);

        const searchResults = data.query.search.map(function (searchResult) {
            return '<div class="search-result-title"><a href="https://en.wikipedia.org/wiki/' + searchResult.title + '">' +
                searchResult.title +
                '</a></div>' +
                '<div class="search-result-snippet">' + searchResult.snippet + '</div>'
        });

        result.innerHTML = searchResults.join(" ");
    };

    script = document.createElement("script");
    script.src = url + '&callback=' + callbackName;
    document.body.appendChild(script);

}

const searchButton = document.getElementsByClassName("search")[0];

searchButton.addEventListener('click', function (e) {
    getResults();
});
