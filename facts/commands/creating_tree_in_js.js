function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}
 
function Tree(data) {
    var node = new Node(data);
    this._root = node;
}
 
Tree.prototype.traverseDF = function(callback) {
 
    // this is a recurse and immediately-invoking function
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }
 
        // step 4
        callback(currentNode);
 
        // step 1
    })(this._root);
 
};
 
Tree.prototype.traverseBF = function(callback) {
    var queue = new Queue();
 
    queue.enqueue(this._root);
 
    currentTree = queue.dequeue();
 
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.dequeue();
    }
};
 
Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};
 
Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };
 
    this.contains(callback, traversal);
 
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};
 
Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;
 
    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };
 
    this.contains(callback, traversal);
 
    if (parent) {
        index = findIndex(parent.children, data);
 
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }
 
    return childToRemove;
};
 
function findIndex(arr, data) {
    var index;
 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data === data) {
            index = i;
        }
    }
 
    return index;
}



 

 
// tree._root.children.push(new Node('three'));
// tree._root.children[1].parent = tree;
 
// tree._root.children.push(new Node('four'));
// tree._root.children[2].parent = tree;
 




//displaying the contents of the tree
tree.traverseDF(function(node) {
    console.log(node.data)
});


//
var tree = new Tree('root');
function viewAsTree(source_path)
{
     
    
    const fs = require('fs');
        var files= fs.readdirSync(source_path);
        var path = require('path');
           // splitting the path with \ delimiter
        let parent = path.basename(source_path);
        
        console.log("parent is "+ parent);
        node.data = parent;
        let string_to_be_displayed = parent + "   =>  ";   //displaying the root folder
        // console.log(root);
        for(let i = 0;i<files.length;i++)      // loop to append internal file names               
                                               // in string_to_be_displayed
        {
            string_to_be_displayed += files[i];
            string_to_be_displayed += "   ";    
            tree._root.children.push(new Node(files[i]));
            tree._root.children[0].parent = tree;  
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