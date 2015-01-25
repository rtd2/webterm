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
    "userSettings": {
        "hist": [],
        "user": "user",
        "lastLogin": "",
        "themeDefault": "old"
    },
    "defaultSettings": { // will switch to this
        "hist": [],
        "user": "user",
        "lastLogin": "",
        "themeDefault": "old",
    },
    // need to remove below and switch to above to make saving and updating easier
    hist: [],
    user: "user",
    lastLogin: "",
    themeDefault: "old",
    //////////////////////////////
    ver: "0.1",
    termthemes: {
        old: {
            background: "#2E312C",
            text: "#9DCE91",
            file: "Gray",
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
    commandLine: document.getElementById("commandLine"),
    // -----------------------------------------------------------------------
    // load and apply user settings and fs
    // -----------------------------------------------------------------------
    init: function () {

        var d = new Date();
        var date = d.toString();
        var oldDate;

        if ( getItemFromLocalStorage('fs') ) { //load and apply user fs

            terminal.fs = getItemFromLocalStorage('fs');
            pwd[1] = terminal.fs.home.user;

        }

        if ( getItemFromLocalStorage('settings') ) {

            terminal.userSettings = getItemFromLocalStorage('settings'); // load settings: history, user, last login, theme
            termtheme = terminal.termthemes[terminal.userSettings.themeDefault];
            terminal.theme.updateDom();
            terminal.hist = terminal.userSettings.hist;
            oldDate = terminal.userSettings.lastLogin;
            terminal.userSettings.lastLogin = date;

        }


        // USER WELCOME MESSAGE
        if ( terminal.userSettings.user === "user" ) { 
            output.innerHTML = "<p style='color:" + termtheme.text + " '>Welcome to the terminal on the web. Type help for a list of commands.";
        } else {
            output.innerHTML = "<p style='color:" + termtheme.text + " '>Welcome back " + terminal.userSettings.user + ". Last login " + oldDate + ".";
        }

        terminal.lastLogin = date;
        
        terminal.save.settings();

    },
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
    // Display help information, list of commands. Methods: list, info
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
    // Change the terminal theme. Methods: defaultCase, updateDom, set
    // -----------------------------------------------------------------------
    theme: {
        defaultCase: function() {
            var theme = commandArgs.slice(1).join(" ");
            var themes = Object.keys(terminal.termthemes);
            var displayThemes = themes.join(", ");
            
            if (theme != "-l") {

                output.innerHTML += outputHTML;

                switch ( theme ) {

                    case "old":
                        termtheme = terminal.termthemes.old;
                        terminal.theme.updateDom();
                        break;

                    case "black":
                        termtheme = terminal.termthemes.black;
                        terminal.theme.updateDom();
                        break;

                    case "white":
                        termtheme = terminal.termthemes.white;
                        terminal.theme.updateDom();
                        break;

                    default:
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>theme: There is no such theme. themes available: " + displayThemes + "</p>";

                }
            } else {
                var themeList = "";

                output.innerHTML += outputHTML;

                for (theme in themes) {
                    themeList += "<p style='color:" + termtheme.text + "'>";
                    themeList += themes[theme];
                    themeList += "</p>";
                }

                output.innerHTML += themeList;
            }

        },
        updateDom: function () {

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

        },
        set: function (theme) {
            terminal.themeDefault = theme;
            terminal.userSettings.themeDefault = theme;
            termtheme = terminal.termthemes[theme];
            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme.text + "'>Default theme set to " + theme + ".</p>";
            terminal.theme.updateDom();
            terminal.save.settings();
        }
    },
    // -----------------------------------------------------------------------
    // Change the terminal's user
    // -----------------------------------------------------------------------
    signin: function() {
        var user = commandArgs.slice(1).join(" ");

        terminal.user = user;
        terminal.userSettings.user = user;
        commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.user + "$ ";
        output.innerHTML += outputHTML;
        terminal.settings.save();
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
        var returns,
            folder,
            path,
            dirObject;
        var folderName = commandArgs[1];
        
        if (folderName[0] === "/") { // if the intended destination for this folder is elsewhere in the filesystem
            
            returns = getPreDirectory(folderName); // returns an array, destination object, folderName, destination object's string
            dirObject = returns[0];
            folder = returns[1];
            path = returns[2];
            
            if (dirObject !== null && typeof dirObject === 'object') { // if the getPreDirectory retrieved a directory
                
                if (dirObject.hasOwnProperty(folder)) { // if the desired folder name already exists in destination
                    
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>mkdir: cannot create '" + folder + "': Directory already exists in '" + path + "'</p>";
                    
                } else { // if it doesn't, create it
                    
                    dirObject[folder] = {files: []};
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>Directory called '" + folder + "' successfully created.</p>";
                    terminal.save.fs();
                }
                    
            } else { // if the provided location for the folder's creation was not a place in the fs
               
                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>mkdir: cannot create '" + folder + "': Destination directory '" + path + "' does not exist</p>";

            }
            
        } else if (pwd[1].hasOwnProperty(folderName)) { // if a folder by this name exists in the pwd

            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme.text + "'>mkdir: cannot create '" + folderName + "': Directory already exists</p>";

        } else {

            pwd[1][folderName] = {files: []};
            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme.text + "'>Directory called '" + folderName + "' successfully created.</p>";
            terminal.save.fs();

        }
    },
    // -----------------------------------------------------------------------
    // Change directory
    // -----------------------------------------------------------------------
    cd: function() {
        var dirObject;
        var directory = commandArgs.slice(1).join(" ");
        
        if (directory == "..") { // if the argument is ..

            var currentDir = pwd[2]; // currentDir is set to the pwd display string
            var le = pwd[2].length - 1; // le is set to the last index of currentDir
            
            while(currentDir.charAt(le) !== '/') { // so long as the last index of currentDir isn't a /
                currentDir = currentDir.substr(0, le); // remove the last index of currentDir
                le--; // decrement le
            }
            
            currentDir = currentDir.substr(0, le); // remove the /
            dirObject = pathStringToObject(currentDir); // convert the string currentDir to the object it represents
            
            if (dirObject !== undefined) { // if pathStringToObject returned an object
                
                output.innerHTML += outputHTML;
                pwd = [currentDir, dirObject, currentDir]; // set pwd alias, object, and display
                commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.user + "$ "; // commandLine set to represent new pwd
                
            }

        } else if (pwd[1].hasOwnProperty(directory)) { // if the argument is a key of the pwd
                  
            var reldir = pwd[2] + "/" + directory; // add the argument to the pwd display string
            dirObject = pathStringToObject(reldir);
            
            output.innerHTML += outputHTML;
            pwd = [reldir, dirObject, reldir];
            commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.user + "$ ";
        
        } else { // if the argument is an absolute path, || not .. / relative

            dirObject = pathStringToObject(directory);
            
            if (dirObject !== undefined) {
                
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
    // Open Youtube in a new tab. Methods: defaultCase, s
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
    // List the files and folders of the pwd. Methods: defaultCase, l
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
                output.innerHTML += "<p style='color:" + termtheme.text + "'>Help information..</p>";
                
            } else {
                
                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>ls: invalid option '" + flag + "'</p><p style='color:" + termtheme.text + "'>Try 'ls --help' for more information.</p>";
            
            }
        }
    },
    // -----------------------------------------------------------------------
    // If file exists in pwd, delete it. Methods: defaultCase, r
    // -----------------------------------------------------------------------
    rm: {
        defaultCase: function() {
            
            var fileBool,
                dirObject,
                file,
                path,
                fileObject,
                files,
                index;
            var fileName = commandArgs[1];
            
            if (fileName[0] === "/") { // if the file is located elsewhere in the fs
            
                returns = getPreDirectory(fileName);
                dirObject = returns[0];
                file = returns[1];
                path = returns[2];

                if (dirObject !== null && typeof dirObject === 'object') {
                    
                    files = dirObject.files;
                    fileBool = dirSearchFiles(dirObject, files);

                    if (fileBool) {
                        
                        fileObject = getFile(file, dirObject);
                        index = files.indexOf(fileObject);
                        files.splice(index, 1);
                        output.innerHTML += outputHTML;
                        terminal.save.fs();

                    } else {

                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>rm: cannot delete '" + file + "': File does not exist</p>";
                        
                    }
                    
                } else { // if the provided location for the folder's creation was not a place in the fs

                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>rm: cannot delete '" + file + "': Directory '" + path + "' does not exist</p>";

                }
            } else {
            
                var files = pwd[1].files;
                var file = getFile(fileName, files); // retrieve file with the provided fileName

                if (file !== null && typeof file === 'object') { // if getFile retrieved a file

                    var index = files.indexOf(file); // determine index of that file

                    files.splice(index, 1); // remove it from the files array

                    output.innerHTML += outputHTML;

                    terminal.save.fs();

                } else {

                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>rm: cannot remove '" + fileName + "': File does not exist</p>";

                }
            }
        },
        r: function() {
            var keys,
                dirObject,
                folder,
                path,
                returns,
                dirKeys;
            var folderName = commandArgs[2];
            
            if (folderName[0] === "/") { // if the folder is located elsewhere in the fs
                
                returns = getPreDirectory(folderName);
                dirObject = returns[0];
                folder = returns[1];
                path = returns[2];

                if (dirObject !== null && typeof dirObject === 'object') {
                    keys = Object.keys(dirObject);

                    if (dirObject.hasOwnProperty(folder)) {
                        
                        delete dirObject[folder];
                        output.innerHTML += outputHTML;
                        terminal.save.fs();

                    } else {

                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>rm: cannot remove '" + folder + "': No such directory</p>";
                        
                    }
                } else {
                    
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>rm: cannot delete '" + folder + "': Directory '" + path + "' does not exist</p>";

                }
            } else {
                
                dirKeys = Object.keys(pwd[1]);

                if(dirKeys.indexOf(folderName) != -1) {

                    delete pwd[1][folderName];

                    output.innerHTML += outputHTML;

                    terminal.save.fs();

                } else {

                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>rm: cannot remove '" + folderName + "': No such directory</p>";

                }
            }
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

                    terminal.save.fs();
                    
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
                
                terminal.save.fs();

            } else { // if arg2 wasn't a valid place in the fs
                
                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + filedir + "': Destination directory does not exist</p>";
            
            }
        }
        
        if (dir === undefined && fil === undefined) { // if arg1 wasn't a file or folder
            
            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + filedir + "': No such file or directory</p>";
        
        }
    },
    // -----------------------------------------------------------------------
    // Copy. Methods: defaultCase, r
    // -----------------------------------------------------------------------
    cp: {
        defaultCase: function() {
        
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

                        terminal.save.fs();

                    } else {

                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + file1 + "': The destination directory does not exist</p>";

                    }

                } else { // if the file isn't being relocated, rename it

                    if (file1 !== destination) {

                        newFile.name = destination;
                        newFile.shortname = destination;
                        newFile.created = new Date();
                        newFile.modified = new Date();

                        files.push(newFile); // and push it the files array

                        output.innerHTML += outputHTML;

                        terminal.save.fs();

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
        r: function() {
            
            var folder1 = commandArgs[2];
            var destination = commandArgs[3];
            
            if (pwd[1].hasOwnProperty(folder1)) { // if the folder to be copied exists
            
                var dirObject = pwd[1][folder1];
                var newFolder = JSON.parse(JSON.stringify(dirObject));
                
                if (destination[0] === "/") { // if the folder is being relocated
                    
                    var destDirObj = pathStringToObject(destination);
                    
                    if (destDirObj !== null && typeof destDirObj === 'object') { // if it is a location in the fs

                        destDirObj[folder1] = newFolder;

                        output.innerHTML += outputHTML;

                    } else {

                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + folder1 + "': The destination folder does not exist</p>";

                    }

                } else { // if the folder isn't being relocated

                    if (pwd[1].hasOwnProperty(destination)) { // if the destination folder exists, add the source folder to it
                        
                        pwd[1][destination][folder1] = newFolder;
                        
                        output.innerHTML += outputHTML;

                    } else { // if the destination folder doesn't exist, create it

                        pwd[1][destination] = newFolder;
                        
                        output.innerHTML += outputHTML;
                        
                    }
                }
            }
        }
    },
    // -----------------------------------------------------------------------
    // If file doesn't exist in pwd, create it
    // -----------------------------------------------------------------------
    touch: function() {
        
        var files,
            fileBool,
            returns,
            dirObject,
            file,
            path,
            newFile;
        var fileName = commandArgs.slice(1).join(" ");
        
        
        if (fileName[0] === "/") { // if the destination folder is located elsewhere in the fs
            
            returns = getPreDirectory(fileName);
            dirObject = returns[0];
            file = returns[1];
            path = returns[2];
            
            if (dirObject !== null && typeof dirObject === 'object') { // if it is a location in the fs
                files = dirObject.files;
                fileBool = dirSearchFiles(file, files);
            
                if (fileBool) { // if the folder to be copied exists
            
                    output.innerHTML += outputHTML;                
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>touch: cannot create file '" + file + "': File already exists in '" + path + "'</p>";
                    
                } else {
                
                    newFile = new terminal.File(file, file, " ", " ");

                    files.push(newFile);

                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>File called '" + file + "' successfully created in '" + path + "'</p>";

                    terminal.save.fs();

                }
            } else {

                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>touch: cannot create file '" + file + "': Destination directory '" + path + "' does not exist</p>";

            }
            
        } else {
            
            files = pwd[1].files;
            fileBool = dirSearchFiles(fileName, files);
            
            if (fileBool === true) {

                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>touch: cannot create file '" + fileName + "': File already exists</p>";

            } else {

                newFile = new terminal.File(fileName, fileName, " ", " ");

                files.push(newFile);

                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>File called '" + fileName + "' successfully created.</p>";

                terminal.save.fs();

            }
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
      
        var part1,
            returns;
        var completions = [];
        var commandInput = input.value;
        var commandArgs = commandInput.split(" ");
        
        if (commandInput.length > 0) {
            
            if (commandArgs.length === 1) {
                
                for (var command in commands) {
                    
                    if (commands[command].substring(0, commandInput.length) === commandInput) {

                        completions.push(commands[command]);

                    }
                }
                
                if (completions[0] !== undefined && completions[1] === undefined) {
                    
                    input.value = completions[0] + " ";
                    input.size = completions[0].length + 1;
                    
                }
                
            } else if (commandArgs.length === 2) {
                
                if (commandArgs[1][0] === "/") {
                    
                    returns = tabFull(commandArgs[1]);
                    completions = returns[0];
                    part1 = returns[1];
                    
                    if (completions[0] !== undefined && completions[0] !== "files" && completions[1] === undefined) {

                        input.value = commandArgs[0] + " " + part1 + completions[0];
                        input.size = input.value.length + 1;

                    }
                } else { // try to complete relative paths to files or folders
                    
                    completions = tabRelative(commandArgs[1]);
                    
                    if (completions[0] !== undefined && completions[0] !== "files" && completions[1] === undefined) {

                        input.value = commandArgs[0] + " " + completions[0];
                        input.size = input.value.length + 1;

                    }
                }
                
            } else if (commandArgs.length === 3) {
                if (commandArgs[2][0] === "/") {
                    
                    returns = tabFull(commandArgs[2]);
                    completions = returns[0];
                    part1 = returns[1];

                    if (completions[0] !== undefined && completions[0] !== "files" && completions[1] === undefined) {

                        input.value = commandArgs[0] + " " + commandArgs[1] + " " + part1 + completions[0];
                        input.size = input.value.length + 1;

                    }
                } else {
                    
                    completions = tabRelative(commandArgs[2]);
                    
                    if (completions[0] !== undefined && completions[0] !== "files" && completions[1] === undefined) {

                        input.value = commandArgs[0] + " " + commandArgs[1] + " " + completions[0];
                        input.size = input.value.length + 1;

                    }
                }
            } else {
                if (commandArgs[3][0] === "/") {
                    
                    returns = tabFull(commandArgs[3]);
                    completions = returns[0];
                    part1 = returns[1];

                    if (completions[0] !== undefined && completions[0] !== "files" && completions[1] === undefined) {

                        input.value = commandArgs[0] + " " + commandArgs[1] + " " + commandArgs[2] + " " + part1 + completions[0];
                        input.size = input.value.length + 1;

                    }
                } else {
                    
                    completions = tabRelative(commandArgs[3]);
                    
                    if (completions[0] !== undefined && completions[0] !== "files" && completions[1] === undefined) {

                        input.value = commandArgs[0] + " " + commandArgs[1] + " " + commandArgs[2] + " " + completions[0];
                        input.size = input.value.length + 1;

                    }
                }
            }
        }
    },
    // -----------------------------------------------------------------------------------------
    // Text Editor. Methods: run, save, changePrompt, hidePrompt, showPrompt, resetEditor, exit
    // -----------------------------------------------------------------------------------------
    editor: {
        editor: document.getElementById("editor"),
        textArea: document.getElementById("editorText"),
        footer: document.getElementById("editorFooter"),
        footerNav: document.getElementById("footerNav"),
        highlight: document.getElementsByClassName("highlight"),
        header: document.getElementById("editorHeader"),
        savePrompt: document.getElementById("savePrompt"),
        prompting: false,
        currentFile: undefined,
        run: function (file) { // startup editor passing in optional file name ... NEED TO ADD ACTUAL FILE LOAD
            var fileName,
                files,
                fileData;

            if ( file ) { 

                terminal.editor.header.innerHTML = file;                    
                fileName = file;
                files = pwd[1].files;
                fileData = getFile(fileName, files); // retrieve file with the provided fileName
                terminal.editor.currentFile = fileData;
                terminal.editor.textArea.value = fileData.content;

            } else { terminal.editor.header.innerHTML = "new buffer"; }

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

            var file = terminal.editor.currentFile;
            var newContent = terminal.editor.textArea.value;

            if ( file ) { file.content = newContent; } // if working with existing file save updated version
            

            // else { // THIS IS SLOPPY ... create and save new file

            //     var shortname = fileName.slice(0, -4);
            //     var extension = fileName.slice(-4, fileName.length);
            //     var content = terminal.editor.textArea.value;
            //     terminal.fs.home.user.files.push(""); // add empty array item
            //     terminal.fs.home.user.files[terminal.fs.home.user.files.length - 1] = new terminal.File(fileName, shortname, content, extension); // save file to empty array item
            
            // }

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
            terminal.editor.currentFile = undefined;
            terminal.commandLine.focus();
        },
        exit: function (save) { // exit editor and call save if true

            var fileName = terminal.editor.header.innerHTML;

            if ( fileName = "new buffer" ) { terminal.editor.changePrompt(); }

            if ( save ) { terminal.editor.save(fileName); terminal.editor.resetEditor(); }

            if ( ! save ) { terminal.editor.resetEditor(); }

            input.focus();

        }
    },
    // -----------------------------------------------------------------------
    // Save. Methods: settings, fs
    // -----------------------------------------------------------------------
    save: {
        settings: function () {
            saveItemToLocalStorage(terminal.userSettings, 'settings');
        },
        fs: function () {
            saveItemToLocalStorage(terminal.fs, 'fs');
        }
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
        info: "Remove the provided file<br>rm [file]<br>ex. rm readme.txt<br>Remove the provided directory<br>rm -r [directory]<br>ex. rm -r documents"
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
        info: "Output a list of the files and directories in the present working directory<br>ls<br>Output in long format<br>ls -l"
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
        info: "Create a new directory in the present working directory<br>mkdir [directory]<br>ex. mkdir Pictures"
    },
    "cp": {
        name: "cp",
        info: "Copy a file<br>cp [file] [destination]<br>ex. cp readme.txt /home/user/desktop<br>cp [file] [newName]<br>ex. cp readme.txt readme2.txt<br>Copy a directory<br>cp -r [directory] [destination]<br>ex. cp -r downloads desktop"
    },
    "mv": {
        name: "mv",
        info: "Move (cut and paste) a file or directory<br>mv [file] [destination]<br>ex. mv readme.txt /home/user/desktop<br>mv [directory] [destination]<br>ex. mv Documents /home/user/Desktop"
    }
};
var commands = Object.keys(helpList);
var pwd = ["~", terminal.fs.home.user, "/home/user"];
var input = document.getElementById("input");
var histindex = 0;
var count = 0;
var termtheme = terminal.termthemes[terminal.themeDefault];
var commandArgs;
var outputHTML;


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

function tabFull(full) {
    var part1,
        dirObject,
        files,
        keys;
    var completions = [];
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
        keys = Object.keys(dirObject);
    }

    for (var key in keys) {
        if (keys[key].substring(0, part2.length) === part2) {
            completions.push(keys[key]);
        }
    }
    
    files = dirObject.files;

    for (var file in files) {
        if (files[file]["name"].substring(0, part2.length) === part2) {
            completions.push(files[file]["name"]);
        }
    }
    return [completions, part1];
}

function tabRelative(full) {
    var completions = [];
    var keys = Object.keys(pwd[1]);
    var files = pwd[1].files;

    for (var key in keys) {

        if (keys[key].substring(0, full.length) === full) {

            completions.push(keys[key]);

        }
    }

    for (var file in files) {

        if (files[file]["name"].substring(0, full.length) === full) {

            completions.push(files[file]["name"]);

        }

    }
    
    return completions;
}

function getPreDirectory(directory) {
    
    var full = directory;
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
    
    return [dirObject, part2, part1];
    
}

function getDirectory(directory) {
    var currentDir = pwd[2] + "/" + directory;
    var dirObject = pathStringToObject(currentDir);
    return dirObject;
}

function index(obj,is, value) {
    if (typeof is == 'string') { return index(obj, is.split('.'), value); }

    else if (is.length === 1 && value !== undefined) { return obj[is[0]] = value; }

    else if (is.length === 0) { return obj; }

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

function addToHistory(command) {
    
    if (terminal.hist.slice(-1) != command) {
        
        terminal.hist.push(command);
        terminal.userSettings.hist = terminal.hist;
        terminal.save.settings();
        
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
            keyString;

        if ( localStorage.getItem(keyname) ) {  //if note exists in localStorage get it and parse from string to object.

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
                        terminal.rm.defaultCase();
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
                        
                    case "rm -r":
                        terminal.rm.r();
                        addToHistory(command);
                    break;

                    case "theme -set":
                        terminal.theme.set(commandArgs[2]);
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
            
            if (commandArgs[0] === "mv") {
                terminal.mv();
                addToHistory(command);
            }
            
            if (commandArgs[0] + " " + commandArgs[1] === "cp -r") {
                
                terminal.cp.r();
                addToHistory(command);
                
            } else if (commandArgs[0] === "cp") {
                
                terminal.cp.defaultCase();
                addToHistory(command);
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

// load user fs and settings
terminal.init();