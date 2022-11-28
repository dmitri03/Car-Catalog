require('react');
require('react-dom');
require('dotenv').config();
var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;
const fs = require('fs');
const { url } = require('inspector');
const Puppeteer = require('puppeteer');
const axios = require('axios');
const { string } = require('prop-types');
// Car = require('./modules/Car.js');
var urlsList = new Array;
var gLat;
var gLng;

const bmw = {
    models:["1 series","2 series","3 series","4 series","5 series","6 series","7 series","8 series","X1","X2","X3","X4","X5","X6","X7","Z4","i8","i3","i4","i7","iX","iX3"],
    country: "Germany"
}
const mercedes = {
    models:["amg gt","gla","glb","glc","gle","gls","a class","c class","e class","s class","cla","cls","sl","slk","clk"],
    country: "Germany"
}
const audi = {
    models:["a1","a3","a4","a5","a6","a7","a8","tt","r8","q2","q3","q4","q5","q6","q7","q8","s1","s3","s5","s6","s7","s8","rs","e tron suv","e tron gt"],   //left out S2 and S4
    country: "Germany"
}
MakeList = [bmw, mercedes, audi];
//250m radius - for facebook's url acronyms specifically. most of cities resolve to an id in url, list of accessible with 250 radius supposed to cover the country. 
const m250CitiesList = ["boston","saltlakecity","denver","seattle","chicago","la","pittsburgh","nashville","orlando","Atlanta"];
//500m radius - for facebook's url acronyms specifically. most of cities resolve to an id in url, list of accessible with 250 radius supposed to cover the country. 
const m500CitiesList = ["nyc","chicago","atlanta","orlando","sioux-falls","dallas","la", "boise","vegas","denver","103132003060108"];

class Car{
    
    constructor (URL, Make, Model, Year, Price, Mileage, Location, Coordinates, isDealership){
        this.ID = Date.now() + Math.random()*Math.pow(10, 18);
        this.URL=URL;
        this.Make=Make;
        this.Model=Model;
        this.Year=Year;
        this.Price=Price;
        this.Mileage=Mileage;
        this.Location=Location;
        this.Coordinates = Coordinates;
        this.PriceStat=[0,0];//to be computed 
        this.DateAdded = new Date().toJSON().slice(0,10);
        this.isDealership =  isDealership;
        // this.Coords = this.geocodeAddress(Location);
        // this.Coords = this.geocodeAddress(Location);
    }

   
//----------------------------Getters-------------------------------//
    get ID(){
        return this._ID;
    }
    get URL(){
        return this._URL;
    }
    get Make(){
        return this._Make;
    }
    get Model(){
        return this._Model;
    }
    get Year(){
        return this._Year;
    }
    get Price(){
        return this._Price;
    }
    get Mileage(){
        return this._Mileage;
    }
    get Location(){
        return this._Location;
    }
    get Coordinates(){
        return this._Coordinates;
    }
    get PriceStat(){
        return this._PriceStat;
    }
    get DateAdded(){
        return this._DateAdded;
    }
    get isDealership(){
        return this._isDealership;
    }
    //--------------------------Setters-----------------------------//

    
    set ID(id){
        this._ID=id;
    }
    set URL(URL){
        this._URL=URL;
    }
    set Make(Make){
        this._Make=Make;
    }
    set Model(Model){
        this._Model=Model;
    }
    set Year(Year){
        this._Year=Year;
    }
    set Price(Price){
        this._Price=Price;
    }
    set Mileage(Mileage){
        this._Mileage=Mileage;
    }
    set Location(Location){
        this._Location = Location;
    }
    set Coordinates(Coords){
        this._Coordinates = Coords;
    }
    set PriceStat(PriceStat){
        this._PriceStat=PriceStat;
    }
    set DateAdded(DateAdded){
        this._DateAdded = DateAdded;
    }
    set isDealership(YorN){
        this._isDealership = YorN;
    }
    toString(){
    let rtrnString = "_id: "+this.ID+"\n"+"Make:"+this.Make+"\n"+"Model: "+this.Model+"\n"+"Year:"+this.Year+"\n"+
        "Price: "+this.Price+"\n"+"Mileage:"+this.Mileage+"\n"+"Location:"+this.Location+"\n"+"Coordinates:"+this.Coordinates+"\n"
        +"Date-Added:"+this.DateAdded+"\n"+"Car URL:"+this.URL+"\n"+"Dealership: "+this.isDealership;
    return rtrnString;
    }
}

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}
async function ParseToJSON(aCar){
       
}
async function UniqSPNSfunction(page,spans){
    spansStr = [];
    spnStr = "";
    for(spn of spans){
        CurrentSpan = await page.evaluate(el => el.innerText,spn);
        spnStr = JSON.stringify(CurrentSpan);
        if(!(spansStr.includes(spnStr))){
        spansStr.push(spnStr);}
    }
    return spansStr;
}
async function geocodeAddress(location) {
        let coords;
        // let coord=[lat, lng];
        try{    
            if (!location || location.length < 7) {
            console.log("The address string is too short. Enter at least three symbols");
            return;
            }
    
            axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
                params:{
                    address: location,
                    key:'AIzaSyAAWmyVzrrbWzyhP8V34o9NaGG6Qnb1Y8k'
                }
            }).then(function(response){
                gLat = response.data.results[0].geometry.location.lat;
                gLng = response.data.results[0].geometry.location.lng;
            });
            coords = ""+gLat+" "+gLng;
            return coords;
        }catch(err){
            console.info(err);
        }  
}
async function spanprocess(page, SPANS, postUrl){
    let PrevSPN;
    let CurrentSpan;
    let CurrentSpanString;
    let countSPN=0;
    let listingCount=0;
    let counteveryspn=0;
    let SpansLen = SPANS.length;
    let Make;
    let Model;
    let YearMakeModel;
    let Year;
    let Price;
    let Location;
    let Mileage
    let isDealership;
    let URL=postUrl;
    let Coordinates;

    if(SpansLen==10){
        let spnLocation = await page.evaluate(el => el.innerText, SPANS[5]);
            Location = JSON.stringify(spnLocation);
            // Coordinates = await geocodeAddress(spnLocation); -- trying to not lose a lot on api usage before application is made
            Coordinates = "0; 0"
        let spnPrice = await page.evaluate(el => el.innerText, SPANS[0]);
            Price = JSON.stringify(spnPrice);
        let spnMiles = await page.evaluate(el => el.innerText, SPANS[8]);
        let spnMilesStr = JSON.stringify(spnMiles);
            if(spnMilesStr.includes("Dealership")){
                isDealership = true;
                let splitMiSpn = spnMiles.split(" ");
                Mileage = splitMiSpn[0]+" "+splitMiSpn[1];
            }else{
                Mileage = JSON.stringify(spnMiles);
                isDealership = false;
            }
        let spnYearMakeModel = await page.evaluate(el => el.innerText, SPANS[2]);
            YearMakeModel = JSON.stringify(spnYearMakeModel);
            YearMakeModelSplit = YearMakeModel.split(" ");
            Year = YearMakeModelSplit[0]+'"';
            Make = JSON.stringify(YearMakeModelSplit[1]);
            Model = '"'+YearMakeModel.substring(Year.length+Make.length-1);
    }else if(SpansLen==12){
        let spnLocation = await page.evaluate(el => el.innerText, SPANS[7]);
            Location = JSON.stringify(spnLocation);
            // Coordinates = await geocodeAddress(spnLocation); -- trying to not lose a lot on api usage before application is made
            Coordinates = "0; 0"
        let spnPrice = await page.evaluate(el => el.innerText, SPANS[1]);
            Price = JSON.stringify(spnPrice);
        let spnMiles = await page.evaluate(el => el.innerText, SPANS[10]);
        let spnMilesStr = JSON.stringify(spnMiles);
            if(spnMilesStr.includes("Dealership")){
                isDealership = true;
                let splitMiSpn = spnMiles.split(" ");
                Mileage = splitMiSpn[0]+" "+splitMiSpn[1];
            }else{
                Mileage = JSON.stringify(spnMiles);
                isDealership = false;
            }
        let spnYearMakeModel = await page.evaluate(el => el.innerText, SPANS[4]);
            YearMakeModel = JSON.stringify(spnYearMakeModel);
            YearMakeModelSplit = YearMakeModel.split(" ");
            Year = YearMakeModelSplit[0]+'"';
            Make =JSON.stringify(YearMakeModelSplit[1]);
            Model ='"'+YearMakeModel.substring(Year.length+Make.length-1);
    }else if(SpansLen==8){
        let spnLocation = await page.evaluate(el => el.innerText, SPANS[5]);
            Location = JSON.stringify(spnLocation);
            // Coordinates = await geocodeAddress(spnLocation); -- trying to not lose a lot on api usage before application is made
            Coordinates = "0; 0"
        let spnPrice = await page.evaluate(el => el.innerText, SPANS[0]);
            Price = JSON.stringify(spnPrice);
            Mileage = "N/A";
            isDealership = false;
        let spnYearMakeModel = await page.evaluate(el => el.innerText, SPANS[2]);
            YearMakeModel = JSON.stringify(spnYearMakeModel);
            YearMakeModelSplit = YearMakeModel.split(" ");
            Year = YearMakeModelSplit[0]+'"';
            Make =JSON.stringify(YearMakeModelSplit[1]);
            Model = '"'+YearMakeModel.substring(Year.length+Make.length-1);
    }
    car1 = new Car(URL, Make, Model, Year, Price, Mileage, Location, Coordinates, isDealership);
    console.log(car1.toString());
    fs.appendFile('filteredPageData.txt','\n'+car1.toString()+'\n', function(error){
        if (error){ throw error; console.error(error);}
    });



    // for(SPN of SPANS){
    //     CurrentSpan = await page.evaluate(el => el.innerText, SPN);
    //     CurrentSpanString = JSON.stringify(CurrentSpan);
    //     if(CurrentSpan !== PrevSPN){    
    //         if(countSPN==0){Price = CurrentSpanString;gotPrice=true;}
            

    //         fs.appendFile('filteredPageData0.txt','\n'+ CurrentSpanString+' -- '+listingCount+'; span-count:'+counteveryspn+'\n', function(error){
    //             if (error){ throw error; console.error(error);}
    //         });
    //         countSPN++; 
    //     }
    //     PrevSPN = CurrentSpan;
    //     counteveryspn++;
    // }
}
async function GetURLS(page){
    try{
    const HREFS = await page.$$("a");

    const len = HREFS.length;
    // let spans;
    let HREF;
    let postUrl;
    let printSwitch = false;
    let listingCount = 0;
    let PrevSPN;
    let countSPN=0;
    let counteveryspn = 0;
    let uniqSPANS = new Array;
    let gotPrice = false;
    for(let i=35;i<len;i++){
        HREF = HREFS[i];
        postUrll = await page.evaluate(el => el.getAttribute("href"), HREF);
        postUrl = JSON.stringify(postUrll);
        if(postUrl.includes("/marketplace/groups/")){
            printSwitch = true}
        if(printSwitch === true){
            checkURL = postUrl.split('/');
            if(checkURL[1]==="marketplace" && checkURL[2]==="item"){
                listingCount++;            
                urlsList.push(postUrl);
                const SPANS = await HREFS[i].$$("span");
                fs.appendFile('filteredPageData.txt','\n'+'\n'+ postUrl+' -- '+listingCount +'\n', function(error){
                    if (error){ throw error; console.error(error);}
                });
                console.log(SPANS.length);
                spanprocess(page, SPANS, postUrl);
            }
        }
        }
        console.log("Url-list sise: "+urlsList.length);
        console.log('finished');
    }catch(error){
        console.error(error);
    }
}

(async() =>{
    try{
    const cookiesString = fs.readFileSync('./fb-session-cookies.json', 'utf8');
    const cookies = JSON.parse(cookiesString);

    const browser = await Puppeteer.launch({headless:false, slowMo:14, defaultViewport:null,args: ['--start-maximized']});
    const page = await browser.newPage();   

    // console.log(cookiesString); //checking old string
    await page.setDefaultNavigationTimeout(1000000);
    // await page.setViewport({width: 1366, height: 768});
    // await page.waitFor(300);  //setting cookies
    console.info("setting cookies");
    await page.setCookie.apply(page, cookies);

    await page.goto('https://www.facebook.com', {waitUntil:'load'});
    

    await page.waitForSelector('[role="navigation"]');
    await page.goto('https://www.facebook.com/marketplace/seattle', {waitUntil:'load'});
    await page.waitForSelector('[role="navigation"]');
    // await page.screenshot({ path: 'captureSeattle.png' });
    
    await page.goto('https://www.facebook.com/marketplace/seattle/search?query=bmw%205%20series%202018', {waitUntil:'load'});
    await page.waitForSelector('[role="navigation"]')
    await page.screenshot({ path: 'captureChicago.png' });    
    // await page.waitForSelector('[data-thumb="1"]');
    
    await page.evaluate(_ => {
        window.scrollBy(0,10*window.innerHeight);
      });
      await delay(3000);
    await page.evaluate(_ => {
        window.scrollBy(0,10*window.innerHeight);
      });
      
      await delay(3000);
      await page.evaluate(_ => {
        window.scrollBy(0,15*window.innerHeight);
        });
    //******************** */
    // const spns = await page.$$('span');
    // let currentSpanString = "";
    fs.writeFile('filteredPageData.txt',"", function(error){
        if (error){ throw error; console.error(error);}
    });
    
    await GetURLS(page);

    }catch(error){
        console.error(error);
    }
})();
