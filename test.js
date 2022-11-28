// let bmw = require('C:\Users\Dmytri\Scraper\Makes_JSON\ford.json');
const fs = require('fs');
var bmws = JSON.parse(fs.readFileSync('C:\\Users\\Dmytri\\Scraper - Copy\\emptTemplete.json'));
let make = "bmw";
bmws.push({year:2020000,used:"no"});
bmws.push({year:2020000,used:"yea"});
console.log(bmws[1]);





// let year = 1930+90;
// var MakeAndYear = lucids.lucid[0].air[90][year];
// console.log(MakeAndYear);
// MakeAndYear.push({year:2020000,used:"no"});
// console.log(lucids.lucid[0].air);
// console.log(lucids.lucid[0].air[90][1930+90]);
// console.log(lucids.lucid[0].air[90][1930+90][0].used);


// bmw.ford[0].push(carStr);
// broncocar.push({year:2012,nice:"f yes"});
// broncocar= {year:2015,nice:"yes"};
// broncostr = JSON.stringify(broncocar);
// console.log(bmw.ford[0].bronco[0].year);
// console.log(broncostr);
// console.log(bmw);