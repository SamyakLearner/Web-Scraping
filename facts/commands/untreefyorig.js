let fs = require("fs");
let path = require("path");
let uniqid = require("uniqid");
module.exports.untreefy = function() {              // this function is called from intro.js
  console.log("untreefy command has been Called");    
  let src = arguments[0];                           // arguments is an array behind the scenes which stores
                                                    // parameters of the function
  let dest = arguments[1];
  let root = {};
  untreefyFolder(src, dest, root);                  // passing the source folder path ,destination folder
                                                    // and empty object called root
  fs.writeFileSync(path.join(dest, "metadata.json"), JSON.stringify(root));    
  console.log("File written to dest");
  // console.log(root);

  console.log("All files have been copied");
};

function untreefyFolder(src, dest, node) {
  let ans = fs.lstatSync(src).isDirectory();      
  if (ans == false) {
    let uniqueName = uniqid();                    // getting a unique name everytime for saving file
    node.isFile = true;                           // 3 properties of file node
    node.name = path.basename(src);
    node.newName = uniqueName;
    //copy file from src to dest=> and rename them
    fs.copyFileSync(src, path.join(dest, uniqueName));
  } else {
    node.isFile = false;
    node.name = path.basename(src);                  // 2 properties of folder node
    node.children = [];
    let childrens = fs.readdirSync(src);
    for (let i = 0; i < childrens.length; i++) {
      let cChildObj = {};                            // creating new object for children info to be stored
      let chPath = path.join(src, childrens[i]);
      untreefyFolder(chPath, dest, cChildObj);       // calling untreefy for the child node
      node.children.push(cChildObj);             //pushing the new children object into the children array
    }
  }
}