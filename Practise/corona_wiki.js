let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

console.log("************sending request*****************");

request(`https://www.worldometers.info/coronavirus/`,function(err,res,html){
    if(err == null && res.statusCode == 200)
    {
        console.log("********received data *********");
        fs.writeFileSync("corona_data.html", html);
        parseHtml(html);
    }else if(res.statusCode === 404){
        console.log("Invalid URL");

    }else{
        console.log(err);
        console.log(res.statusCode);
    }
})

function parseHtml(html){
    let d = cheerio.load(html);
let death_table = d(".table .table-bordered .table-hover .main_table_countries .dataTable .no-footer").html(); 
    // console.table(death_table);
    let tr_arr = d(".sorting");
    let row = d(tr_arr[0]).find("th").html();
    // console.log(row);
    console.log(row.length);
    
}