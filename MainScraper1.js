//fixed objects and created global year make model variables
 
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
let IdCount = 0;
let Year;
let Make;
let LModel; 
let ModelConfig;
let currentSrchLocation; 
let currentMake;
let currentModel;
let spnYearMakeModel;
let YearMakeModel;
let YearMakeModelSplit;
let modelperlocCount=0;
var urlsList = new Array;
var gLat;
var gLng;
var countPerMake=0;
let q,p,s; // loop variables -- referred to globally
// Stats
var listingCount = 0;


//  KB per listing: 0.58KB - before getting rid of year property inside the listing object and shortening the url;
//  possibly using listings fb id as local _id
// # of Listing per 16MB: 26724(MAX/file.JSON)
const listingsPerJSON = 40000;
var VM_JSON_Obj;
var VM_JSON_Obj_copy;
var VM_JSON_Str_Copy = "";
var PARTS_Model_Obj;
var VM_JSON_Str = "";
var PARTS_JSON_Obj;
var ModelAndYear_Obj;
var make_JSON_Str="";
let lastTime, newTime;
let documentIndex = 0;
//
var FileCreationStage = false;
let models = ["series 1,series-1,1","series 2,series-2,2","series 3,series-3,3","series 4,series-4,4", "series 5,series-5,5","series 6,series-6,6","series 7,series-7,7","series 8,series-8,8","X1","X2","X3","X4","X5","X6","X7","Z4","i8","i3","i4","i7","iX","iX3"];
const country = "Germany";
const bmw = {
    name:"bmw",
    models:models,
    country: country
}
models=["amg gt","gla","glb","glc","gle","gls","a class,a-class","c class,c-class","e class,e-class","s class,s-class","cla","cls","sl","slk","clk","sprinter"];
const mercedes = {
    name:"mercedes",
    models: models,
    country: country
}
models=["a1","a3","a4","a5","a6","a7","a8","tt","r8","q2","q3","q4","q5","q6","q7","q8","s1","s3","s5","s6","s7","s8","rs","e tron suv,e-tron","e tron gt"];   //left out S2 and S4
const audi = {
    name:"audi",
    models: models,
    country: country
}
models=["blazer","blazer ev,blazer-ev","bolt","bolt euv,bolt-euv,bolt ev,bolt-ev","captiva","equinox","equinox-ev,equinox ev","groove","tracker","trailblazer","traverse","trax,seeker","suburban","tahoe","colorado","montana","s 10,s-10","silverado","silverado ev","camaro","corvette","cruze","malibu","monza","onix plus", "optra", "aveo","onix","spark","orlando","spin","express","n 300,n300","n400,n 400","volt","cobalt","avalanche","lumina"];   //left out S2 and S4
const chevrolet = {
    name:"chevrolet",
    models: models,
    country: "USA"
}
models=["fiesta","focus","escort","mondeo","taurus","gt","mustang","bronco","bronco sport,bronco-sport","ecosport","edge","equator","escape","everest","evos","expedition","explorer","territory","f 150,f-150","f 250,f-250","f 350,f-350","f 450,f-450","f 550,f-550","f 150 lightning","ranger","maverick","transit","courier","transit","s max,s-max","e 150,e-150","e 250,e-250","e 350,e-350"];   //left out semi's
const ford = {
    name:"ford",
    models: models,
    country: "USA"
}
models=["avalon","belta","camry","century","corolla","crown","etios","mirai","prius","yaris","4runner","aqua","c-hr","corolla cross,corola-cross","venza","highlander","land cruiser,land-cruiser","rav4","sequoia","sienna","tacoma","gr86","supra","transit","tundra"];   //left out semi's
const toyota = {
    name:"toyota",
    models: models,
    country: "USA"
}
models=["civic","fit","accord","odyssey","alphard","cr-v","passport","pilot","zr-v","ridgeline","civic type r,civic-type-r,civic type-r","nsx"];   //left out semi's
const honda = {
    name:"honda",
    models: models,
    country: "USA"
}
models=["es","is","ls","ct","rc","lc","nx","rx","rz","ux","gx","lx"];   
const lexus = {
    name:"lexus",
    models: models,
    country: "USA"
}
models=["integra","tlx","rdx","mdx","nsx","cl","tl","csx","ilx","rlx","tsx"]; 
const acura = {
    name:"acura",
    models: models,
    country: "USA"
}
models=["accent","elantra","ioniq","ioniq 6,ioniq-6","ioniq 5,ioniq-5","santafe","tucson","venue","santa cruz,santa-cruz","veloster","tsx"]; 
const hyundai = {
    name:"hyundai",
    models: models,
    country: "USA"
}
models=["attitude","challenger","charger","neon","durango","journey","nitro","caliber","dart","sprinter","caravan","ram 1500,ram-1500,ram1500","ram 2500,ram-2500,ram2500","ram 3500,ram-3500,ram3500","ram 4500,ram-4500,ram4500","ram 5500,ram-5500,ram5500","ram promaster city","ram promaster 2500","ram promaster 3500"]; 
const dodge = {
    name:"dodge",
    models: models,
    country: "USA"
}
models=["ct4","ct5","ct6","escalade","escalade esv","lyriq","xt4","xt5","xt6","cts","srx","xlr","cts-v,cts v","dts","sts","sls","ats","xts","elr","ats-l","ats-v,ats v","ct6-v"]; 
const cadillac = {
    name:"cadillac",
    models: models,
    country: "USA"
}
models=["forte","rio","optima","k5","stinger","soul","ev6","niro","seltos","sonet","sorento","sportage","telluride"]; 
const kia = {
    name:"kia",
    models: models,
    country: "USA"
}
models=["zephyr","corsair","nautilus","aviator","navigator","navigator l","mkc","mkt","mks","mkx","mkz","town car,twon-car","ls"]; 
const lincoln = {
    name:"lincoln",
    models: models,
    country: "USA"
}
models=["model x,model-x","model s,model-s","model 3,model-3,model3","model y,model-y","roadster"]; 
const tesla = {
    name:"tesla",
    models: models,
    country: "USA"
}
models=["vue","ion","s series,s-series","l series,l-series","relay","sky","outlook","aura","astra"]; 
const saturn = {
    name:"saturn",
    models: models,
    country: "USA"
}
models=["leaf","almera","altima","maxima","sentra","ariya","kicks","murano","pathfinder","rogue","gt-r","frontier","titan","nv200","350z","370z","xterra"]; 
const nissan = {
    name:"nissan",
    models: models,
    country: "USA"
}
models=["v60","s60","c40","xc60","s90","xc90","xc40","v90","s40","v50","v70"]; 
const volvo = {
    name:"vovlo",
    models: models,
    country: "USA"
}
models=["wagoneer","wrangler","cherokee","compass","commander","grand cherokee","grand commander","renegade","gladiator"]; 
const jeep = {
    name:"jeep",
    models: models,
    country: "USA"
}
models=["h2","h1","h2 sut","h3","h3t"]; 
const hummer = {
    name:"hummer",
    models: models,
    country: "USA"
}
models=["q50","q60","qx50","qx55","qx60","qx80","qx70","esq","q30","qx30","q70","fx35","fx45","fx50","fx37","ex35","ex37","g20","g37","g35","m35","m37","qx4"]; 
const infinity = {
    name:"infinity",
    models: models,
    country: "USA"
}
models=["air"]; 
const lucid = {
    name:"lucid",
    models: models,
    country: "USA"
}
// change the array of makes and models to limit the search to a smaller set
const MakeList = [mercedes, bmw, audi, chevrolet, ford, nissan, toyota, kia, honda, lexus, acura, jeep, infinity, saturn, volvo, hummer, tesla, lucid, lincoln, cadillac, dodge, hyundai];
//500m radius - for facebook's url acronyms specifically. most of cities resolve to an id in url, list of accessible with 250 radius supposed to cover the country. 
const m500CitiesList = ["boise","la","vegas","denver","dallas","103132003060108", "sioux-falls", "chicago","atlanta","orlando","nyc"];

class Car{
    
    constructor (URL, Make, Model, ModelConfig, Year, Price, Mileage, City, State, Coordinates, isDealership){
        // this.ID ="" + (Date.now() + Math.random()*Math.pow(10, 18));
        this.ID =IdCount;
        this.URL=URL;
        this.Make=Make;
        this.Model=Model;
        this.ModelConfig = ModelConfig;
        this.Year=Year;
        this.Price=Price;
        this.Mileage=Mileage;
        this.City=City;
        this.State = State;
        this.Coordinates = Coordinates;
        this.PriceStat=[];//to be computed 
        this.DateAdded = new Date().toJSON().slice(0,10);
        this.isDealership =  isDealership;
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
    get ModelConfig(){
        return this._ModelConfig;
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
    get State(){
        return this._State;
    }
    get City(){
        return this._City;
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
    set ModelConfig(ModelConfig){
        this._ModelConfig=ModelConfig;
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
    set City(City){
        this._City = City;
    }
    set State(State){
        this._State = State;
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
        "Price: "+this.Price+"\n"+"Mileage:"+this.Mileage+"\n"+"Location:"+this.City+", "+this.State+"\n"+"Coordinates:"+this.Coordinates+"\n"
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
                    // key: // - removed key
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
    listingCount++;
    if(listingCount==26000){
        //                  Stringify and write to last File
        fs.writeFile(`MongoDB_Export_JSON\\${currentMake}_${documentIndex}.json`,JSON.stringify(VM_JSON_Obj), function(error){ // Write to JSON
            if (error){ throw error; console.error(error);}
        });
        
        //                   Begin writing to new file
        documentIndex++;
        VM_JSON_Obj = JSON.parse(VM_JSON_Str_Copy);
        // VM_JSON_Obj_copy = VM_JSON_Obj;
        // VM_JSON_Str = JSON.stringify(VM_JSON_Obj);
        // VM_JSON_Str_Copy = VM_JSON_Str;
        // fs.writeFile(`MongoDB_Export_JSON\\${currentMake}_${documentIndex}.json`,"", function(error){ // Write to JSON
        //     if (error){ throw error; console.error(error);}
        // });
    }
        //Begin writing to new file
        // set ListingCount = 0 
    // }else{}//
    // while(listingCount<40001){};
    console.log("in the span processing method");
    let CurrentSpan;
    let CurrentSpanString;
    let countSPN,counteveryspn=0;
    let SpansLen = SPANS.length;
    let Price;
    let City;
    let State;
    let Mileage
    let isDealership;
    let URL=postUrl;
    let Coordinates;

    if(SpansLen==10){
        let spnLocation = await page.evaluate(el => el.innerText, SPANS[5]);
            let spnlocationArr = spnLocation.split(",");
            City = spnlocationArr[0];
            State = spnlocationArr[1].trim();
            // Coordinates = await geocodeAddress(spnLocation); -- trying to not lose a lot on api usage before application is made
            Coordinates = "0; 0"
        let spnPrice = await page.evaluate(el => el.innerText, SPANS[0]);
            let possiblePrice = spnPrice.substring(1);
            if(Number.isInteger(parseInt(possiblePrice))){
                Price = parseInt(possiblePrice);
            }else {Price = null}    
        let spnMiles = await page.evaluate(el => el.innerText, SPANS[8]);
            if(spnMiles.includes("Dealership")){
                isDealership = true;
                let splitMiSpn = spnMiles.split(" ");
                Mileage = splitMiSpn[0]+" "+splitMiSpn[1];
            }else{
                Mileage = spnMiles;
                isDealership = ""+false;
            }
            spnYearMakeModel = await page.evaluate(el => el.innerText, SPANS[2]);
            YearMakeModelSplit = spnYearMakeModel.split(" ");
            let possibleYear = YearMakeModelSplit[0];
                if(Number.isInteger(parseInt(possibleYear))){
                    Year = parseInt(possibleYear);
                }else {Year =null}
            Make = currentMake;
            LModel = currentModel.split(",")[0];
            ModelConfig = spnYearMakeModel.substring(YearMakeModelSplit[0].length + YearMakeModelSplit[1].length+2);
            // LModel = spnYearMakeModel.substring(Year.length+Make.length+2);
        }
        else if(SpansLen==12){
        let spnLocation = await page.evaluate(el => el.innerText, SPANS[7]);
            let spnlocationArr = spnLocation.split(",");
            City = spnlocationArr[0];
            State = spnlocationArr[1].trim();
            // Coordinates = await geocodeAddress(spnLocation); -- trying to not lose a lot on api usage before application is made
            Coordinates = "0; 0"
        let spnPrice = await page.evaluate(el => el.innerText, SPANS[1]);
            let possiblePrice = spnPrice.substring(1);
            if(Number.isInteger(parseInt(possiblePrice))){
                Price = parseInt(possiblePrice);
            }else {Price = null}    
            let foo="asdfe asd";
            foo.sub
        let spnMiles = await page.evaluate(el => el.innerText, SPANS[10]);
            if(spnMiles.includes("Dealership")){
                isDealership = true;
                let splitMiSpn = spnMiles.split(" ");
                Mileage = splitMiSpn[0]+" "+splitMiSpn[1];
            }else{
                Mileage = spnMiles;
                isDealership = ""+false;
            }
            spnYearMakeModel = await page.evaluate(el => el.innerText, SPANS[4]);
            YearMakeModelSplit = spnYearMakeModel.split(" ");
            let possibleYear = YearMakeModelSplit[0];
                if(Number.isInteger(parseInt(possibleYear))){
                    Year = parseInt(possibleYear);
                }else {Year ="N/A"}
            Make = currentMake;
            LModel = currentModel.split(",")[0];
            ModelConfig = spnYearMakeModel.substring(YearMakeModelSplit[0].length + YearMakeModelSplit[1].length+2);
            // Make = YearMakeModelSplit[1];
        //    LModel = spnYearMakeModel.substring(Year.length+Make.length+2);
        }
        else if(SpansLen==8){
        let spnLocation = await page.evaluate(el => el.innerText, SPANS[5]);
            let spnlocationArr = spnLocation.split(",");
            City = spnlocationArr[0];
            State = spnlocationArr[1].trim();
            // Coordinates = await geocodeAddress(spnLocation); -- trying to not lose a lot on api usage before application is made
            Coordinates = "0; 0"
        let spnPrice = await page.evaluate(el => el.innerText, SPANS[0]);
            let possiblePrice = spnPrice.substring(1);
            if(Number.isInteger(parseInt(possiblePrice))){
                Price = parseInt(possiblePrice);
            }else {Price = null} 
        Mileage = "N/A";
            isDealership = "" + false;
            spnYearMakeModel = await page.evaluate(el => el.innerText, SPANS[2]);
            YearMakeModelSplit = spnYearMakeModel.split(" ");
                let possibleYear = YearMakeModelSplit[0];
                if(Number.isInteger(parseInt(possibleYear))){
                    Year = parseInt(possibleYear);
                }else {Year ="N/A"}
            Make = currentMake;
            LModel = currentModel.split(",")[0];
            ModelConfig = spnYearMakeModel.substring(YearMakeModelSplit[0].length + YearMakeModelSplit[1].length+2);
            // Make = YearMakeModelSplit[1];
            // LModel = spnYearMakeModel.substring(Year.length+Make.length+2);
    }
    let minmodelPrice = 500;
    if(Price > minmodelPrice && !(ModelConfig.toUpperCase.includes("PARTS"))){
        IdCount++;
        car1 = new Car(URL, Make, LModel, Year, Price, Mileage, Location, Coordinates, isDealership);
        try{
            // console.log(JSON.stringify(VM_JSON_Obj[currentMake][p][MakeList[q].models[p]][parseInt(YearCopy)-1930]));
            // ModelAndYear_Obj = VM_JSON_Obj[currentMake][p][MakeList[q].models[p].split(",")[0]][parseInt(yearCopy)-1930][parseInt(yearCopy)];
            VM_JSON_Obj.push(car1);
            countPerMake++;

        }catch(error){
            console.error(error);
            console.log(postUrl);        
            console.log(VM_JSON_Obj[countPerMake-1]);
        }
    }else{ //send to Parts Folder
        console.log("listing contains Parts");
        car1 = new Car(URL, Make, LModel, Year, Price, Mileage, Location, Coordinates, isDealership);
        
        PARTS_Model_Obj = PARTS_JSON_Obj[currentMake][p][MakeList[q].models[p].split(",")[0]];
        PARTS_Model_Obj.push(car1);
    }
    // let year = 1930+90;
    // var MakeAndYear = lucids.lucid[0].air[90][year];
    // console.log(MakeAndYear);
    // MakeAndYear.push({year:2020000,used:"no"});
    // console.log(lucids.lucid[0].air);
    // console.log(lucids.lucid[0].air[90][1930+90]);
    // console.log(lucids.lucid[0].air[90][1930+90][0].used);
}

async function GetURLS(page){
    try{
        fs.appendFile(`listingData-${currentMake}.txt`,currentMake+"\n"+currentModel+"\n"+currentSrchLocation +'\n', function(error){
            if (error){ throw error; console.error(error);}
        });
    await page.evaluate(_ => {
        window.scrollBy(0,12*window.innerHeight);
      });
      await delay(3000);
    await page.evaluate(_ => {
        window.scrollBy(0,20*window.innerHeight);
      });
      await delay(3000);
    await page.evaluate(_ => {
        window.scrollBy(0,15*window.innerHeight);
      });
      await delay(3000);
      await page.evaluate(_ => {
        window.scrollBy(0,20*window.innerHeight);
        });
        
      await delay(3000);
      await page.evaluate(_ => {
          window.scrollBy(0,20*window.innerHeight);
        });
        await delay(3000);
      await page.evaluate(_ => {
          window.scrollBy(0,15*window.innerHeight);
        });
        await delay(3000);
        await page.evaluate(_ => {
          window.scrollBy(0,20*window.innerHeight);
          });
          await delay(3000);
      await page.evaluate(_ => {
        window.scrollBy(0,20*window.innerHeight);
        });
        
      await delay(3000);
      await page.evaluate(_ => {
          window.scrollBy(0,20*window.innerHeight);
        });
    const HREFS = await page.$$("a");

    const len = HREFS.length;
    // let spans;
    let HREF;
    let postUrl;
    let printSwitch = false;
    let PrevSPN;
    let countSPN=0;
    let counteveryspn = 0;
    let uniqSPANS = new Array;
    let gotPrice = false;
    let allcount=0;
    let sameAsSearchCount=0;
    for(let i=35;i<len;i++){
        HREF = HREFS[i];
        let postUrll;
        try{
        postUrll = await page.evaluate(ele => ele.getAttribute("href"), HREF);
        }catch(error){
            console.error(error);
            console.log("\nHREF ELE:\n"+HREF);
            console.log("\nURL var:\n"+postUrll);
        }
        postUrl = postUrll;
        if(postUrl.includes("/marketplace/groups/")){
            printSwitch = true}
        if(printSwitch === true){
            checkURL = postUrl.split('/');
            if(checkURL[1]==="marketplace" && checkURL[2]==="item"){
                allcount++;            
                urlsList.push(postUrl);
                const SPANS = await HREFS[i].$$("span");
                // fs.appendFile('filteredPageData.txt','\n'+'\n'+ postUrl+' -- '+listingCount +'\n', function(error){
                //     if (error){ throw error; console.error(error);}
                // });
                console.log(SPANS.length);
                if(SPANS.length==8){
                    spnYearMakeModel = await page.evaluate(el => el.innerText, SPANS[2]);
                    // YearMakeModel = JSON.stringify(spnYearMakeModel);
                    YearMakeModelSplit = spnYearMakeModel.split(" ");
                    Year = YearMakeModelSplit[0];
                    Make =YearMakeModelSplit[1];
                   try{LModel = spnYearMakeModel.substring(Year.length+Make.length+2);}catch(error){
                    console.log(postUrll);
                    console.error(error);
                }
                }
                if(SPANS.length==10){
                    spnYearMakeModel = await page.evaluate(el => el.innerText, SPANS[2]);
                    // YearMakeModel = JSON.stringify(spnYearMakeModel);
                    YearMakeModelSplit = spnYearMakeModel.split(" ");
                    Year = YearMakeModelSplit[0];
                    Make = YearMakeModelSplit[1];
                   try{LModel = spnYearMakeModel.substring(Year.length+Make.length+2);}catch(error){
                    console.log(postUrll);
                    console.error(error);
                }
//                 model.split("0");
// (2) ['Mercedes Bens AMG 56', 'SL']
// model.split("0")[1].toUpperCase().includes(("sl").toUpperCase());
// true

// model.split("SL");
// (2) ['Mercedes Bens AMG 560', '']
                }
                if(SPANS.length==12){
                    spnYearMakeModel = await page.evaluate(el => el.innerText, SPANS[4]);
                    // YearMakeModel = JSON.stringify(spnYearMakeModel);
                    YearMakeModelSplit = spnYearMakeModel.split(" ");
                    Year = YearMakeModelSplit[0];
                    Make =YearMakeModelSplit[1];
                   try{LModel = spnYearMakeModel.substring(Year.length+Make.length+2);}catch(error){
                    console.log(postUrll);
                    console.error(error);
                }   
                }
                console.log("whole span:"+spnYearMakeModel+"\n"+"extracted model:"+LModel+"\n"+"current model:"+currentModel);
                if(currentModel.split(",").length==1){
                    if(LModel.toUpperCase().includes(currentModel.toUpperCase())){
                        modelperlocCount++;sameAsSearchCount++;
                        await spanprocess(page, SPANS, postUrl);}
                }else if(currentModel.split(",").length==2){
                    if(LModel.toUpperCase().includes(currentModel.split(",")[0].toUpperCase()) || LModel.toUpperCase().includes(currentModel.split(",")[1].toUpperCase())){
                        modelperlocCount++;sameAsSearchCount++;
                        await spanprocess(page, SPANS, postUrl);}
                }else if(currentModel.split(",").length==3){
                    if(LModel.toUpperCase().includes(currentModel.split(",")[0].toUpperCase()) || LModel.toUpperCase().includes(currentModel.split(",")[1].toUpperCase()) || LModel.toUpperCase().includes(currentModel.split(",")[2].toUpperCase())){
                        modelperlocCount++;sameAsSearchCount++;
                        await spanprocess(page, SPANS, postUrl);}
                }else if(currentModel.split(",").length==4){
                    if(LModel.toUpperCase().includes(currentModel.split(",")[0].toUpperCase()) || LModel.toUpperCase().includes(currentModel.split(",")[1].toUpperCase()) || LModel.toUpperCase().includes(currentModel.split(",")[2].toUpperCase())||LModel.toUpperCase().includes(currentModel.split(",")[3].toUpperCase())){
                        modelperlocCount++;sameAsSearchCount++;
                        await spanprocess(page, SPANS, postUrl);}
                }
                else if(currentMake==="bmw"&& LModel.split('')[0]===currentModel.split(',')[2]){ //325 -> 3series // WILL APPEND DUPLICATE!!!
                    modelperlocCount++;sameAsSearchCount++;
                   await spanprocess(page, SPANS, postUrl);
                }
                else{console.log("the listing does not correspond current model. Url:"+postUrl);}
            }
        }
        }
        console.log("Done with "+currentModel+", at "+currentSrchLocation+"\n"+"-----------------["+sameAsSearchCount+"  /"+allcount+"  ]--------------");
    }catch(error){
        console.error(error);
    }
}


(async() =>{
    try{
    const cookiesString = fs.readFileSync('./fb-session-cookies.json', 'utf8');
    const cookies = JSON.parse(cookiesString);
    const browser = await Puppeteer.launch({headless:false, slowMo:10, defaultViewport:null,args: ['--start-maximized']});
    const page = await browser.newPage();   
    const FBurl = "https://www.facebook.com/marketplace/seattle/search?query=bmw%205%20series" //look for bmw 5 series 
    await page.setDefaultNavigationTimeout(1000000);
    console.info("setting cookies");
    await page.setCookie.apply(page, cookies);
    await page.goto('https://www.facebook.com', {waitUntil:'load'});
    await page.waitForSelector('[role="navigation"]');

    let searchURL;
    for(q=3;q<MakeList.length;q++){
        currentMake = MakeList[q].name;
        VM_JSON_Obj = JSON.parse(fs.readFileSync(`C:\\Users\\Dmytri\\Scraper - Copy\\emptTemplete.json`));
        VM_JSON_Obj_copy = VM_JSON_Obj;
        // VM_JSON_Str = JSON.stringify(VM_JSON_Obj);
        // VM_JSON_Str_Copy = VM_JSON_Str;
        // VM_JSON_Obj = JSON.parse(fs.readFileSync(`C:\\Users\\Dmytri\\Scraper\\makesJSON\\vm_${currentMake}.json`));
        // VM_JSON_Obj_copy = VM_JSON_Obj;
        PARTS_JSON_Obj = JSON.parse(fs.readFileSync(`C:\\Users\\Dmytri\\Scraper\\Makes_JSON\\vm_${currentMake}.json`));
        PARTS_JSON_Obj_copy = PARTS_JSON_Obj;
        // fs.writeFile(`MongoDB_Export_JSON\\${currentMake}_${documentIndex}.json`,"", function(error){ // Write to JSON
        //     if (error){ throw error; console.error(error);}
        // });
        for(p=0;p<MakeList[q].models.length;p++){

            countPerMake = 0;
            
            for(s=0;s<m500CitiesList.length;s++){
                let mainModelName = MakeList[q].models[p].split(",")[0];
                let modelArr = mainModelName.split(" ");
                if(modelArr.length==1){
                    searchURL = "https://www.facebook.com/marketplace/"+m500CitiesList[s]+"/search?query="+MakeList[q].name+"%20"+MakeList[q].models[p]; 
                }if(modelArr.length==2){
                    searchURL = "https://www.facebook.com/marketplace/"+m500CitiesList[s]+"/search?query="+MakeList[q].name+"%20"+modelArr[0]+"%20"+modelArr[1];
                }if(modelArr.length==3){
                    searchURL = "https://www.facebook.com/marketplace/"+m500CitiesList[s]+"/search?query="+MakeList[q].name+"%20"+modelArr[0]+"%20"+modelArr[1]+"%20"+modelArr[2];
                }
                currentSrchLocation = m500CitiesList[s];
                currentModel = MakeList[q].models[p];
                modelperlocCount = 0;
                await page.goto(searchURL,{waitUntil:'load'});
                await GetURLS(page);
                console.log("finished with the Model: "+currentModel);
                console.log(p+1+"/"+MakeList[q].models.length+"completed")
            }console.log("finished with 500m region: "+currentSrchLocation);
            console.log(s+1+"/"+m500CitiesList.length+"completed");
        }
        // fs.appendFile(`listingData-${currentMake}.txt`,currentSrchLocation+":"+countPerMake, function(error){
        //     if (error){ throw error; console.error(error);}
        // });
        fs.writeFile(`MongoDB_Export_JSON\\${currentMake}_${documentIndex}.json`,JSON.stringify(VM_JSON_Obj), function(error){ // Write to JSON
            if (error){ throw error; console.error(error);}
        });
        fs.writeFile(`PARTS_EXPORT_FB\\${currentMake}_${documentIndex}.json`,JSON.stringify(PARTS_JSON_Obj), function(error){ // Write to JSON
            if (error){ throw error; console.error(error);}
        });
        // console.log(JSON.stringify(VM_JSON_Obj));
        console.log("finished with a make"+currentMake);
        console.log(q+1+"/"+MakeList.length+"completed");
        documentIndex = 0;
        
        //Append (or write) stringified json to .json file
    }
    }catch(error){
        console.error(error);
    }
})();
    