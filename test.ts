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
    // createCity();
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
         var button = document.createElement('input');
         button.type = 'button';
         button.setAttribute('ID', 'btn');
         button.value = city.name;
         var div = document.getElementById("div");
         div?.append(button);
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
         p.innerHTML = "Country: " + country.country.countryName + " | City: " +country.name;
         var div = document.getElementById("div");
         div?.append(p);
    })
}
//#endregion
//#region Assignment 3
// 3 - Create City belonging to CountryId. 

let city = {
    "name": "dddd",
    "description": "Descr",
    "countryID": 14
  }

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
    button.setAttribute('onClick','createCity()');
    
    var div = document.getElementById("div");
    div?.append(cityName);
    div?.append(cityDesc);
    div?.append(countryid);
    div?.append(button);
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
