//#endregion 
function clearScreen() {
    var div = document.getElementById('div');
    div === null || div === void 0 ? void 0 : div.replaceChildren();
}
function part1() {
    clearScreen();
    getCities()
        .then(function (cities) {
        displayCities(cities);
    });
}
function part2() {
    clearScreen();
    getCityWithRelations()
        .then(function (cit) {
        displayCityWCountry(cit);
    });
}
function part3() {
    clearScreen();
    createUI();
    // createCity();
}
var url = "https://cityinfo.buchwaldshave34.dk/api";
var userName = "UserName=UserAnna";
//#region Assignment 1
// 1 - Display Cities uden relationer.
function getCities() {
    return fetch(url + "/City?includeRelations=false&" + userName)
        .then(function (response) { return response.json(); })
        .then(function (response) {
        return response;
    });
}
function displayCities(cities) {
    cities.forEach(function (city) {
        var button = document.createElement('input');
        button.type = 'button';
        button.setAttribute('ID', 'btn');
        button.value = city.name;
        var div = document.getElementById("div");
        div === null || div === void 0 ? void 0 : div.append(button);
    });
}
//#endregion
//#region  Assignment 2
// 2 - Display Cities with relations.
function getCityWithRelations() {
    return fetch(url + "/City?includeRelations=true&" + userName)
        .then(function (response) { return response.json(); })
        .then(function (response) {
        return response;
    });
}
function displayCityWCountry(cityCountry) {
    cityCountry.forEach(function (country) {
        var p = document.createElement('p');
        p.setAttribute('ID', 'btn');
        p.innerHTML = "Country: " + country.country.countryName + " | City: " + country.name;
        var div = document.getElementById("div");
        div === null || div === void 0 ? void 0 : div.append(p);
    });
}
//#endregion
//#region Assignment 3
// 3 - Create City belonging to CountryId. 
var city = {
    "name": "dddd",
    "description": "Descr",
    "countryID": 14
};
function createUI() {
    var cityName = document.createElement('input');
    cityName.setAttribute('placeholder', 'Enter City Name');
    var cityDesc = document.createElement('input');
    cityDesc.setAttribute('placeholder', 'Enter description');
    var countryid = document.createElement('input');
    countryid.setAttribute('placeholder', 'Enter country Id');
    var button = document.createElement('input');
    button.type = 'button';
    button.setAttribute('ID', 'btn');
    button.value = "Create City";
    button.setAttribute('onClick', 'createCity()');
    var div = document.getElementById("div");
    div === null || div === void 0 ? void 0 : div.append(cityName);
    div === null || div === void 0 ? void 0 : div.append(cityDesc);
    div === null || div === void 0 ? void 0 : div.append(countryid);
    div === null || div === void 0 ? void 0 : div.append(button);
}
function createCity() {
    fetch(url + "/City?" + userName, {
        method: 'POST',
        body: JSON.stringify(city),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(function (result) { return result.json(); })
        .then(function (jsonformat) { return console.log(jsonformat); });
}
//#endregion
