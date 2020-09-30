let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
let gcount = 0;
let leaderBoard = [];
console.log("Sending Request");

// getting the html of the home webpage of the website
request(`https://www.espncricinfo.com/scores/series/19322`, function(err, res, html){
    if(err=== null && res.statusCode === 200){

        console.log("Received data *");
        fs.writeFileSync("index2.html", html);
        parseHtml(html);
    }else if(res.statusCode === 404){
        console.log("Invalid URL");

    }else{
        console.log(err);
        console.log(res.statusCode);
    }
})

// parsing the html received of the home webpage
function parseHtml(html){
    let d = cheerio.load(html);
    // getting all the cards
    let cards= d(".cscore.cscore--final.cricket.cscore--watchNotes");

    // iterating all the cards
    for(let i =0 ; i < cards.length; i++){
        let matchType = d(cards[i]).find(".cscore_info-overview").html();
        // only ODI and T20 selected from cards using matchType
        let test = matchType.includes("ODI") || matchType.includes("T20");
        if(test === true){
            console.log(matchType);
        }
    }

    //console.log("...................................................................");
    //console.log("complete");

}

console.log("After");