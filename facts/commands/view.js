



module.exports.view = function(){
   
    let source_path = arguments[0];
    let mode = arguments[1];
    
    if(mode == "-t"){
        viewAsTree(source_path);    
    }
    else if(mode == "-f")
    {
        viewAsFiles(source_path);
    }
    else{
        console.log("wrong parameters");
    }
};
var space = "";
let root = {};
let tempobj = {};
function viewAsTree(source_path)
{
    
    
    const fs = require('fs');
        var files= fs.readdirSync(source_path);
        var path = require('path');
           // splitting the path with \ delimiter
        let parent = path.basename(source_path);
        let node = tempobj;
        console.log("parent is "+ parent);
        node.data = parent;
        let string_to_be_displayed = parent + "   =>  ";   //displaying the root folder
        // console.log(root);
        for(let i = 0;i<files.length;i++)      // loop to append internal file names               
                                               // in string_to_be_displayed
        {
            string_to_be_displayed += files[i];
            root.children += files[i];
            string_to_be_displayed += "   ";      
        }
        if(i= files.length)
        {space += "  ";}
        console.log(space + string_to_be_displayed);   // comment it for flat format mode
       
        for(let i = 0;i<files.length;i++)
        {
            let newpath = (path.join(source_path,files[i]));   // updating the new path to internal nodes
            var stats = fs.statSync(newpath);
            
            if(!stats.isFile())             //checking if the path has reached the file inside folder
            {
                // console.log("     " + newpath );   // comment this for the treefy mode
                viewAsTree(newpath);
            }    
        }
    // console.log("view as tree is working");
    console.log(root);
}
function viewAsFiles()
{
    console.log("viewfile as tree is working");
}