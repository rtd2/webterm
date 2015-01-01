// virtual filesystem
var fs = {
    home: {
        rt: {
            desktop: {
                files: ["abc.txt", "urmum.txt"]
            },
            downloads: {
                files: ["example.txt", "document.txt", "another.txt"]
            },
            documents: {
                files: []
            }
        }
    },
    bin: {}
};

var helpList = ["help", "youtube", "youtube -s", "pwd", "mkdir", "mkdir called", "touch", "touch called", "ll", "cd /home/rt/desktop", "clear"];

var pwd = ["~", fs.home.rt, "/home/rt"]; // display, dot notation, cd display
var commands = document.getElementById("command");


var hist = [];
var histindex = 0;
var count = 0;

commands.addEventListener("keyup", checkCommand, false);

function checkCommand(e) {

    var command = commands.value.toLowerCase();
    var len = command.length;
    var history = document.getElementById("history");
    var webtermHTML = "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";
    var commandArgs = command.split(" ");

    if (len > 0) {

        commands.size = len + 1;

    } else {

        commands.size = 1;
    }

    // terminal history
    // up key
    if (e.keyCode === 38) {

        if (count === 0) {

            histindex = hist.length;

        }

        if (count <= hist.length - 1) {

            histindex--;
            commands.size = hist[histindex].length + 1;
            commands.value = hist[histindex];
            count++;
        }

    }

    // down key
    if (e.keyCode === 40) {

        if (count > 1) {
            
            histindex++;
            commands.size = hist[histindex].length + 1;
            commands.value = hist[histindex];
            
            count--;

        } else {
            commands.value = "";
            commands.size = 1;
            count = 0;
        }

    }

    // enter key
    if (e.keyCode === 13) {

        if (commandArgs.length > 2) {

            switch(commandArgs[0] + " " + commandArgs[1]){

            case "youtube -s": // search youtube with argument passed in

                var base = "https://www.youtube.com/results?search_query=";
                var term = "";

                for (var i = 2; i < commandArgs.length; i++) {
                    term += commandArgs[i] + "%20";
                }

                term = term.slice(0,-3);

                if (term !== "") {
                    var url = base + term;
                    window.open(url, '_blank');
                }
                history.innerHTML += webtermHTML;
                addToHistory(command);
                count = 0;

                break;

            case "mkdir called": // if folder doesn't exist, create it and add to fs

                    var folderName = commandArgs.slice(2).join(" ");

                    if (pwd[1].hasOwnProperty(folderName)) {
                        history.innerHTML += webtermHTML;
                        history.innerHTML += "<p>Folder called " + folderName + " already exists.</p>";
                    } else {
                        pwd[1][folderName] = {files: []};
                        history.innerHTML += webtermHTML;
                        history.innerHTML += "<p>Folder called " + folderName + " successfully created.</p>";
                    }

                    addToHistory(command);
                    count = 0;

                    break;

            case "touch called": // if file doesn't exist, create it and add to documents folder

                    var fileName = commandArgs.slice(2).join(" ");

                    var docs = pwd[1].documents.files;
                    if (docs.indexOf(fileName) != -1) {
                        history.innerHTML += webtermHTML;
                        history.innerHTML += "<p>File called " + fileName + " already exists.</p>";
                    } else {
                        docs.push(fileName + ".txt");
                        history.innerHTML += webtermHTML;
                        history.innerHTML += "<p>File called " + fileName + " successfully created.</p>";
                    }

                    addToHistory(command);
                    count = 0;

                    break;        
            } //switch

        }   else {

                switch(command){

                case "help": // show list of commands

                    history.innerHTML += webtermHTML;
                    var displayCommands = "";
                    // display help
                    for (var i = 0; i < helpList.length; i++) {
                        displayCommands += "<p>" + helpList[i] + "</p>";
                    }

                    history.innerHTML += displayCommands;

                    // terminal history
                    addToHistory(command);
                    count = 0;

                    break;

                case "cd /home/rt/desktop": // fake cd functionality

                    history.innerHTML += webtermHTML;

                    pwd = ["/home/rt/desktop", fs.home.rt.desktop, "/home/rt/desktop"];
                    document.getElementById("block").innerHTML = "WebTerm:" + pwd[0] + " rt$ ";

                    addToHistory(command);
                    count = 0;

                    break;

                case "mkdir": // if folder doesn't exist, create it and add to fs

                    var folderName = window.prompt("What will the folder be called?");

                    if (pwd[1].hasOwnProperty(folderName)) {
                        history.innerHTML += webtermHTML;
                        history.innerHTML += "<p>Folder called " + folderName + " already exists.</p>";
                    } else {
                        pwd[1][folderName] = {files: []};
                        history.innerHTML += webtermHTML;
                        history.innerHTML += "<p>Folder called " + folderName + " successfully created.</p>";
                    }

                    addToHistory(command);
                    count = 0;

                    break;

                case "touch": // if file doesn't exist, create it and add to documents folder

                    var fileName = window.prompt("What will the file be called?");
                    var docs = pwd[1].documents.files;
                    if (docs.indexOf(fileName) != -1) {
                        history.innerHTML += webtermHTML;
                        history.innerHTML += "<p>File called " + fileName + " already exists.</p>";
                    } else {
                        docs.push(fileName + ".txt");
                        history.innerHTML += webtermHTML;
                        history.innerHTML += "<p>File called " + fileName + " successfully created.</p>";
                    }

                    addToHistory(command);
                    count = 0;

                    break;

                case "pwd": // show present working directory

                    history.innerHTML += webtermHTML;

                    history.innerHTML += "<p>" + pwd[2] + "</p>";

                    addToHistory(command);
                    count = 0;

                    break;

                case "ll": // show all files in fs/home/rt

                    var list = "";

                    // loop through objects in fs to show files
                    for (var key in pwd[1]) {
                       var obj = pwd[1][key];
                       for (var prop in obj) {
                          // important check that this is objects own property 
                          // not from prototype prop inherited
                          if(obj.hasOwnProperty(prop) && obj[prop].length > 0){
                            list += "<p class='file'>" + key + " = " + obj[prop] + "</p>";
                          } else {list += "<p class='file'>" + key + " = empty</p>";}
                       }
                    }

                    history.innerHTML += webtermHTML;

                    history.innerHTML += "<p>" + list + "</p>";

                    addToHistory(command);
                    count = 0;

                    break;

                case "clear": //clear page

                    history.innerHTML = "";

                    addToHistory(command);
                    count = 0;

                    break;

                case "youtube": // open youtube in new tab

                    history.innerHTML += webtermHTML;

                    window.open('http://www.youtube.com','_blank');

                    addToHistory(command);
                    count = 0;

                    break;

                default:
                    history.innerHTML = "<p>No such command exists. Type 'help' for a list of commands.</p>";
            }
        }

        commands.value = "";
        commands.size = 1; 
    } // enter key

} // checkCommand


function addToHistory(command) {
    if(hist.slice(-1) != command){
        hist.push(command);
    }
}