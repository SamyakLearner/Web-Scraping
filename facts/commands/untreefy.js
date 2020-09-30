// module.exports.untreefy = function(command,source_path){
//     viewAsTree(source_path);
//     // creating function for node
// function Node(data) {
//     this.data = data;
//     this.parent = null;
//     this.children = [];
// }
// // constructor for tree
// function Tree(data) {
//     var node = new Node(data);
//     this._root = node;
// }
// Tree.prototype.traverseDF = function(callback) {
 
//     // this is a recurse and immediately-invoking function 
//     (function recurse(currentNode) {
//         // step 2
//         for (var i = 0, length = currentNode.children.length; i < length; i++) {
//             // step 3
//             recurse(currentNode.children[i]);
//         }
//         // step 4
//         callback(currentNode);
         
//         // step 1
//     })(this._root);
 
// };



// function viewAsTree(source_path)
//     { 
//         const fs = require('fs');
//         var files= fs.readdirSync(source_path);
//         var path = require('path');
//            // splitting the path with \ delimiter
//         let parent = path.basename(source_path);
//         var root = new Tree(parent);                       //creating the root of the tree
//         let string_to_be_displayed = parent + "   =>  ";   //displaying the root folder
        
//         for(let i = 0;i<files.length;i++)      // loop to append internal file names               
//                                                // in string_to_be_displayed
//         {
//             string_to_be_displayed += files[i];
//             tree._root.children.push(new Node(files[i]));
//             tree._root.children[i].parent = tree;
            
//             string_to_be_displayed += "   ";      
//         }
//         if(i= files.length)
//         {space += "  ";}
//         console.log(space + string_to_be_displayed);   // comment it for flat format mode
       
//         for(let i = 0;i<files.length;i++)
//         {
//             let newpath = (path.join(source_path,files[i]));   // updating the new path to internal nodes
//             var stats = fs.statSync(newpath);
            
//             if(!stats.isFile())             //checking if the path has reached the file inside folder
//             {
//                 // console.log("     " + newpath );   // comment this for the treefy mode
//                 viewAsTree(newpath);
//             }
          
//         }
    
//     } // end of viewAsTree function
//     tree.traverseDF(function(node) {
//         console.log(node.data)
//     });
// }  // end of untreefy