let request = require("request")
let fs = require("fs");
let cheerio = require("cheerio");

console.log("****sending Request****");

console.log("Before");
// https://www.espncricinfo.com/series/19322/commentary/1187683
request(`https://www.espncricinfo.com/series/19322/scorecard/1187683`, function(err, res, html){
    if(err=== null && res.statusCode === 200){
        console.log("Received data");
        fs.writeFileSync("scorecard.html", html);
        parseHtml(html);
    }else if(res.statusCode === 404){
        console.log("Invalid URL");

    }else{
        console.log(err);
        console.log(res.statusCode);
    }
})

function parseHtml(html){
    console.log("****Parsing HTML****");
    let d = cheerio.load(html);
    let bowlers = d(".scorecard-section.bowling table tbody tr");
    
    let maxWickets = 0;
    let maxWicketsTaker = "";

    for(let i =0;i<bowlers.length;i++){
        let bowlerName = d(d(bowlers[i]).find("td")[0]).text();
        let wickets = d(d(bowlers[i]).find("td")[5]).text();

        if(wickets>maxWickets)
        {
            maxWickets = wickets;
            maxWicketsTaker = bowlerName;
        }
    }
    console.log(maxWickets + " " + maxWicketsTaker);

}

// console.log("After")