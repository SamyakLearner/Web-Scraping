// var el = document.createElement( 'html' );
// el.innerHTML = "<html><head><title>titleTest</title></head><body><a href='test0'>test01</a><a href='test1'>test02</a><a href='test2'>test03</a></body></html>";

// el.getElementsByTagName( 'a' ); // Live NodeList of your anchor elements
const fs = require("fs");
const request = require('request');
const cheerio = require('cheerio');

request("https://www.espncricinfo.com/series/19322/scorecard/1187679",function(err,res,html){
// console.log(res);    


function parsehtml(html)
{
    console.log("parsing html");
    let loadhtml = cheerio.load(html);

    //node filename 19322
let cardshtml = co(".cscore.cscore--final.cricker.cscore--watchnotes");
for(let i = 0;i<cardshtml.length;i++)
{
    co(cardshtml[i])
    .find("cscore_info-overview")
    .html();
    let ans = format.include("T20I") || format.includes("ODI");
    if(ans){
        let url 
        console.log(co(format).find(""))
    }
}

    //

    let tablehtml = loadhtml(".scorecard-section.bowling").html();
    fs.writeFileSync("table.html",tablehtml);
    console.log("file written to disk");

    let tablearr = loadhtml(".scorecard-section.bowling table tbody tr");
    let maxwickettaker = "";
    let maxwickets = 0;
    for(let i = 0;i< tablearr.length;i++)
    {
        let tdarr = loadhtml(tablearr[i]).find("td");
        let wicket = loadhtml(tdarr[5]).html();
        let bowlername = loadhtml(tablearr[i]).find("td a").html();
        if(wicket>maxwickets)
        {
            maxwickettaker = bowlername;
            maxwickets = wicket;
        }
    }
    console.log(maxwickettaker + " "+ maxwickets);
}