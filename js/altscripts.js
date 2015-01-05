var terminal = {
// -----------------------------------------------------------------------
// VIRTUAL FILESYSTEM
// -----------------------------------------------------------------------
    fs: {
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
                },
                files: ["readme.txt"]
            }
        },
        bin: {}
    },
// -----------------------------------------------------------------------
// MORE TERMINAL PROPERTIES
// -----------------------------------------------------------------------
    hist: [],
    ver: "0.1",
    user: "rt",
    theme: "old",
    
// -----------------------------------------------------------------------
// TERMINAL METHODS
// -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
    // Display help information, list of commands
    // -----------------------------------------------------------------------
    help: function() {
        var displayCommands = "";

        for (var i = 0; i < helpList.length; i++) {

            displayCommands += "<p>" + helpList[i] + "</p>";

        }

        output.innerHTML += outputHTML;
        output.innerHTML += displayCommands;
    },
    // -----------------------------------------------------------------------
    // Clear the terminal output
    // -----------------------------------------------------------------------
    clear: function() {
        output.innerHTML = "";
    },
    // -----------------------------------------------------------------------
    // Display current date, time, and timezone
    // -----------------------------------------------------------------------
    date: function() {
        output.innerHTML += outputHTML;
        output.innerHTML += "<p>" + Date() + "</p>";
    },
    // -----------------------------------------------------------------------
    // Output argument as a string
    // -----------------------------------------------------------------------
    echo: function() {
        var echo = commandArgs.slice(1).join(" ");

        output.innerHTML += outputHTML;
        output.innerHTML += "<p>" + echo + "</p>";
    },
    // -----------------------------------------------------------------------
    // Output the terminal history array
    // -----------------------------------------------------------------------
    history: function() {
        output.innerHTML += outputHTML;
        for (var key in terminal.hist) {

            output.innerHTML += "<p>" + terminal.hist[key] + "</p>";
        }
    },
    // -----------------------------------------------------------------------
    // Output the version of the terminal
    // -----------------------------------------------------------------------
    version: function() {
        output.innerHTML += outputHTML;
        output.innerHTML += "<p>WebTerm " + terminal.ver + "</p>";
    },
    // -----------------------------------------------------------------------
    // If the folder doesn't exist in pwd, create it
    // -----------------------------------------------------------------------
    mkdir: function() {
        var folderName = commandArgs.slice(1).join(" ");

        if (pwd[1].hasOwnProperty(folderName)) {

            output.innerHTML += outputHTML;
            output.innerHTML += "<p>mkdir: cannot create directory '" + folderName + "': File exists</p>";

        } else {

            pwd[1][folderName] = {files: []};
            output.innerHTML += outputHTML;
            output.innerHTML += "<p>Folder called " + folderName + " successfully created.</p>";

        }
    },
    // -----------------------------------------------------------------------
    // Change directory ================ not yet functional
    // -----------------------------------------------------------------------
    cd: function() {
        var directory = commandArgs.slice(1).join(" ");
        pwd = "";
    },
    // -----------------------------------------------------------------------
    // Open Youtube in a new tab
    // -----------------------------------------------------------------------
    youtube: function() {
        output.innerHTML += outputHTML;
        window.open('http://www.youtube.com','_blank');
    },
    // -----------------------------------------------------------------------
    // Open Youtube in a new tab
    // -----------------------------------------------------------------------
    youtubeFlagS: function() {
        var base = "https://www.youtube.com/results?search_query=";
        var term = "";
        output.innerHTML += outputHTML;

        for (var i = 2; i < commandArgs.length; i++) {

            term += commandArgs[i] + "%20";

        }

        term = term.slice(0,-3);

        if (term !== "") {

            var url = base + term;
            window.open(url, '_blank');

        }
    },
    // -----------------------------------------------------------------------
    // Output the present working directory
    // -----------------------------------------------------------------------
    pwd: function() {
        output.innerHTML += outputHTML;
        output.innerHTML += "<p>" + pwd[2] + "</p>";
    },
    // -----------------------------------------------------------------------
    // List the files and folders of the pwd
    // -----------------------------------------------------------------------
    ls: function() {
        var list = "";

        for (var key in pwd[1]) { // loop through objects in fs to show files
            var obj = pwd[1][key];
            for (var prop in obj) { // important check that this is objects own property not from prototype prop inherited
                if ( obj.hasOwnProperty(prop) && obj[prop].length > 0 ) {

                    list += "<p class='file'>" + key + " = " + obj[prop] + "</p>";

                } else if ( Array.isArray(obj[prop] && obj[prop].length > 0 ) ) {

                    
                    for ( var i = 0; i < obj[prop].length; i++ ) {

                        list += "<p class='file'>" + key + " = " + obj[prop][i] + "</p>";

                    }

                } else { list += "<p class='file'>" + key + " = empty</p>"; }
            }
        }

        output.innerHTML += outputHTML;
        output.innerHTML += list;
    },
    // -----------------------------------------------------------------------
    // If file exists in pwd, delete it
    // -----------------------------------------------------------------------
    rm: function() {
        
        var fileName = commandArgs.slice(1).join(" ");
        var files = pwd[1].files;

        if (files.indexOf(fileName) !== -1) {

            files.pop(fileName);
            output.innerHTML += outputHTML;

        } else {

            output.innerHTML += outputHTML;
            output.innerHTML += "<p>rm: cannot remove '" + fileName + "': No such file or directory</p>";

        }
    },
    // -----------------------------------------------------------------------
    // If file doesn't exist in pwd, create it
    // -----------------------------------------------------------------------
    touch: function() {
        
        var fileName = commandArgs.slice(1).join(" ");
        var files = pwd[1].files;

        if (files.indexOf(fileName) !== -1) {

            output.innerHTML += outputHTML;
            output.innerHTML += "<p>touch: cannot create file '" + fileName + "': File exists</p>";

        } else {

            files.push(fileName);
            output.innerHTML += outputHTML;
            output.innerHTML += "<p>File called " + fileName + " successfully created.</p>";

        }
    },
    // -----------------------------------------------------------------------
    // Cycle from last index of terminal.hist array
    // -----------------------------------------------------------------------
    up: function() {
        if (count === 0) {
            
            histindex = terminal.hist.length;
            
        }

        if (count <= terminal.hist.length - 1) {

            histindex--;
            input.size = terminal.hist[histindex].length + 1;
            input.value = terminal.hist[histindex];
            count++;
        }
    },
    // -----------------------------------------------------------------------
    // Cycle from last index of terminal.hist array
    // -----------------------------------------------------------------------
    down: function() {
        if (count > 1) {
            
            histindex++;
            input.size = terminal.hist[histindex].length + 1;
            input.value = terminal.hist[histindex];
            count--;

        } else {
            
            input.value = "";
            input.size = 1;
            count = 0;
        }
    },
}; // end terminal object

var helpList = ["help", "youtube", "youtube -s", "pwd", "mkdir", "touch", "ll", "cd /home/rt/desktop", "clear"];
var pwd = ["~", terminal.fs.home.rt, "/home/rt"];
var input = document.getElementById("input");
var histindex = 0;
var count = 0;

function addToHistory(command) {
    
    if (terminal.hist.slice(-1) != command) {
        
        terminal.hist.push(command);
        
    }
}

function checkCommand(e) {

    var command = input.value.toLowerCase();
    var len = command.length;
    var output = document.getElementById("output");
    commandArgs = command.split(" ");
    outputHTML = "<p>WebTerm:" + pwd[0] + " " + terminal.user + "$ " + command + "</p>";

    if (len > 0) { // adjust the caret
        input.size = len + 1;
    } else {
        input.size = 1;
    }

    if (e.keyCode === 38) { terminal.up(); }

    if (e.keyCode === 40) { terminal.down(); }

    if (e.keyCode === 13) { // enter key
        
        if (commandArgs.length === 2) { // if the command entered has one argument

            switch (commandArgs[0]) {

                case "mkdir":
                    terminal.mkdir();
                    addToHistory(command);
                break;
                    
                case "touch":
                    terminal.touch();
                    addToHistory(command);
                break;
                    
                case "rm":
                    terminal.rm();
                    addToHistory(command);
                break;
                    
                case "echo":
                    terminal.echo();
                    addToHistory(command);
                break;
                    
                case "cd":
                    terminal.cd();
                    addToHistory(command);
                break;

            }
            
        } else if (commandArgs.length > 2) { // if the command entered has more than one argument

            switch (commandArgs[0] + " " + commandArgs[1]) {

                case "youtube -s":
                    terminal.youtubeFlagS();
                    addToHistory(command);
                break;
                    
            } //switch

        } else { // if the command entered has no arguments

            switch (command) {

                case "help":
                    terminal.help();
                    addToHistory(command);
                break;
                    
                case "version":
                    terminal.version();
                    addToHistory(command);
                break;
                    
                case "history":
                    terminal.history();
                    addToHistory(command);
                break;

                case "cd /home/rt/desktop":
                    output.innerHTML += outputHTML;
                    pwd = ["/home/rt/desktop", terminal.fs.home.rt.desktop, "/home/rt/desktop"];
                    document.getElementById("commandLine").innerHTML = "WebTerm:" + pwd[0] + user + "$ ";
                    addToHistory(command);
                break;

                case "pwd":
                    terminal.pwd();
                    addToHistory(command);
                break;

                case "ls":
                    terminal.ls();
                    addToHistory(command);
                break;

                case "clear":
                    terminal.clear();
                    addToHistory(command);
                break;

                case "youtube":
                    terminal.youtube();
                    addToHistory(command);
                break;

                case "cd":
                    pwd = ["~", terminal.fs.home.rt, "/home/rt"];
                    addToHistory(command);
                break;
                    
                case "date":
                    terminal.date();
                    addToHistory(command);
                break;

                default:
                    output.innerHTML = "<p>No such command exists. Type 'help' for a list of commands.</p>";
            }
        }

        input.value = ""; // reset command line
        input.size = 1; // reset caret
        count = 0; // reset up/down history
    } // enter key

} // checkCommand

input.addEventListener("keyup", checkCommand, false);