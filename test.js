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
        var tt = document.createElement('p');
        tt.innerHTML = city.name;
        var div = document.getElementById("div");
        div === null || div === void 0 ? void 0 : div.append(tt);
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
        p.innerHTML = "City: " + country.name + " | Country: " + country.country.countryName;
        var div = document.getElementById("div");
        div === null || div === void 0 ? void 0 : div.append(p);
    });
}
//#endregion
//#region Assignment 3
// 3 - Create City belonging to CountryId. 
function createUI() {
    var cityName = document.createElement('input');
    cityName.setAttribute('placeholder', 'Enter City Name');
    cityName.setAttribute('value', "");
    cityName.setAttribute('ID', '1');
    var cityDesc = document.createElement('input');
    cityDesc.setAttribute('placeholder', 'Enter Description');
    cityDesc.setAttribute('value', "");
    cityDesc.setAttribute('ID', '2');
    var countryid = document.createElement('input');
    countryid.setAttribute('placeholder', 'Enter Country Id');
    countryid.setAttribute('value', "");
    countryid.setAttribute('ID', '3');
    var button = document.createElement('input');
    button.type = 'button';
    button.value = "Create City";
    button.setAttribute('onClick', 'setAndSend()');
    var div = document.getElementById("div");
    div === null || div === void 0 ? void 0 : div.append(cityName);
    div === null || div === void 0 ? void 0 : div.append(cityDesc);
    div === null || div === void 0 ? void 0 : div.append(countryid);
    div === null || div === void 0 ? void 0 : div.append(button);
}
var city = {
    "name": "dddd",
    "description": "Descr",
    "countryID": 14
};
var txtName;
var txtDesc;
var txtId;
function setAndSend() {
    txtName = document.getElementById("1");
    city.name = txtName.value;
    txtDesc = document.getElementById("2");
    city.description = txtDesc.value;
    txtId = document.getElementById("3");
    city.countryID = txtId.value;
    createCity();
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
