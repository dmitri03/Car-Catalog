// require("modules\\ManufactTables.js");
const fs = require('fs');
const { array } = require("prop-types");
const BasePath = 'C:\\Users\\Dmytri\\Scraper\\Makes_JSON\\';


let models = ["series 1,series-1,1","series 2,series-2,2","series 3,series-3,3","series 4,series-4,4", "series 5,series-5,5","series 6,series-6,6","series 7,series-7,7","series 8,series-8,8","X1","X2","X3","X4","X5","X6","X7","Z4","i8","i3","i4","i7","iX","iX3"];
const country = "Germany";
const bmw = {
    name:"bmw",
    models:models,
    country: country
}
models=["amg gt","gla","glb","glc","gle","gls","a class,a-class","c class,c-class","e class,e-class","s class,s-class","cla","cls","sl","slk","clk"];
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
models=["blazer","blazer ev,blazer-ev","bolt","bolt euv,bolt-euv,bolt ev,bolt-ev","captiva","equinox","equinox-ev,equinox ev","groove","tracker","trailblazer","traverse","trax,seeker","suburban","tahoe","colorado","montana","s 10 max,s-10-max","silverado","silverado ev","camaro","corvette","cruze","malibu","monza","onix plus", "optra", "aveo","menio","onix","spark","orlando","spin","express","n 300,n300","n400,n 400","volt","cobalt","avalanche","lumina"];   //left out S2 and S4
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
    name:"volvo",
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

ArrayOfYearArrays = `[
{"1930":[ ]},
{"1931":[ ]},
{"1932":[ ]},
{"1933":[ ]},
{"1934":[ ]},
{"1935":[ ]},
{"1936":[ ]},
{"1937":[ ]},
{"1938":[ ]},
{"1939":[ ]},
{"1940":[ ]},
{"1941":[ ]},
{"1942":[ ]},
{"1943":[ ]},
{"1944":[ ]},
{"1945":[ ]},
{"1946":[ ]},
{"1947":[ ]},
{"1948":[ ]},
{"1949":[ ]},
{"1950":[ ]},
{"1951":[ ]},
{"1952":[ ]},
{"1953":[ ]},
{"1954":[ ]},
{"1955":[ ]},
{"1956":[ ]},
{"1957":[ ]},
{"1958":[ ]},
{"1959":[ ]},
{"1960":[ ]},
{"1961":[ ]},
{"1962":[ ]},
{"1963":[ ]},
{"1964":[ ]},
{"1965":[ ]},
{"1966":[ ]},
{"1967":[ ]},
{"1968":[ ]},
{"1969":[ ]},
{"1970":[ ]},
{"1971":[ ]},
{"1972":[ ]},
{"1973":[ ]},
{"1974":[ ]},
{"1975":[ ]},
{"1976":[ ]},
{"1977":[ ]},
{"1978":[ ]},
{"1979":[ ]},
{"1980":[ ]},
{"1981":[ ]},
{"1982":[ ]},
{"1983":[ ]},
{"1984":[ ]},
{"1985":[ ]},
{"1986":[ ]},
{"1987":[ ]},
{"1988":[ ]},
{"1989":[ ]},
{"1990":[ ]},
{"1991":[ ]},
{"1992":[ ]},
{"1993":[ ]},
{"1994":[ ]},
{"1995":[ ]},
{"1996":[ ]},
{"1997":[ ]},
{"1998":[ ]},
{"1999":[ ]},
{"2000":[ ]},
{"2001":[ ]},
{"2002":[ ]},
{"2003":[ ]},
{"2004":[ ]},
{"2005":[ ]},
{"2006":[ ]},
{"2007":[ ]},
{"2008":[ ]},
{"2009":[ ]},
{"2010":[ ]},
{"2011":[ ]},
{"2012":[ ]},
{"2013":[ ]},
{"2014":[ ]},
{"2015":[ ]},
{"2016":[ ]},
{"2017":[ ]},
{"2018":[ ]},
{"2019":[ ]},
{"2020":[ ]},
{"2021":[ ]},
{"2022":[ ]},
{"2023":[ ]},
{"2024":[ ]}]`;
const MakeList = [mercedes, bmw, audi, chevrolet, ford, nissan, toyota, kia, honda, lexus, acura, jeep, infinity, saturn, volvo, hummer, tesla, lucid, lincoln, cadillac, dodge, hyundai];
let makeJsonObj;
let makeName;
let ModelName;
let makeStrObject;
let lastIndex = 0;
let startIndex = 0;
for(let i=0;i<MakeList.length;i++){
    makeName = MakeList[i].name;
    makeStrObject = ""+fs.readFileSync(`C:\\Users\\Dmytri\\Scraper\\Makes_JSON\\${makeName}.json`); 
    // makeJsonObj = JSON.parse(fs.readFileSync(`C:\\Users\\Dmytri\\Scraper\\Makes_JSON\\${makeName}.json`));
    // makeStrObject = JSON.stringify(makeJsonObj);
    for(let j=0;j<MakeList[i].models.length;j++){
        // if(j==0){
            // startIndex = makeStrObject.indexOf("[]");
            makeStrObject = makeStrObject.replace('[]',ArrayOfYearArrays);
        // }else{

        // }
    }
    console.log(makeStrObject);
    fs.writeFile(`makesJSON\\vm_${makeName}.json`,makeStrObject, function(error){
        if (error){ throw error; console.error(error);}
    });
    console.log("wrote to one file");
}
