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
        fs.writeFileSync("index.html", html);
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
            console.log(matchType)
            let anchor = d(cards[i]).find(".cscore_buttonGroup ul li a").attr("href");
           // console.log(`https://www.espncricinfo.com${anchor}`);
           let matchlink = `https://www.espncricinfo.com${anchor}`
           goToMatchPage(matchlink);
          // count++;
        
        }
    }

    //console.log("...................................................................");
    //console.log("complete");

}


function goToMatchPage(matchlink){
    gcount++;
    // console.log("request for"+ gcount);
    request(matchlink, function(err, res, html){
    if(err == null && res.statusCode == 200){
        //console.log(`File ${count} saved to disk`)
        handleMatch(html);
        gcount--;
        // console.log(gcount);
        if(gcount == 0){
        console.table(leaderBoard);
        }
    }else if( res.statusCode == 404){
        console.log("Invalid URL");

    }else{
        console.log(err);
        console.log(res.statusCode);
    }
    })
    }

    function handleMatch(html){
        const d = cheerio.load(html);
        //batsman, runs , format, team
        let format = d(".cscore.cscore--final.cricket .cscore_info-overview").html();
        // .html() se only first occurence
        format = format.includes("ODI") ? "ODI" : "T20";
        let teams = d(".sub-module.scorecard h2");
        let innings = d(".sub-module.scorecard");
        // console.log(format);
        for(let i = 0; i < innings.length; i++){
            let batsManRows = d(innings[i]).find(".scorecard-section.batsmen .flex-row .wrap.batsmen");
            let team = d(teams[i]).text();
            for(let br = 0; br < batsManRows.length; br++){
                let batsMan = d(batsManRows[br]);
                let batsManName = batsMan.find(".cell.batsmen").text();
                let batsManRuns = batsMan.find(".cell.runs").html();
                console.log(batsManName+"  "+batsManRuns);
                // call for each batsman
                handlePlayer(format, team, batsManName, batsManRuns);
            }


        }
    }

function handlePlayer(format, team, batsManName, batsManRuns){
    batsManRuns = Number(batsManRuns);

    // *****************
    for(let i = 0; i < leaderBoard.length; i++){
        let pObj = leaderBoard[i];
        if(pObj.name == batsManName && pObj.team==team && pObj.format === format){
            pObj.runs += batsManRuns;
            return;
        }
    }

    let obj = {
        runs : batsManRuns,
        format: format,
        team : team,
        name : batsManName

    }

    leaderBoard.push(obj);
}