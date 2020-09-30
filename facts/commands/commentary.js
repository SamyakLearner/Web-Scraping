// var el = document.createElement( 'html' );
// el.innerHTML = "<html><head><title>titleTest</title></head><body><a href='test0'>test01</a><a href='test1'>test02</a><a href='test2'>test03</a></body></html>";

// el.getElementsByTagName( 'a' ); // Live NodeList of your anchor elements
const fs = require("fs");
const request = require('request');
const cheerio = require('cheerio');

request("https://www.espncricinfo.com/series/19322/scorecard/1187679",function(err,res,html){
// console.log(res);    
if(err == null && res.statusCode == 200){
        //fs.writeFileSync("abc.html",html);
        console.log("Working")
        parsehtml(html);
    }
    else if(res.statusCode == 404)
    {
        console.log("page not found");
    }
    else{
        console.log(err);
        console.log(res.statusCode);
    }
});

// https://www.espncricinfo.com/series/19322/commentary/1187679

request("https://www.espncricinfo.com/series/19322/commentary/1187679",function(err,res,html){
// console.log(res);    
if(err == null && res.statusCode == 200){
        //fs.writeFileSync("abc.html",html);
        // console.log("Working")
        parsehtml(html);
    }
    else if(res.statusCode == 404)
    {
        console.log("page not found");
    }
    else{
        console.log(err);
        console.log(res.statusCode);
    }
});

function parsehtml(html)
{
    console.log("parsing html");
    let co = cheerio.load(html);
    let lastcomm = co(".item-wrapper .description").html();
    fs.writeFileSync("commentary.html",lastcomm);
}