var terminal = {
// -----------------------------------------------------------------------
// VIRTUAL FILESYSTEM
// -----------------------------------------------------------------------
    "fs": {
        "home": {
            "user": {
                "desktop": {
                    "files": [
                        {
                            "name": "abc.txt",
                            "shortname": "abc",
                            "content": "I am content",
                            "extension": ".txt",
                            "created": "",
                            "modified": ""
                        },
                        {
                            "name": "urmum.txt",
                            "shortname": "urmum",
                            "content": "I have content",
                            "extension": ".txt",
                            "created": "",
                            "modified": ""
                        }
                    ]
                },
                "downloads": {
                    "files": [
                        {
                            "name": "example.txt",
                            "shortname": "example",
                            "content": "I am content",
                            "extension": ".txt",
                            "created": "",
                            "modified": ""
                        },
                        {
                            "name": "document.txt",
                            "shortname": "document",
                            "content": "I am content",
                            "extension": ".txt",
                            "created": "",
                            "modified": ""
                        },
                        {
                            "name": "another.txt",
                            "shortname": "another",
                            "content": "I am content",
                            "extension": ".txt",
                            "created": "",
                            "modified": ""
                        }
                    ]
                },
                "documents": {
                    "files": []
                },
                "files": [
                    {
                        "name": "readme.txt",
                        "shortname": "readme",
                        "content": "I am content",
                        "extension": ".md",
                        "created": "",
                        "modified": ""
                    }
                ]
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
    lastLogin: "",
    termthemes: {
        old: {
            background: "#2E312C",
            text: "#9DCE91",
            file: "#FFF",
            folder: "SlateBlue",
            commandLine: "#9DCE91"
        },
        white: {
            background: "#FFF",
            text: "#000",
            file: "#999",
            folder: "Green",
            commandLine: "#000080",
        },
        black: {
            background: "#111",
            text: "#FFF",
            file: "#FFF",
            folder: "limegreen",
            commandLine: "#FF69B4",
        }
    },
    themeDefault: "old",
    commandLine: document.getElementById("commandLine"),

    // -----------------------------------------------------------------------
    // New file constructor
    // -----------------------------------------------------------------------
    File: function (name, shortname, content, extension) {

        this.name = name;
        this.shortname = shortname;
        this.content = content;
        this.extension = extension;
        this.created = new Date();
        this.modified = new Date();

    },
    
// -----------------------------------------------------------------------
// TERMINAL METHODS
// -----------------------------------------------------------------------
    // -----------------------------------------------------------------------
    // Display help information, list of commands
    // -----------------------------------------------------------------------
    help: function() {
        var displayCommands = "";

        for (var i = 0; i < helpList.length; i++) {

            displayCommands += "<p style='color:" + termtheme.text + "'>" + helpList[i] + "</p>";

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
        output.innerHTML += "<p style='color:" + termtheme.text + "'>" + new Date() + "</p>";
    },
    // -----------------------------------------------------------------------
    // Output argument as a string
    // -----------------------------------------------------------------------
    echo: function() {
        var echo = commandArgs.slice(1).join(" ");

        output.innerHTML += outputHTML;
        output.innerHTML += "<p style='color:" + termtheme.text + "'>" + echo + "</p>";
    },
    // -----------------------------------------------------------------------
    // Change the terminal theme
    // -----------------------------------------------------------------------
    theme: {
        defaultCase: function() {
        var theme = commandArgs.slice(1).join(" ");
        var themes = Object.keys(terminal.termthemes);
        var displayThemes = themes.join(", ");
        
        var updateDom = function () {

            document.body.style.background = termtheme.background;
            input.style.color = termtheme.text;
            input.style.background = termtheme.background;
            commandLine.style.color = termtheme.commandLine;
            
            var putNodes = output.childNodes;
            for (var i = 0; i < putNodes.length; i++) {
                putNodes[i].style.color = termtheme.text;
            }
        };

        output.innerHTML += outputHTML;

        switch ( theme ) {

            case "old":
                termtheme = terminal.termthemes.old;
                updateDom();
                break;

            case "black":
                termtheme = terminal.termthemes.black;
                updateDom();
                break;

            case "white":
                termtheme = terminal.termthemes.white;
                updateDom();
                break;

            default:
                output.innerHTML += "<p style='color:" + termtheme.text + "'>theme: There is no such theme. themes available: " + displayThemes + "</p>";

        }

    },
        // THIS IS NOT FUNCTIONAL
        set: function () {
            terminal.themeDefault = commandArgs[2];
        }
    },
    // -----------------------------------------------------------------------
    // Change the terminal's user
    // -----------------------------------------------------------------------
    signin: function() {
        var user = commandArgs.slice(1).join(" ");

        terminal.user = user;
        commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.user + "$ ";
        output.innerHTML += outputHTML;

        // create username cookie and set username to terminal.user. cookie will expire in 30 days after creation
        var now = new Date();
        var expiry = new Date(now);
        var expiryNum = expiry.setDate(expiry.getDate() + 30);
        document.cookie = "username=" + terminal.user; + "expires=" + expiry;
    },
    // -----------------------------------------------------------------------
    // Change the terminal's user back to default
    // -----------------------------------------------------------------------
    signout: function() {

        var now = new Date();
        document.cookie = "username=" + terminal.user; + "expires=" + now;

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

            output.innerHTML += "<p style='color:" + termtheme.text + "'>" + terminal.hist[key] + "</p>";
        }
    },
    // -----------------------------------------------------------------------
    // Output the version of the terminal
    // -----------------------------------------------------------------------
    version: function() {
        output.innerHTML += outputHTML;
        output.innerHTML += "<p style='color:" + termtheme.text + "'>WebTerm " + terminal.ver + "</p>";
    },
    // -----------------------------------------------------------------------
    // If the folder doesn't exist in pwd, create it
    // -----------------------------------------------------------------------
    mkdir: function() {
        var folderName = commandArgs.slice(1).join(" ");

        if (pwd[1].hasOwnProperty(folderName)) {

            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme.text + "'>mkdir: cannot create directory '" + folderName + "': File exists</p>";

        } else {

            pwd[1][folderName] = {files: []};
            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme.text + "'>Folder called " + folderName + " successfully created.</p>";

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
            
            if (termfsdir != undefined) {

                pwd = [directory, termfsdir, directory];
                commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.user + "$ ";
                
            }
        }
        
        output.innerHTML += outputHTML;
    },
    // -----------------------------------------------------------------------
    // Open Youtube in a new tab
    // -----------------------------------------------------------------------
    youtube: {
        defaultCase: function() {
            output.innerHTML += outputHTML;
            window.open('http://www.youtube.com','_blank');
        },
        s: function() {
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
        }
        
    },
    
    // -----------------------------------------------------------------------
    // Output the present working directory
    // -----------------------------------------------------------------------
    pwd: function() {
        output.innerHTML += outputHTML;
        output.innerHTML += "<p style='color:" + termtheme.text + "'>" + pwd[2] + "</p>";
    },
    // -----------------------------------------------------------------------
    // List the files and folders of the pwd
    // -----------------------------------------------------------------------
    ls: {
        defaultCase: function() {
        
            var list = "";
            var keys = Object.keys(pwd[1]);
            var files = pwd[1].files;

            for (var key in keys) {

                if (keys[key] !== "files") {

                    list+= "<p class='folder' style='color:" + termtheme.folder + "'>" + keys[key] + "</p>";

                }

            }

            for (var file in files) {

                list += "<p class='file' style='color:" + termtheme.file + "'>" + files[file]["name"] + "</p>";

            }

            output.innerHTML += outputHTML;
            output.innerHTML += list;
            if ( list === "" ) { output.innerHTML += "<p style='color:" + termtheme.text + "'>ls: The current directory is empty</p>"; }
        },

        l: function() {
            var flag = commandArgs.slice(1).join(" ");
            if (flag === "-l") {
                
                var list = "";
                var keys = Object.keys(pwd[1]);
                var files = pwd[1].files;

                for (var key in keys) {

                    if (keys[key] !== "files") {

                        list+= "<p class='folder' style='display: block; color:" + termtheme.folder + "'>" + keys[key] + "</p>";

                    }

                }

                for (var file in files) {

                    list += "<p class='file' style='display: block; color:" + termtheme.file + "'>" + files[file]["name"] + "</p>";

                }

                output.innerHTML += outputHTML;
                output.innerHTML += list;
            } else if (flag === "--help" || flag === "-help") {
                
                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>Help information..</p>"
                
            } else {
                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>ls: invalid option '" + flag + "'</p><p style='color:" + termtheme.text + "'>Try 'ls --help' for more information.</p>"
            }
        }
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
            output.innerHTML += "<p style='color:" + termtheme.text + "'>rm: cannot remove '" + fileName + "': No such file or directory</p>";

        }
    },
    
    // -----------------------------------------------------------------------
    // Move
    // -----------------------------------------------------------------------
    mv: function() {
        
        var filedir = commandArgs[1];
        var destination = commandArgs[2];
        var objProps = Object.keys(pwd[1]);
        var objFiles = pwd[1].files;
        
        for (var Prop in objProps) {
            if (filedir === objProps[Prop]) {
                console.log("success - dir");
                var dir = objProps[Prop];
            }
        }
        
        for (var File in objFiles) {
            if (filedir === objFiles[File]) {
                console.log("success - file");
                var fil = objFiles[File];
            }
        }
        
        if (dir == undefined && fil == undefined) {
            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + filedir + "': No such file or directory</p>";
        } else {
            console.log("success");
        }
    },
    
    // -----------------------------------------------------------------------
    // Copy
    // -----------------------------------------------------------------------
    cp: function() {
        
        var file1 = commandArgs[1];
        var file2 = commandArgs[2];
        var objFiles = pwd[1].files;
        for (var file in objFiles) {
            if (file1 === objFiles[file]) {
                objFiles.push(file2);
            }
        }
    },
    // -----------------------------------------------------------------------
    // If file doesn't exist in pwd, create it
    // -----------------------------------------------------------------------
    touch: function() {
        
        var fileName = commandArgs.slice(1).join(" ");
        var files = pwd[1].files;
        
        var fileBool = dirSearchFiles(fileName, files);

        if (fileBool === true) {

            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme.text + "'>touch: cannot create file '" + fileName + "': File exists</p>";

        } else {

            var file = new terminal.File(fileName, fileName, " ", " ");
            files.push(file);
            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme.text + "'>File called " + fileName + " successfully created.</p>";

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
    // -----------------------------------------------------------------------
    // Tab completion
    // -----------------------------------------------------------------------
    tabComplete: function() {
        var command = input.value;
        if (command.length > 0) {
            var objProps = Object.keys(pwd[1]);
            console.log(objProps);
            for (var Prop in objProps) {
                if (objProps[Prop].substring(0, command.length) === command) {
                    input.value = objProps[Prop];
                    input.size = objProps[Prop].length + 1;
                }
            }
        }
    },
    // -----------------------------------------------------------------------
    // Text Editor
    // -----------------------------------------------------------------------
    editor: {
        editor: document.getElementById("editor"),
        textArea: document.getElementById("editor-text"),
        footer: document.getElementById("editorFooter"),
        footerNav: document.getElementById("footerNav"),
        highlight: document.getElementsByClassName("highlight"),
        run: function () {

            // set editor to theme
            terminal.editor.editor.style.color = termtheme.text;
            terminal.editor.editor.style.background = termtheme.background;
            terminal.editor.textArea.style.color = termtheme.text;
            terminal.editor.textArea.style.background = termtheme.background;
            terminal.editor.footer.style.borderColor = termtheme.text;
            terminal.editor.footerNav.style.color = termtheme.text;

            // style footer list items. iterate over items with class of highlight and apply styles.
            for ( var i = 0; i < terminal.editor.highlight.length; i++ ) {

                item = terminal.editor.highlight[i];
                item.style.color = termtheme.background;
                item.style.background = termtheme.text;

            }

            // show text editor overlay
            terminal.editor.editor.style.display = "inline";
            terminal.editor.textArea.focus();

            var file = new terminal.File("stuff.txt","stuff", " ", "txt");
            console.log(file);
            terminal.fs.home.user.documents.files.push(file);

            // autosave every 3 seconds. ideally we would be prompting to save
            setInterval(function(){ 
                file.content = terminal.editor.textArea.value;
                file.modified = new Date();
                console.log(file.content);
                console.log(terminal.fs.home.user.documents.files);
            }, 3000);

        },
        exit: function () {
            console.log("I have been called.");
            // stop auto save (setInterval function)...does not work
            clearInterval();
            // hide overlay and prompt to save
            terminal.editor.editor.style.display = "none";
        }
    }
}; // end terminal object




// START VARIABLES AND FUNCTIONS


var helpList = ["help", "youtube", "youtube -s [query]", "pwd", "mkdir [folder]", "touch [file]", "ls", "ls -l", "theme white", "theme old", "cd", "clear", "history", "signin [user]", "signout", "version", "rm [file]", "echo [text]", "date", "editor"];
var pwd = ["~", terminal.fs.home.user, "/home/user"];
var input = document.getElementById("input");
//var editor = document.getElementById("editor");
var histindex = 0;
var count = 0;
var termtheme = terminal.termthemes[terminal.themeDefault];


function dirSearchFiles(file, directory) {
    for (var i = 0; i < directory.length; i++) {
        if (file === directory[i]["name"]) {
            return true;
        }
    }
}

function getCookie(cookieName) { // get a cookie
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

var username = getCookie("username");
var lastLogin = getCookie("lastlogin");
if ( username !== "" && username !== "user") {
    output = document.getElementById("output");
    output.innerHTML = "<p style='color:" + termtheme.text + "'>Welcome back " + username + ". Last login: " + lastLogin + "</p>";
}
terminal.user = username;
terminal.commandLine.innerHTML = "WebTerm:~ " + terminal.user + "$  ";
"WebTerm:" + pwd[0] + " " + terminal.user + "$ ";

terminal.lastLogin = new Date();

document.cookie = "lastlogin=" + terminal.lastLogin; // set last login cookie

function addToHistory(command) {
    
    if (terminal.hist.slice(-1) != command) {
        
        terminal.hist.push(command);
        
    }
}

function tab(e) { //prevent default tab functionality
    if (e.keyCode === 9) { e.preventDefault(); }
}


function textEditor(e) { // control key and x key
    if (e.keyCode === 88 && e.ctrlKey) { terminal.editor.exit(); }
}


function checkCommand(e) {

    var command = input.value.toLowerCase();
    var len = command.length;
    var output = document.getElementById("output");
    commandArgs = command.split(" ");
    outputHTML = "<p style='color:" + termtheme.text + "'><span style='color:" + termtheme.commandLine + "'>WebTerm:" + pwd[0] + " " + terminal.user + "$ </span>" + command + "</p>";

    if (len > 0) { // adjust the caret
        input.size = len + 1;
    } else {
        input.size = 1;
    }

    if (e.keyCode === 9) { terminal.tabComplete(); }

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
                    terminal.theme.defaultCase();
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
                    
                case "ls":
                    terminal.ls.l();
                    addToHistory(command);
                break;
                    
                case "cd":
                    terminal.cd();
                    addToHistory(command);
                break;
                
                default:
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>No command '" + command + "' found. Type 'help' for a list of commands.</p>";
            }
            
        } else if (commandArgs.length > 2) { // if the command entered has more than one argument

            switch (commandArgs[0] + " " + commandArgs[1]) {

                case "youtube -s":
                    terminal.youtube.s();
                    addToHistory(command);
                break;
                    
                default:
                    if (commandArgs[0] !== "cp" && commandArgs[0] !== "mv") {
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>No command '" + command + "' found. Type 'help' for a list of commands.</p>";
                    }

            }
            
            switch (commandArgs[0]) {

                case "cp":
                    terminal.cp();
                    addToHistory(command);
                break;
                    
                case "mv":
                    terminal.mv();
                    addToHistory(command);
                break;
                    
                default:
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>No command '" + command + "' found. Type 'help' for a list of commands.</p>";
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
                    terminal.ls.defaultCase();
                    addToHistory(command);
                break;

                case "clear":
                    terminal.clear();
                    addToHistory(command);
                break;

                case "youtube":
                    terminal.youtube.defaultCase();
                    addToHistory(command);
                break;
                    
                case "date":
                    terminal.date();
                    addToHistory(command);
                break;

                case "editor":
                    terminal.editor.run();
                    addToHistory(command);
                break;

                default:
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>No command '" + command + "' found. Type 'help' for a list of commands.</p>";
            }
        }

        input.value = ""; // reset command line
        input.size = 1; // reset caret
        count = 0; // reset up/down history
    } // enter key

} // checkCommand

input.addEventListener("keyup", checkCommand, false);
input.addEventListener("keydown", tab, false);
terminal.editor.textArea.addEventListener("keyup", textEditor, false);





