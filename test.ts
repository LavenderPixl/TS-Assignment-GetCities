//#region Interfaces.
interface City {
    cityId: number;
    name: string;
    description: string;
    countryID: number;
    numberOfPointsOfInterest: number;
    country: country;
    cityLanguages: Array<cityLanguages>;
    pointsOfInterest: Array<pointsOfInterest>;
}

interface country {
    countryId: number;
    countryName: string;
}

interface pointsOfInterest {
    pointsOfInterestId: number;
    cityId: number;
    name: string;
    description: string;
}

interface cityLanguages {
    languageId: number;
    languageName: string;
}
//#endregion 

function clearScreen() {
    var div = document.getElementById('div');
    div?.replaceChildren();
}

function part1() {
    clearScreen();
    getCities()
    .then (cities => {
        displayCities(cities)
    });
}

function part2() {
    clearScreen();
    getCityWithRelations()
    .then (cit => {
    displayCityWCountry(cit)
    });
}

function part3() {
    clearScreen();
    createUI();
}

let url = "https://cityinfo.buchwaldshave34.dk/api";
let userName = "UserName=UserAnna";

//#region Assignment 1
// 1 - Display Cities uden relationer.

function getCities() : Promise<Array<City>> {
    return fetch(url + "/City?includeRelations=false&"+userName)
    .then (response => response.json())
    .then ((response) => {
        return response as Array<City>
    })
}

function displayCities (cities: Array<City>) {
    cities.forEach(city => {
         var tt = document.createElement('p');
         tt.innerHTML = city.name;
         var div = document.getElementById("div");
         div?.append(tt);
    }) 
}
//#endregion
//#region  Assignment 2
// 2 - Display Cities with relations.

function getCityWithRelations() : Promise<Array<City>> {
    return fetch(url + "/City?includeRelations=true&"+userName)
    .then (response => response.json())
    .then ((response) => {
        return response as Array<City>
    })
}

function displayCityWCountry(cityCountry: Array<City>) {
    cityCountry.forEach(country => { 
         var p = document.createElement('p');
         p.setAttribute('ID', 'btn');
         p.innerHTML = "City: " +country.name+ " | Country: " + country.country.countryName;
         var div = document.getElementById("div");
         div?.append(p);
    })
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
    button.setAttribute('onClick','setAndSend()');
    
    var div = document.getElementById("div");
    div?.append(cityName);
    div?.append(cityDesc);
    div?.append(countryid);
    div?.append(button);
}

let city = {
    "name": "dddd",
    "description": "Descr",
    "countryID": 14
  }
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
    createCity()
}

function createCity() {
    fetch(url + "/City?" + userName, {
        method: 'POST', 
        body: JSON.stringify(city),
        headers: { 'Content-Type': 'application/json'}
    })
    .then(result => result.json())
    .then(jsonformat => console.log(jsonformat));
}
//#endregion
