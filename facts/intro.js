
let command = process.argv[2];
let viewFile = require("./commands/view");
let treefyFile = require("./commands/treefy");
let untreefyFile = require("./commands/untreefyorig");
let monitorFile = require("./commands/monitor");
let helpme = require("./commands/help");

switch (command) {
    case "view":   
                     viewFile.view(process.argv[3],process.argv[4]);
                    break;
    case "treefy":  treefyFile.treefy();
                    break;
    case "untreefy": untreefyFile.untreefy(process.argv[3],process.argv[4]);
                    break;                
    case "monitor": monitorFile.monitor();
                    break;
    case "help": helpme.help();
                    break;
    default:    console.log("Sorry! command not found");
        break;
}
