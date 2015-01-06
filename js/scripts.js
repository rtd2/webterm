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
    user: "user",
    termthemes: {
        white: ["#FFF", "#000", "#999", "Green"],
        old: ["#2E312C", "#9DCE91", "#FFF", "SlateBlue"]
    },
    commandLine: document.getElementById("commandLine"),
    
// -----------------------------------------------------------------------
// TERMINAL METHODS
// -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
    // Display help information, list of commands
    // -----------------------------------------------------------------------
    help: function() {
        var displayCommands = "";

        for (var i = 0; i < helpList.length; i++) {

            displayCommands += "<p style='color:" + termtheme[1] + "'>" + helpList[i] + "</p>";

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
        output.innerHTML += "<p style='color:" + termtheme[1] + "'>" + Date() + "</p>";
    },
    // -----------------------------------------------------------------------
    // Output argument as a string
    // -----------------------------------------------------------------------
    echo: function() {
        var echo = commandArgs.slice(1).join(" ");

        output.innerHTML += outputHTML;
        output.innerHTML += "<p style='color:" + termtheme[1] + "'>" + echo + "</p>";
    },
    // -----------------------------------------------------------------------
    // Change the terminal theme
    // -----------------------------------------------------------------------
    theme: function() {
        var theme = commandArgs.slice(1).join(" ");
        
        output.innerHTML += outputHTML;
        
        if (theme === "white") {
            
            termtheme = terminal.termthemes.white;
            
            document.body.style.background = termtheme[0];
            input.style.color = termtheme[1];
            input.style.background = termtheme[0];
            commandLine.style.color = termtheme[1];
            
            var putNodes = output.childNodes;
            for (var i = 0; i < putNodes.length; i++) {
                putNodes[i].style.color = termtheme[1];
            }
            
        } else if (theme === "old") {
            
            termtheme = terminal.termthemes.old;
            
            document.body.style.background = termtheme[0];
            input.style.color = termtheme[1];
            input.style.background = termtheme[0];
            commandLine.style.color = termtheme[1];
            
            var putNodes = output.childNodes;
            for (var i = 0; i < putNodes.length; i++) {
                putNodes[i].style.color = termtheme[1];
            }
                        
        } else {
            
            output.innerHTML += "<p style='color:" + termtheme[1] + "'>theme: There is no such theme</p>"
            
        }

    },
    // -----------------------------------------------------------------------
    // Change the terminal's user
    // -----------------------------------------------------------------------
    signin: function() {
        var user = commandArgs.slice(1).join(" ");
        
        terminal.user = user;
        commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + user + "$ ";

        output.innerHTML += outputHTML;
    },
    // -----------------------------------------------------------------------
    // Change the terminal's user back to default
    // -----------------------------------------------------------------------
    signout: function() {
        terminal.user = "user";
        commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.user + "$ ";

        output.innerHTML += outputHTML;
    },
    // -----------------------------------------------------------------------
    // Output the terminal history array
    // -----------------------------------------------------------------------
    history: function() {
        output.innerHTML += outputHTML;
        for (var key in terminal.hist) {

            output.innerHTML += "<p style='color:" + termtheme[1] + "'>" + terminal.hist[key] + "</p>";
        }
    },
    // -----------------------------------------------------------------------
    // Output the version of the terminal
    // -----------------------------------------------------------------------
    version: function() {
        output.innerHTML += outputHTML;
        output.innerHTML += "<p style='color:" + termtheme[1] + "'>WebTerm " + terminal.ver + "</p>";
    },
    // -----------------------------------------------------------------------
    // If the folder doesn't exist in pwd, create it
    // -----------------------------------------------------------------------
    mkdir: function() {
        var folderName = commandArgs.slice(1).join(" ");

        if (pwd[1].hasOwnProperty(folderName)) {

            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme[1] + "'>mkdir: cannot create directory '" + folderName + "': File exists</p>";

        } else {

            pwd[1][folderName] = {files: []};
            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme[1] + "'>Folder called " + folderName + " successfully created.</p>";

        }
    },
    // -----------------------------------------------------------------------
    // Change directory
    // -----------------------------------------------------------------------
    cd: function() {
        var directory = commandArgs.slice(1).join(" ");
        
        function index(obj,is, value) {
            if (typeof is == 'string')
                return index(obj, is.split('.'), value);
            else if (is.length == 1 && value !== undefined)
                return obj[is[0]] = value;
            else if (is.length == 0)
                return obj;
            else
                return index(obj[is[0]],is.slice(1), value);
        }
        
        function replaceAll(find, replace, str) {
            return str.replace(new RegExp(find, 'g'), replace);
        }
        
        if (directory == "..") {


            var current = pwd[2];
            var le = pwd[2].length - 1;
            while(current.charAt(le) !== '/') {
                current = current.substr(0, current.length - 1);
                le--;
            }
            current = current.substr(0, current.length - 1);
            
            var predir = replaceAll("/", ".", current);
            
            while(predir.charAt(0) === '.') {
                predir = predir.substr(1);
            }
            
            var fspredir = index(terminal.fs, predir);
            
            pwd = [current, fspredir, current];
            commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.user + "$ ";
            
        } else if (pwd[1].hasOwnProperty(directory)) {
                  
            var reldir = pwd[2] + "/" + directory;
            var dotreldir = replaceAll("/", ".", reldir);
            
            while(dotreldir.charAt(0) === '.') {
                dotreldir = dotreldir.substr(1);
            }
            
            var fsreldir = index(terminal.fs, dotreldir);
            
            pwd = [reldir, fsreldir, reldir];
            commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.user + "$ ";
        
        } else {

            var fsdir = replaceAll("/", ".", directory);

            while(fsdir.charAt(0) === '.') {
                fsdir = fsdir.substr(1);
            }

            var termfsdir = index(terminal.fs, fsdir);

            pwd = [directory, termfsdir, directory];
            commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.user + "$ ";
        }
        
        output.innerHTML += outputHTML;
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
        output.innerHTML += "<p style='color:" + termtheme[1] + "'>" + pwd[2] + "</p>";
    },
    // -----------------------------------------------------------------------
    // List the files and folders of the pwd
    // -----------------------------------------------------------------------
    ls: function() {
        
        var list = "";
        var keys = Object.keys(pwd[1]);
        var files = pwd[1].files;
        
        for (var key in keys) {
            
            if (keys[key] !== "files") {
                
                list+= "<p class='folder' style='color:" + termtheme[3] + "'>" + keys[key] + "</p>";
                
            }
            
        }
        
        for (var file in files) {
            
            list += "<p class='file' style='color:" + termtheme[2] + "'>" + files[file] + "</p>";
            
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
            output.innerHTML += "<p style='color:" + termtheme[1] + "'>rm: cannot remove '" + fileName + "': No such file or directory</p>";

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
            output.innerHTML += "<p style='color:" + termtheme[1] + "'>touch: cannot create file '" + fileName + "': File exists</p>";

        } else {

            files.push(fileName);
            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme[1] + "'>File called " + fileName + " successfully created.</p>";

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

var helpList = ["help", "youtube", "youtube -s", "pwd", "mkdir", "touch", "ls", "cd", "clear", "history", "signin", "signout", "theme", "version", "rm", "echo", "date"];
var pwd = ["~", terminal.fs.home.rt, "/home/rt"];
var input = document.getElementById("input");
var histindex = 0;
var count = 0;
var termtheme = terminal.termthemes.old;

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
    outputHTML = "<p style='color:" + termtheme[1] + "'>WebTerm:" + pwd[0] + " " + terminal.user + "$ " + command + "</p>";

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
                    
                case "signin":
                    terminal.signin();
                    addToHistory(command);
                break;
                    
                case "theme":
                    terminal.theme();
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
                
                default:
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme[1] + "'>No command '" + command + "' found. Type 'help' for a list of commands.</p>";
            }
            
        } else if (commandArgs.length > 2) { // if the command entered has more than one argument

            switch (commandArgs[0] + " " + commandArgs[1]) {

                case "youtube -s":
                    terminal.youtubeFlagS();
                    addToHistory(command);
                break;
                    
                default:
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme[1] + "'>No command '" + command + "' found. Type 'help' for a list of commands.</p>";
            }

        } else { // if the command entered has no arguments

            switch (command) {

                case "help":
                    terminal.help();
                    addToHistory(command);
                break;
                    
                case "signout":
                    terminal.signout();
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
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme[1] + "'>No command '" + command + "' found. Type 'help' for a list of commands.</p>";
            }
        }

        input.value = ""; // reset command line
        input.size = 1; // reset caret
        count = 0; // reset up/down history
    } // enter key

} // checkCommand

input.addEventListener("keyup", checkCommand, false);