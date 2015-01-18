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
        "bin": {}
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
            commandLine: "#FFF"
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
    help: {
        list: function() {
            var displayCommands = "";

            for (var i = 0; i < commands.length; i++) {

                displayCommands += "<p style='color:" + termtheme.text + "'>" + commands[i] + "</p>";

            }

            output.innerHTML += outputHTML;
            output.innerHTML += displayCommands;
        },
        info: function() {
            var query = commandArgs[0];
            if (commands.indexOf(query) != -1) {
                
                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>" + helpList[query].info + "</p>";
                
            } else {
                
                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>No command '" + query + "' found. Type 'help' for a list of commands.</p>";

            }
        }
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
                
                var spans = document.querySelectorAll("#output > p > span");
                for (var t = 0; t < spans.length; t++) {
                    spans[t].style.color = termtheme.commandLine;
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
        
        if (directory == "..") { // if the argument is ..

            var currentDir = pwd[2]; // currentDir is set to the pwd display string
            var le = pwd[2].length - 1; // le is set to the last index of currentDir
            
            while(currentDir.charAt(le) !== '/') { // so long as the last index of currentDir isn't a /
                currentDir = currentDir.substr(0, le); // remove the last index of currentDir
                le--; // decrement le
            }
            
            currentDir = currentDir.substr(0, le); // remove the /
            var dirObject = pathStringToObject(currentDir); // convert the string currentDir to the object it represents
            
            if (dirObject != undefined) { // if pathStringToObject returned an object
                
                output.innerHTML += outputHTML;
                pwd = [currentDir, dirObject, currentDir]; // set pwd alias, object, and display
                commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.user + "$ "; // commandLine set to represent new pwd
                
            }

        } else if (pwd[1].hasOwnProperty(directory)) { // if the argument is a key of the pwd
                  
            var reldir = pwd[2] + "/" + directory; // add the argument to the pwd display string
            var dirObject = pathStringToObject(reldir);
            
            output.innerHTML += outputHTML;
            pwd = [reldir, dirObject, reldir];
            commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.user + "$ ";
        
        } else { // if the argument is an absolute path, || not .. / relative

            var dirObject = pathStringToObject(directory);
            
            if (dirObject != undefined) {
                
                output.innerHTML += outputHTML;
                pwd = [directory, dirObject, directory];
                commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.user + "$ ";
                
            } else { // if the provided argument isn't "..", a key of the pwd, or a recognized absolute path
                
                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>cd: No such directory</p>";
                
            }
        }
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
        var file = getFile(fileName, files); // retrieve file with the provided fileName

        if (file !== null && typeof file === 'object') { // if getFile retrieved a file
            
            var index = files.indexOf(file); // determine index of that file
            
            files.splice(index, 1); // remove it from the files array
            
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
        var files = pwd[1].files;
        var fileBool = dirSearchFiles(filedir, files); // true if arg1 is a file, and it exists
        var destDirObj = pathStringToObject(destination);
        
        for (var key in objProps) {
            
            if (filedir === objProps[key]) { // if filedir is a folder, a key of the pwd object
                
                var dir = objProps[key];
                var directory = getDirectory(dir); // get the object that directory represents in the fs
                
                if (destDirObj !== null && typeof destDirObj === 'object') { // if arg2 was a valid place in the fs
                    
                    delete pwd[1][dir]; // remove arg1 directory from pwd
                    destDirObj[dir] = directory; // add the arg1 directory to the destination directory
                    
                    output.innerHTML += outputHTML;
                    
                } else { // if arg2 wasn't a valid place in the fs
                    
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + filedir + "': Destination directory does not exist</p>";
                
                }
                
            }
            
        }
        
        if (fileBool === true) { // if filedir was a file in the files array
            
            var fil = filedir;
            var file = getFile(fil, files); // retrieve it
            
            if (destDirObj !== null && typeof destDirObj === 'object') { // if arg2 was a valid place in the fs
                
                var index = files.indexOf(file); // get the index of arg1 file
                var newFile = JSON.parse(JSON.stringify(file)); // copy it
                    
                files.splice(index, 1); // remove arg1 file from pwd files
                destDirObj.files.push(newFile); // add it to the destination folder's files
                
                output.innerHTML += outputHTML;
                
            } else { // if arg2 wasn't a valid place in the fs
                
                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + filedir + "': Destination directory does not exist</p>";
            
            }
        }
        
        if (dir == undefined && fil == undefined) { // if arg1 wasn't a file or folder
            
            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + filedir + "': No such file or directory</p>";
        
        }
    },
    // -----------------------------------------------------------------------
    // Copy
    // -----------------------------------------------------------------------
    cp: function() {
        
        var file1 = commandArgs[1];
        var destination = commandArgs[2];
        var files = pwd[1].files;
        var fileBool = dirSearchFiles(file1, files); // true if the file exists in files array
        
        if (fileBool === true) { // if the file exists
            
            var file = getFile(file1, files); // retrieve it
            var newFile = JSON.parse(JSON.stringify(file)); // copy it
            
            if (destination[0] === "/") { // if the file is being relocated
                //problematic if destination directory is the pwd, new file of same name in same directory                
                var destDirObj = pathStringToObject(destination); // convert the provided string to the location it represents
                
                if (destDirObj !== null && typeof destDirObj === 'object') { // if it is a location in the fs
                    
                    destDirObj.files.push(newFile); // add the file copy to the files array of that object/directory
                    
                    output.innerHTML += outputHTML;
                    
                } else {
                    
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + file1 + "': The destination folder does not exist</p>";
                    
                }
                
            } else { // if the file isn't being relocated, rename it
                
                if (file1 != destination) {
                    
                    newFile["name"] = destination;
                    newFile["shortname"] = destination;
                    newFile["created"] = new Date();
                    newFile["modified"] = new Date();
                    
                    files.push(newFile); // and push it the files array
                    
                    output.innerHTML += outputHTML;
                    
                } else {
                
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + file1 + "': New file must have a different name</p>";
                
                }
            }
            
        } else {
            
            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + file1 + "': No such file</p>";
        
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

            var newFile = new terminal.File(fileName, fileName, " ", " ");
            
            files.push(newFile);
            
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
        
        var commandInput = input.value;
        var commandArgs = commandInput.split(" ");
        
        if (commandInput.length > 0) {
            
            var completions = [];
            
            if (commandArgs.length === 1) {
                
                for (var command in commands) {
                    
                    if (commands[command].substring(0, commandInput.length) === commandInput) {

                        completions.push(commands[command]);

                    }
                }
                
                if (completions[0] != undefined && completions[1] === undefined) {
                    
                    input.value = completions[0];
                    input.size = completions[0].length + 1;
                    
                }
                
            } else if (commandArgs.length === 2) {
                
                if (commandArgs[1][0] === "/") {
                    var full = commandArgs[1];
                    var part2 = "";
                    var length = full.length - 1;

                    while(full.charAt(length) !== '/') {
                        part2 = full.charAt(length) + part2;
                        full = full.substr(0, length);
                        length--;
                    }

                    var part1 = full;
                    full = full.substr(0, length);
                    var dirObject = pathStringToObject(full);
                    
                    if (dirObject !== null && typeof dirObject === 'object') {
                        
                        var keys = Object.keys(dirObject);
                        
                    }

                    for (var key in keys) {

                        if (keys[key].substring(0, part2.length) === part2) {

                            completions.push(keys[key]);

                        }
                    }

                    if (completions[0] != undefined && completions[0] != "files" && completions[1] === undefined) {

                        input.value = commandArgs[0] + " " + part1 + completions[0];
                        input.size = input.value.length + 1;

                    }
                }
                
            } else {
                if (commandArgs[2][0] === "/") {
                    var full = commandArgs[2];
                    var part2 = "";
                    var length = full.length - 1;

                    while(full.charAt(length) !== '/') { // until the last character of full is a /
                        part2 = full.charAt(length) + part2; // add the last character of full to part2 string
                        full = full.substr(0, length); // remove the last character from full
                        length--; // decrement length
                    }

                    var part1 = full; // part1 is full, minus everything after the /
                    full = full.substr(0, length); // remove the last character from full, a /
                    var dirObject = pathStringToObject(full); // retrieve the object that full now represents
                    
                    if (dirObject !== null && typeof dirObject === 'object') {
                        
                        var keys = Object.keys(dirObject);
                        
                    }

                    for (var key in keys) {

                        if (keys[key].substring(0, part2.length) === part2) {

                            completions.push(keys[key]);

                        }
                    }

                    if (completions[0] != undefined && completions[0] != "files" && completions[1] === undefined) {

                        input.value = commandArgs[0] + " " + commandArgs[1] + " " + part1 + completions[0];
                        input.size = input.value.length + 1;

                    }
                }
            }
        }
    },
    // -----------------------------------------------------------------------
    // Text Editor
    // -----------------------------------------------------------------------
    editor: {
        editor: document.getElementById("editor"),
        textArea: document.getElementById("editorText"),
        footer: document.getElementById("editorFooter"),
        footerNav: document.getElementById("footerNav"),
        highlight: document.getElementsByClassName("highlight"),
        header: document.getElementById("editorHeader"),
        savePrompt: document.getElementById("savePrompt"),
        prompting: false,
        run: function (file) { // startup editor passing in optional file name

            if ( file ) { terminal.editor.header.innerHTML = file; }
        
            if ( ! file ) { terminal.editor.header.innerHTML = "new buffer"; }

            // set editor to theme
            terminal.editor.editor.style.color = termtheme.text;
            terminal.editor.editor.style.background = termtheme.background;
            terminal.editor.header.style.color = termtheme.background;
            terminal.editor.header.style.background = termtheme.text;
            terminal.editor.textArea.style.color = termtheme.text;
            terminal.editor.textArea.style.background = termtheme.background;
            terminal.editor.footer.style.borderColor = termtheme.text;
            terminal.editor.footerNav.style.color = termtheme.text;
            terminal.editor.savePrompt.style.color = termtheme.background;
            terminal.editor.savePrompt.style.background = termtheme.text;

            // style footer list items. iterate over items with class of highlight and apply styles.
            for ( var i = 0; i < terminal.editor.highlight.length; i++ ) {

                item = terminal.editor.highlight[i];
                item.style.color = termtheme.background;
                item.style.background = termtheme.text;

            }

            // show text editor overlay
            terminal.editor.editor.style.display = "inline";
            terminal.editor.textArea.focus();

        },
        save: function (fileName) { // save file passing in file name

            var shortname = fileName.slice(0, -4);
            var extension = fileName.slice(-4, fileName.length);
            var content = terminal.editor.textArea.value;
            terminal.fs.home.user.files.push(""); // add empty array item
            terminal.fs.home.user.files[terminal.fs.home.user.files.length - 1] = new terminal.File(fileName, shortname, content, extension); // save file to empty array item

        },
        changePrompt: function () { // change to file name prompot
            terminal.editor.savePrompt.innerHTML = "File Name to Write: new buffer";
        },
        hidePrompt: function () { 
            terminal.editor.savePrompt.style.display = "none";
            terminal.editor.prompting = false;
        },
        showPrompt: function () { // show save prompt

            terminal.editor.prompting = true;

            terminal.editor.savePrompt.style.display = "inline";
            terminal.editor.footerNav.innerHTML = "<li><span class='highlight'>Y :</span> Yes</li><li><span class='highlight'>N :</span> No</li><li><span class='highlight'>^C :</span> Cancel</li>";
            
            // style footer list items. iterate over items with class of highlight and apply styles.
            for ( var i = 0; i < terminal.editor.highlight.length; i++ ) {

                item = terminal.editor.highlight[i];
                item.style.color = termtheme.background;
                item.style.background = termtheme.text;

            }

        },
        resetEditor: function() { // reset editor settings to blank
            terminal.editor.editor.style.display = "none"; // hide editor overlay 
            terminal.editor.savePrompt.style.display = "none"; // hide save prompt
            terminal.editor.textArea.value = ""; // reset text area
            terminal.editor.footerNav.innerHTML = "<li><span class='highlight'>^O :</span> Save</li><li><span class='highlight'>^X :</span> Exit</li>";
            terminal.editor.prompting = false;
            terminal.commandLine.focus();
        },
        exit: function (save) { // exit editor and call save if true

            var fileName = terminal.editor.header.innerHTML;

            if ( fileName = "new buffer" ) { terminal.editor.changePrompt(); }

            if ( save ) { terminal.editor.save(fileName); terminal.editor.resetEditor(); }

            if ( ! save ) { terminal.editor.resetEditor(); }

        }
    },
    // -----------------------------------------------------------------------
    // Get File System from Local Storage
    // -----------------------------------------------------------------------
    getfs: function () { // bug where an ls shows old fs until directory change
        terminal.fs = getItemFromLocalStorage('fs');
    }

}; // end terminal object

// START VARIABLES AND FUNCTIONS

var helpList = {
    "touch": {
        name: "touch",
        info: "Create a new file in the present working directory<br>touch [file]<br>ex. touch mydocument.txt"
    },
    "clear": {
        name: "clear",
        info: "Clear the terminal output<br>clear"
    },
    "editor": {
        name: "editor",
        info: "Open the built in text editor<br>editor<br>Open the provided file in the text editor<br>editor [file]<br>ex. editor readme.txt"
    },
    "signin": {
        name: "signin",
        info: "Sign in the provided user<br>signin [userName]<br>ex. signin rt"
    },
    "signout": {
        name: "signout",
        info: "Signout the currently signed in user<br>signout"
    },
    "version": {
        name: "version",
        info: "Output the version of the Web Terminal<br>version"
    },
    "echo": {
        name: "echo",
        info: "Output the provided string<br>echo [string]<br>ex. echo Hello"
    },
    "date": {
        name: "date",
        info: "Output the current date, time, and timezone<br>date"
    },
    "rm": {
        name: "rm",
        info: "Remove the provided file<br>rm [file]<br>ex. rm readme.txt"
    },
    "history": {
        name: "history",
        info: "Output a list of previously entered commands<br>history"
    },
    "cd": {
        name: "cd",
        info: "Change the present working directory<br>cd<br>cd ..<br>cd [directory]<br>ex. cd Documents<br>ex. cd /home/user/Documents"
    },
    "ls": {
        name: "ls",
        info: "Output a list of the files and folders in the present working directory<br>ls<br>Output in long format<br>ls -l"
    },
    "theme": {
        name: "theme",
        info: "Change the color scheme of the Web Terminal<br>theme [theme]<br>ex. theme white<br>Output a list of available themes<br>theme -l"
    },
    "help": {
        name: "help",
        info: "Provides a list of available commands, and information on the Web Terminal<br>help"
    },
    "youtube": {
        name: "youtube",
        info: "Open a new tab in your browser to youtube.com<br>youtube<br>Search youtube.com with the provided search query<br>youtube -s [query]<br>ex. youtube -s funny cats"
    },
    "pwd": {
        name: "pwd",
        info: "Output the present working directory<br>pwd"
    },
    "mkdir": {
        name: "mkdir",
        info: "Create a new folder in the present working directory<br>mkdir [folder]<br>ex. mkdir Pictures"
    },
    "cp": {
        name: "cp",
        info: "Copy a file<br>cp [file] [destination]<br>ex. cp readme.txt /home/user/desktop<br>cp [file] [newName]<br>ex. cp readme.txt readme2.txt"
    },
    "mv": {
        name: "mv",
        info: "Move (cut and paste) a file or folder<br>mv [file] [destination]<br>ex. mv readme.txt /home/user/desktop<br>mv [folder] [destination]<br>ex. mv Documents /home/user/Desktop"
    }
};
var commands = Object.keys(helpList);
var pwd = ["~", terminal.fs.home.user, "/home/user"];
var input = document.getElementById("input");
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

function getFile(file, directory) {
    for (var i = 0; i < directory.length; i++) {
        if (file === directory[i]["name"]) {
            return directory[i];
        }
    }
}

function getDirectory(directory) {
    var currentDir = pwd[2] + "/" + directory;
    var dirObject = pathStringToObject(currentDir);
    return dirObject;
}

function index(obj,is, value) {
    if (typeof is == 'string') { return index(obj, is.split('.'), value); }

    else if (is.length == 1 && value !== undefined) { return obj[is[0]] = value; }

    else if (is.length == 0) { return obj; }

    else { return index(obj[is[0]],is.slice(1), value); }
}

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function pathStringToObject(dirString) {
    
    var dotdir = replaceAll("/", ".", dirString);
    
    while(dotdir.charAt(0) === '.') {
        dotdir = dotdir.substr(1);
     }
    
    var dirObject = index(terminal.fs, dotdir);
    
    return dirObject;
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


function textEditor(e) { // for handling saving and exiting cases
    if (e.keyCode === 88 && e.ctrlKey && terminal.editor.prompting === false) { terminal.editor.showPrompt(); } // x key
    //if (e.keyCode === 79 && e.ctrlKey && terminal.editor.save === true) { terminal.editor.exit(); } // o key
    if (e.keyCode === 89 && e.ctrlKey && terminal.editor.prompting === true) { terminal.editor.exit(true); } // y key
    if (e.keyCode === 78 && e.ctrlKey && terminal.editor.prompting === true) { terminal.editor.exit(); } // n key
    if (e.keyCode === 67 && e.ctrlKey && terminal.editor.prompting === true) { terminal.editor.hidePrompt(); } // c key
}

function saveItemToLocalStorage (item, keyname) {
    
    localStorage.setItem( keyname, JSON.stringify(item) ); //create new key values and store in localStorage. convert object to string.

}

function getItemFromLocalStorage (keyname) {

        var key,
            keystring;

        if ( localStorage.getItem(keyname) ) {  //if note exists in localStorage get it and parse from string to object. set fs to saved fs.

            keyString = localStorage.getItem(keyname);
            key = JSON.parse(keyString);

        }

        return key;
    }

function removeItemFromLocalStorage (keyname) {
    localStorage.removeItem(keyname);
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
            if (commandArgs[1] != "-help" && commandArgs[1] != "--help") {
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

                    case "editor":
                        terminal.editor.run(commandArgs[1]);
                        addToHistory(command);
                    break;
                    default:
                        if (commands.indexOf(commandArgs[0]) == -1) {
                            output.innerHTML += outputHTML;
                            output.innerHTML += "<p style='color:" + termtheme.text + "'>No command '" + commandArgs[0] + "' found. Type 'help' for a list of commands.</p>";
                        } else {
                            output.innerHTML += outputHTML;
                            output.innerHTML += "<p style='color:" + termtheme.text + "'>Try '" + commandArgs[0] + " -help' for information on proper usage</p>";
                        }
                }
            }
            
            switch(commandArgs[1]) {
                case "--help":
                    terminal.help.info();
                    addToHistory(command);
                break;
                case "-help":
                    terminal.help.info();
                    addToHistory(command);
                break;
            }
            
        } else if (commandArgs.length > 2) { // if the command entered has more than one argument
            if (commandArgs[0] != "mv" && commandArgs[0] != "cp") {
                switch (commandArgs[0] + " " + commandArgs[1]) {
                
                    case "youtube -s":
                        terminal.youtube.s();
                        addToHistory(command);
                    break;

                    default:
                        if (commands.indexOf(commandArgs[0]) == -1) {
                            output.innerHTML += outputHTML;
                            output.innerHTML += "<p style='color:" + termtheme.text + "'>No command '" + commandArgs[0] + "' found. Type 'help' for a list of commands.</p>";
                        } else {
                            output.innerHTML += outputHTML;
                            output.innerHTML += "<p style='color:" + termtheme.text + "'>Try '" + commandArgs[0] + " -help' for information on proper usage</p>";
                        }
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

            }

        } else { // if the command entered has no arguments

            switch (command) {

                case "help":
                    terminal.help.list();
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

                case "cd":
                    output.innerHTML += outputHTML;
                    pwd = ["~", terminal.fs.home.user, "/home/user"];
                    commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.user + "$ ";
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
                
                case "savefs":
                    saveItemToLocalStorage(terminal.fs, 'fs');
                    addToHistory(command);
                break;
                
                case "getfs":
                    terminal.getfs();
                    addToHistory(command);
                break;

                case "deletefs":
                    removeItemFromLocalStorage('fs');
                    addToHistory(command);
                break;

                default:
                    if (commands.indexOf(command) == -1) {
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>No command '" + command + "' found. Type 'help' for a list of commands.</p>";
            
                    } else {
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>Try '" + command + " -help' for information on proper usage</p>";
                    }
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