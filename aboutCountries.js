// get remote data with specified fields
const getCountryData = (resource) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
            console.log(request, request.readyState);
            if(request.readyState === 4 && request.status === 200){
                const data = JSON.parse(request.responseText);  
                resolve(data);
            } else if(request.readyState === 4){
                reject('error getting resource');
            }
        });
        request.open('GET', resource);
        request.send();
    });
};
// filter and format by country
const formatInfoData = (data, userInput) => {
    const filteredData = data.filter(country => (country.name.toLowerCase().includes(userInput.toLowerCase()))); 
    content.innerHTML = `About ${userInput}<br>`
    filteredData.forEach(country => content.innerHTML += `<br>country: ${country.name}<br>region: ${country.region}<br>subregion: ${country.subregion}<br>top level domain: ${country.topLevelDomain[0]}<br>`);
    if(!filteredData.length) {
        content.innerHTML += 'That country was not found, check spelling';
    };
};
// filter and format by region
const formatRegionData = (data, userInput) => {
    const filteredData = data.filter(country => (country.region.toLowerCase() === userInput.toLowerCase())); 
    content.innerHTML = `Countries in region ${userInput}:<br>`;
    filteredData.forEach(country => content.innerHTML += `&nbsp&nbsp${country.name}<br>`);
    content.innerHTML += `<br>Count of countries in region ${userInput} is ${filteredData.length}<br>`;
    if(!filteredData.length) {
        content.innerHTML += 'That region was not found, check spelling';
    };
};
// filter and format by subregion
const formatSubregionData = (data, userInput) => {
    const filteredData = data.filter(country => (country.subregion.toLowerCase() === userInput.toLowerCase())); 
    content.innerHTML = `Countries in subregion ${userInput}:<br>`;
    filteredData.forEach(country => content.innerHTML += `&nbsp&nbsp${country.name}<br>`);
    content.innerHTML += `<br>Count of countries in subregion ${userInput} is ${filteredData.length}<br>`;
    if(!filteredData.length) {
        content.innerHTML += 'That subregion was not found, check spelling';
    };
};
// filter and format by top level domain
const formatDomainData = (data, userInput) => {
    userInput = '.' + userInput;
    console.log(userInput);
    const filteredData = data.filter(country => (country.topLevelDomain[0].toLowerCase() === (userInput.toLowerCase()))); 
    if(filteredData.length) {
        content.innerHTML = `Top Level Domain ${userInput.toLowerCase()} is for ${filteredData[0].name}<br>`;
    } else {
        content.innerHTML = 'That domain was not found, check spelling -- no periods, please';
    };
};
// handles
const content = document.querySelector('.results');
const info = document.querySelector('#info');
const region = document.querySelector('#region');
const subregion = document.querySelector('#subregion');
const domain = document.querySelector('#domain');
const request = document.querySelector('input');
// convert json data to local array, event listeners for radio buttons calling associated functions
getCountryData('https://restcountries.eu/rest/v2/all?fields-name;region;subregion;topLevelDomain')
    .then(data => {
        console.log('promise resolved:', data);  // log new array to console if promise resolved
        // country information event listener
        info.addEventListener('change', e => {
            e.preventDefault();
            formatInfoData(data, request.value);
        });
        // region event listener
        region.addEventListener('change', e => {
            e.preventDefault();
            formatRegionData(data, request.value);
        });
        // subregion event listener
        subregion.addEventListener('change', e => {
            e.preventDefault();
            formatSubregionData(data, request.value);
        });
        // top level domain event listener
        domain.addEventListener('change', e => {
            e.preventDefault();
            formatDomainData(data, request.value);
        });
    })
    .catch(err => {
        console.log('promise rejected:', err);  // log error message to console if promise rejected
    });
