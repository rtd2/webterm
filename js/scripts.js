// LOCAL VARS
var commands,
    pwd,
    input,
    histindex,
    count,
    termtheme,
    commandArgs,
    outputHTML,
    terminal,
    helplist;


// START TERMINAL

terminal = {

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
                            "created": "",
                            "modified": ""
                        },
                        {
                            "name": "urmum.txt",
                            "shortname": "urmum",
                            "content": "I have content",
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
                            "created": "",
                            "modified": ""
                        },
                        {
                            "name": "document.txt",
                            "shortname": "document",
                            "content": "I am content",
                            "created": "",
                            "modified": ""
                        },
                        {
                            "name": "another.txt",
                            "shortname": "another",
                            "content": "I am content",
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
            },
        "bin": { "files": [] },
        "files": []
        }
    },
// -----------------------------------------------------------------------
// MORE TERMINAL PROPERTIES
// -----------------------------------------------------------------------
    "userSettings": {
        "hist": [],
        "user": "user",
        "lastLogin": "",
        "themeDefault": "black"
    },
    "settings": {
        "hist": [],
        "user": "user",
        "lastLogin": "",
        "themeDefault": "black"
    },
    ver: "0.6",
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
            commandLine: "#000080"
        },
        black: {
            background: "#222",
            text: "#F9F9F9",
            file: "#AAA",
            folder: "#659EF9",
            commandLine: "#8BFA7F"
            //font: "'Lucida Console', Monaco, monospace"
        }
    },
    commandLine: document.getElementById("commandLine"),
    // -----------------------------------------------------------------------
    // load and apply user settings and fs
    // -----------------------------------------------------------------------
    init: function () {

        var d = new Date(),
            date = d.toString(),
            oldDate;

        if ( getItemFromLocalStorage('signin') ) {

            if ( getItemFromLocalStorage('fs') ) { //load and apply user fs

                terminal.fs = getItemFromLocalStorage('fs');
                pwd[1] = terminal.fs.home.user;

            }

            if ( getItemFromLocalStorage('settings') ) {

                terminal.userSettings = getItemFromLocalStorage('settings'); // load settings: history, user, last login, theme
                termtheme = terminal.termthemes[terminal.userSettings.themeDefault];
                terminal.theme.updateDom();
                terminal.settings.hist = terminal.userSettings.hist;
                oldDate = terminal.userSettings.lastLogin;
                terminal.userSettings.lastLogin = date;

            }

            output.innerHTML = "<p style='color:" + termtheme.text + " '>Welcome back " + terminal.userSettings.user + ". Last login " + oldDate + ".";
            terminal.save.settings();

        } else { 
            output.innerHTML = "<p style='color:" + termtheme.text + " '>Welcome to the terminal on the web. Type help for a list of commands.";
            terminal.settings.lastLogin = date;
            terminal.theme.updateDom();
        }

        // set event listeners
        input.addEventListener("keyup", checkCommand, false);
        input.addEventListener("keydown", tab, false);
        document.getElementsByTagName('body')[0].addEventListener('click', setCommandLineFocus, false);
        terminal.editor.textArea.addEventListener("keyup", textEditor, false);
        
    },
    // -----------------------------------------------------------------------
    // New file constructor
    // -----------------------------------------------------------------------
    File: function (name, shortname, content) {

        this.name = name;
        this.shortname = shortname;
        this.content = content;
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
        list: function() { // list each command
            var displayCommands = "";

            for (var i = 0; i < commands.length; i++) {

                displayCommands += "<p style='color:" + termtheme.text + "'>" + commands[i] + "</p>";

            }

            output.innerHTML += outputHTML;
            output.innerHTML += displayCommands;
        },
        info: function() { // show the help info for a command
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
    man: function () {
        var query = commandArgs[1];
            if (commands.indexOf(query) != -1) {
                
                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>" + helpList[query].info + "</p>";
                
            } else {
                
                output.innerHTML += outputHTML;
                output.innerHTML += "<p style='color:" + termtheme.text + "'>No command '" + query + "' found. Type 'help' for a list of commands.</p>";

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
            var theme = commandArgs.slice(1).join(" "),
                themes = Object.keys(terminal.termthemes),
                themeList,
                displayThemes = themes.join(", ");
            
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
                
                themeList = "";
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
            var spans,
                putNodes,
                i,
                t;

            document.body.style.background = termtheme.background;
            input.style.color = termtheme.text;
            input.style.background = termtheme.background;
            commandLine.style.color = termtheme.commandLine;

            putNodes = output.childNodes;
            for (i = 0; i < putNodes.length; i++) {
                putNodes[i].style.color = termtheme.text;
            }

            spans = document.querySelectorAll("#output > p > span");
            for (t = 0; t < spans.length; t++) {
                spans[t].style.color = termtheme.commandLine;
            }

        },
        set: function (theme) {
            terminal.settings.themeDefault = theme;
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

        terminal.settings.user = user;
        terminal.userSettings.user = user;
        commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.settings.user + "$ ";
        output.innerHTML += outputHTML;
        terminal.save.settings();
        saveItemToLocalStorage(user, 'signin'); //create signin key

    },
    // -----------------------------------------------------------------------
    // Change the terminal's user back to default
    // -----------------------------------------------------------------------
    signout: function() {

        terminal.settings.user = "user";
        commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.settings.user + "$ ";
        output.innerHTML += outputHTML;
        removeItemFromLocalStorage('signin');//delete signin key

    },
    // -----------------------------------------------------------------------
    // Output the terminal history array
    // -----------------------------------------------------------------------
    history: function() {
        var item,
            count = 1 ,
            hist = terminal.settings.hist;

        output.innerHTML += outputHTML;

        for (item in hist) {
            output.innerHTML += "<p style='color:" + termtheme.text + "'>" + count + "  " + hist[item] + "</p>";
            count ++;
        }
    },
    // -----------------------------------------------------------------------
    // Output the version of the terminal
    // -----------------------------------------------------------------------
    version: function() {
        output.innerHTML += outputHTML;
        output.innerHTML += "<p style='color:" + termtheme.text + "'>WebTerm version " + terminal.ver + "</p>";
    },
    // -----------------------------------------------------------------------
    // If the folder doesn't exist in pwd, create it
    // -----------------------------------------------------------------------
    mkdir: function() {
        var returns,
            folder,
            path,
            dirObject,
            folderName = commandArgs[1];
        
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
        var dirObject,
            currentDir,
            reldir,
            le,
            directory = commandArgs.slice(1).join(" ");
        
        if (directory == "..") { // if the argument is ..

            currentDir = pwd[2]; // currentDir is set to the pwd display string
            le = currentDir.length - 1; // le is set to the last index of currentDir
            
            while(currentDir.charAt(le) !== '/') { // so long as the last index of currentDir isn't a /
                currentDir = currentDir.substr(0, le); // remove the last index of currentDir
                le--; // decrement le
            }
            
            currentDir = currentDir.substr(0, le); // remove the /
            dirObject = pathStringToObject(currentDir); // convert the string currentDir to the object it represents
            
            if (dirObject !== undefined) { // if pathStringToObject returned an object
                
                output.innerHTML += outputHTML;
                pwd = [currentDir, dirObject, currentDir]; // set pwd alias, object, and display
                commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.settings.user + "$ "; // commandLine set to represent new pwd
                
            }

        } else if (pwd[1].hasOwnProperty(directory)) { // if the argument is a key of the pwd
                  
            reldir = pwd[2] + "/" + directory; // add the argument to the pwd display string
            dirObject = pathStringToObject(reldir);
            
            output.innerHTML += outputHTML;
            pwd = [reldir, dirObject, reldir];
            commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.settings.user + "$ ";
        
        } else { // if the argument is an absolute path, || not .. / relative

            dirObject = pathStringToObject(directory);
            
            if (dirObject !== undefined) {
                
                output.innerHTML += outputHTML;
                pwd = [directory, dirObject, directory];
                commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.settings.user + "$ ";
                
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
            var base = "https://www.youtube.com/results?search_query=",
                term = "",
                url,
                i;

            output.innerHTML += outputHTML;

            for (i = 2; i < commandArgs.length; i++) {

                term += commandArgs[i] + "%20";

            }

            term = term.slice(0,-3); // remove extra %20

            if (term !== "") {

                url = base + term;
                window.open(url, '_blank');

            } else { output.innerHTML += "<p style='color:" + termtheme.text + "'>Please indicate a search query.</p>"; }
        }
        
    },
    // -----------------------------------------------------------------------
    // Open Github repo in a new tab.
    // -----------------------------------------------------------------------
    github: function() {
            output.innerHTML += outputHTML;
            window.open('https://github.com/rtd2/webterm','_blank');
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
            var key,
                file,
                list = "",
                keys = Object.keys(pwd[1]),
                files = pwd[1].files;

            for (key in keys) {

                if (keys[key] !== "files") {

                    list += "<p class='folder' style='color:" + termtheme.folder + "'>" + keys[key] + "</p>";

                }

            }

            for (file in files) {

                list += "<p class='file' style='color:" + termtheme.file + "'>" + files[file]["name"] + "</p>";

            }

            output.innerHTML += outputHTML;
            output.innerHTML += list;
            
            if ( list === "" ) { output.innerHTML += "<p style='color:" + termtheme.text + "'>ls: The current directory is empty</p>"; }
        },

        l: function() {
            
            var list,
                keys,
                files,
                key,
                file,
                flag = commandArgs.slice(1).join(" ");
            
            if (flag === "-l") {
                
                list = "";
                keys = Object.keys(pwd[1]);
                files = pwd[1].files;

                for (key in keys) {

                    if (keys[key] !== "files") {

                        list += "<p class='folder' style='display: block; color:" + termtheme.folder + "'>" + keys[key] + "</p>";

                    }

                }

                for (file in files) {

                    list += "<p class='file' style='display: block; color:" + termtheme.file + "'>" + files[file]["name"] + "</p>";

                }

                output.innerHTML += outputHTML;
                output.innerHTML += list;
                
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
                index,
                fileName = commandArgs[1];
            
            if (fileName[0] === "/") { // if the file is located elsewhere in the fs
            
                returns = getPreDirectory(fileName);
                dirObject = returns[0];
                file = returns[1];
                path = returns[2];

                if (dirObject !== null && typeof dirObject === 'object') {
                    
                    files = dirObject.files;
                    fileBool = dirSearchFiles(file, files);

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
            
                files = pwd[1].files;
                file = getFile(fileName, files); // retrieve file with the provided fileName

                if (file !== null && typeof file === 'object') { // if getFile retrieved a file

                    index = files.indexOf(file); // determine index of that file

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
                dirKeys,
                folderName = commandArgs[2];
            
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
        
        var source = commandArgs[1],
            destination = commandArgs[2],
            error = false,
            srcReturns,
            srcObject,
            srcFile,
            srcPath,
            srcFileObject,
            srcDirObject,
            srcFiles,
            destReturns,
            destObject,
            destFile,
            destPath,
            destFiles,
            index,
            newFile;
            
        if (source !== destination) {
            if (source[0] === "/") { // source is an absolute path
                srcReturns = getPreDirectory(source);
                srcObject = srcReturns[0]; // the object provided file or directory should exist in
                srcFile = srcReturns[1]; // the file or directory
                srcPath = srcReturns[2]; // a path that represents the source object

                if (srcObject !== null && typeof srcObject === 'object') { // source object exists

                    srcFiles = srcObject.files;

                    if (dirSearchFiles(srcFile, srcFiles)) { // file exists
                        srcFileObject = getFile(srcFile, srcFiles);

                    } else if (srcObject.hasOwnProperty(srcFile)) { // directory exists
                        srcDirObject = srcObject[srcFile];

                    } else {
                        error = true;
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + srcFile + "': No such file or directory</p>";
                    }

                } else { // error source object doesn't exist
                    error = true;
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + srcFile + "': No such file or directory</p>";
                }

            } else { // source is a relative path
                srcObject = pwd[1];
                srcFile = source;
                srcPath = pwd[2];
                srcFiles = srcObject.files;

                if (dirSearchFiles(srcFile, srcFiles)) { // is it a file
                    srcFileObject = getFile(srcFile, srcFiles);

                } else if (srcObject.hasOwnProperty(srcFile)) { // or a folder
                    srcDirObject = srcObject[srcFile];

                } else { // error the file or folder doesn't exist
                    error = true;
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + srcFile + "': No such file or directory</p>";
                }
            } // done with argument one, srcFileObject or srcDirObject has variable prepared

            if (destination[0] === "/" && error === false) { // destination is an absolute path
                destReturns = getPreDirectory(destination);
                destObject = destReturns[0];
                destFile = destReturns[1];
                destPath = destReturns[2];
                dest = pathStringToObject(destination);

                if (dest !== null && typeof dest === 'object') { // destination object exists

                    destFiles = dest.files;

                    if (dirSearchFiles(srcFile, destFiles)) { // error, file by the same name already exists in destination
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + srcFile + "': File with the same name already exists in destination directory</p>";

                    } else if (dest.hasOwnProperty(srcFile)) { // error, directory by the same name already exists in destination
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + srcFile + "': Directory with the same name already exists in destination directory</p>";

                    } else if (srcFileObject === undefined && typeof srcDirObject === 'object') {
                        dest[srcFile] = srcDirObject; // add the arg1 directory to the destination directory
                        delete srcObject[srcFile]; // remove arg1 directory from pwd

                        output.innerHTML += outputHTML;
                        terminal.save.fs();

                    } else if (typeof srcFileObject === 'object' && srcDirObject === undefined) {
                        index = srcFiles.indexOf(srcFileObject);
                        newFile = JSON.parse(JSON.stringify(srcFileObject)); // copy source file object

                        srcFiles.splice(index, 1); // remove arg1 file from pwd files
                        destFiles.push(newFile); // add it to the destination folder's files

                        output.innerHTML += outputHTML;
                        terminal.save.fs();
                    }

                } else if (destObject !== null && typeof destObject === 'object') {

                    if (dirSearchFiles(destFile, destObject.files)) { // error, file by the same name already exists in destination
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + srcFile + "': File with the same name already exists in destination directory</p>";

                    } else if (destObject.hasOwnProperty(destFile)) { // error, directory by the same name already exists in destination
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + srcFile + "': Directory with the same name already exists in destination directory</p>";

                    } else if (srcFileObject === undefined && typeof srcDirObject === 'object') {
                        destObject[destFile] = srcDirObject; // add the arg1 directory to the destination directory
                        delete srcObject[srcFile]; // remove arg1 directory from pwd

                        output.innerHTML += outputHTML;
                        terminal.save.fs();

                    } else if (typeof srcFileObject === 'object' && srcDirObject === undefined) {
                        index = srcFiles.indexOf(srcFileObject);
                        newFile = JSON.parse(JSON.stringify(srcFileObject)); // copy source file object
                        newFile.name = destFile;
                        newFile.shortname = destFile;
                        newFile.created = new Date();
                        newFile.modified = new Date();

                        srcFiles.splice(index, 1); // remove arg1 file from pwd files
                        destObject.files.push(newFile); // add it to the destination folder's files

                        output.innerHTML += outputHTML;
                        terminal.save.fs();
                    }

                } else { // error destination object doesn't exist
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + srcFile + "': Destination directory '" + destination + "' does not exist</p>";

                }

            } else if (error === false) { // destination is a relative path
                destObject = getDirectory(destination);
                destFile = destination;
                destPath = pwd[2];

                if (destObject !== null && typeof destObject === 'object') { // if destination provided is a key of the pwd
                    destFiles = destObject.files;

                    if (dirSearchFiles(srcFile, destFiles)) { // error, file by the same name already exists in destination
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + srcFile + "': File with the same name already exists in destination directory</p>";

                    } else if (destObject.hasOwnProperty(srcFile)) { // error, directory by the same name already exists in destination
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + srcFile + "': Directory with the same name already exists in destination directory</p>";

                    } else if (srcFileObject === undefined && typeof srcDirObject === 'object') { // the source is a directory
                        destObject[srcFile] = srcDirObject; // add the source directory to the destination directory
                        delete srcObject[srcFile]; // delete the source directory object

                        output.innerHTML += outputHTML;
                        terminal.save.fs();

                    } else if (typeof srcFileObject === 'object' && srcDirObject === undefined) { // the source is a file
                        index = srcFiles.indexOf(srcFileObject); // determine index of source file object
                        newFile = JSON.parse(JSON.stringify(srcFileObject)); // copy source file object

                        srcFiles.splice(index, 1); // remove arg1 file from pwd files
                        destFiles.push(newFile); // add it to the destination folder's files

                        output.innerHTML += outputHTML;
                        terminal.save.fs();

                    }

                } else {

                    if (srcFileObject === undefined && typeof srcDirObject === 'object') { // the source is a directory
                        pwd[1][destFile] = srcDirObject; // add the source directory to the destination directory
                        delete srcObject[srcFile]; // delete the source directory object

                        output.innerHTML += outputHTML;
                        terminal.save.fs();

                    } else if (typeof srcFileObject === 'object' && srcDirObject === undefined) { // the source is a file
                        index = srcFiles.indexOf(srcFileObject); // determine index of source file object
                        newFile = JSON.parse(JSON.stringify(srcFileObject)); // copy source file object
                        newFile.name = destFile;
                        newFile.shortname = destFile;
                        newFile.created = new Date();
                        newFile.modified = new Date();

                        srcFiles.splice(index, 1); // remove arg1 file from pwd files
                        destFiles.push(newFile); // add it to the destination folder's files

                        output.innerHTML += outputHTML;
                        terminal.save.fs();

                    }

                }
            }
        } else {
            output.innerHTML += outputHTML;
            output.innerHTML += "<p style='color:" + termtheme.text + "'>mv: cannot move '" + source + "' to a subdirectory of itself";
        }
    },
    // -----------------------------------------------------------------------
    // Copy. Methods: defaultCase, r
    // -----------------------------------------------------------------------
    cp: {
        defaultCase: function() {
            var newFile,
                fileObject,
                srcPath,
                srcObject,
                srcFile,
                srcReturns,
                destPath,
                destObject,
                destFile,
                destReturns,
                destDirObj,
                file = commandArgs[1],
                destination = commandArgs[2];
            
            if (file[0] === "/") { // arg1, absolute path
                
                srcReturns = getPreDirectory(file);
                srcObject = srcReturns[0];
                srcFile = srcReturns[1];
                srcPath = srcReturns[2];

                if (srcObject !== null && typeof srcObject === 'object') {
                    
                    srcFiles = srcObject.files;

                    if (dirSearchFiles(srcFile, srcFiles)) { // file exists, copy it
                        
                        srcObject = getFile(srcFile, srcFiles);
                        newFile = JSON.parse(JSON.stringify(srcObject));

                    } else { // error, file to be copied doesn't exist

                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + srcFile + "': File does not exist</p>";
                        
                    }
                    
                } else { // if the provided location for the folder's creation was not a place in the fs

                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + srcFile + "': Directory '" + srcPath + "' does not exist</p>";

                }
                
            } else { // arg1, relative path
                
                srcFiles = pwd[1].files;
                srcFile = file;

                if (dirSearchFiles(file, srcFiles)) { // if the file exists

                    fileObject = getFile(file, srcFiles); // retrieve it
                    newFile = JSON.parse(JSON.stringify(fileObject)); // copy it

                } else {

                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + file + "': No such file</p>";

                }
            }
            
            if (destination[0] === "/") { // arg2, absolute path, if the file is being relocated
                
                //problematic if destination directory is the pwd, new file of same name in same directory  
                
                destDirObj = pathStringToObject(destination); // convert the provided string to the location it represents
                destReturns = getPreDirectory(destination); // in case the destination provided includes a new name
                destObject = destReturns[0];
                destFile = destReturns[1];
                destPath = destReturns[2];
                
                if (destObject.hasOwnProperty(destFile)) {
                    destFiles = destDirObj.files;
                    
                    if (dirSearchFiles(srcFile, destFiles)) { // error, the file already exists in the destination folder
                        
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + srcFile + "': File '" + srcFile + "' already exists in destination directory</p>";

                    } else {
                        
                        destFiles.push(newFile);
                        output.innerHTML += outputHTML;
                        terminal.save.fs();
                    
                    }
                    
                } else if (dirSearchFiles(destFile, destObject.files)) {
                    
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + srcFile + "': File '" + srcFile + "' already exists in '" + destPath + "'</p>";

                } else if (destObject !== null && typeof destObject === 'object') {

                    newFile.name = destFile;
                    newFile.shortname = destFile;
                    newFile.created = new Date();
                    newFile.modified = new Date();

                    destObject.files.push(newFile); // and push it the files array
                    
                    output.innerHTML += outputHTML;
                    terminal.save.fs();

                } else {
                    
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + srcFile + "': Directory '" + destPath + "' does not exist</p>";

                }

            } else { // arg2, relative path, if the file isn't being relocated, rename it

                if (file !== destination) {
                    
                    newFile.name = destination;
                    newFile.shortname = destination;
                    newFile.created = new Date();
                    newFile.modified = new Date();

                    destFiles = pwd[1].files;
                    destFiles.push(newFile); // and push it the files array
                    
                    output.innerHTML += outputHTML;
                    terminal.save.fs();

                } else { // error, file of the same name already exists in pwd

                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + file + "': New file must have a different name</p>";

                }
            }
        },
        r: function() {
        
            var source = commandArgs[2],
                destination = commandArgs[3],
                error = false,
                srcReturns,
                srcObject,
                srcFolder,
                srcPath,
                srcDirObject,
                destReturns,
                destObject,
                destFolder,
                destPath,
                dest,
                index,
                newFile;


            if (source[0] === "/") { // source is an absolute path
                srcReturns = getPreDirectory(source);
                srcObject = srcReturns[0]; // the object provided directory should exist in
                srcFolder = srcReturns[1]; // the directory
                srcPath = srcReturns[2]; // a path that represents the source object

                if (srcObject !== null && typeof srcObject === 'object') { // source object exists

                    if (srcObject.hasOwnProperty(srcFolder)) { // directory exists
                        srcDirObject = srcObject[srcFolder];

                    } else {
                        error = true;
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + srcFolder + "': No such directory</p>";
                    }

                } else { // error source object doesn't exist
                    error = true;
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + srcFolder + "': No such directory</p>";
                }

            } else { // source is a relative path
                srcObject = pwd[1];
                srcFolder = source;
                srcPath = pwd[2];


                if (srcObject.hasOwnProperty(srcFolder)) { // or a folder
                    srcDirObject = srcObject[srcFolder];

                } else { // error the file or folder doesn't exist
                    error = true;
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + srcFolder + "': No such directory</p>";
                }
            } // done with argument one, srcDirObject has variable prepared

            if (destination[0] === "/" && error === false) { // destination is an absolute path
                destReturns = getPreDirectory(destination);
                destObject = destReturns[0];
                destFolder = destReturns[1];
                destPath = destReturns[2];
                dest = pathStringToObject(destination);

                if (dest !== null && typeof dest === 'object') { // destination object exists

                    if (dest.hasOwnProperty(srcFolder)) { // error, directory by the same name already exists in destination
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + srcFolder + "': Directory with the same name already exists in destination directory</p>";

                    } else if (typeof srcDirObject === 'object') {
                        dest[srcFolder] = srcDirObject; // add the arg1 directory to the destination directory
                        
                        output.innerHTML += outputHTML;
                        terminal.save.fs();

                    }

                } else if (destObject !== null && typeof destObject === 'object') {

                    if (destObject.hasOwnProperty(destFolder)) { // error, directory by the same name already exists in destination
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + srcFolder + "': Directory with the same name already exists in destination directory</p>";

                    } else if (typeof srcDirObject === 'object') {
                        destObject[destFolder] = srcDirObject; // add the arg1 directory to the destination directory
                        
                        output.innerHTML += outputHTML;
                        terminal.save.fs();
                    }

                } else { // error destination object doesn't exist
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + srcFolder + "': Destination directory '" + destination + "' does not exist</p>";

                }

            } else if (error === false) { // destination is a relative path
                destObject = getDirectory(destination);
                preDestObject = getPreDirectory(pwd[2]);
                destFolder = destination;
                destPath = pwd[2];
                console.log(destObject);
                console.log(preDestObject);

                if (destObject !== null && typeof destObject === 'object') { // if destination provided is a key of the pwd

                    if (destObject.hasOwnProperty(srcFolder)) { // error, directory by the same name already exists in destination
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>cp: cannot copy '" + srcFolder + "': Directory with the same name already exists in destination directory</p>";

                    } else if (typeof srcDirObject === 'object') { // the source is a directory
                        destObject[srcFolder] = srcDirObject; // add the source directory to the destination directory
                        
                        output.innerHTML += outputHTML;
                        terminal.save.fs();

                    }

                } else if (preDestObject[0] !== null && typeof preDestObject[0] === 'object') {
                    
                    pwd[1][destFolder] = srcDirObject; // add the source directory to the destination directory
                        
                    output.innerHTML += outputHTML;
                    terminal.save.fs();
                
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
            newFile,
            fileName = commandArgs.slice(1).join(" ");
        
        
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
                
                    newFile = new terminal.File(file, file, " ");

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

                newFile = new terminal.File(fileName, fileName, " ");

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
            
            histindex = terminal.settings.hist.length;
            
        }

        if (count <= terminal.settings.hist.length - 1) {

            histindex--;
            input.size = terminal.settings.hist[histindex].length + 1;
            input.value = terminal.settings.hist[histindex];
            count++;
            
        }
    },
    // -----------------------------------------------------------------------
    // Cycle from last index of terminal.hist array
    // -----------------------------------------------------------------------
    down: function() {
        
        if (count > 1) {
            
            histindex++;
            input.size = terminal.settings.hist[histindex].length + 1;
            input.value = terminal.settings.hist[histindex];
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
            returns,
            command,
            completions = [],
            commandInput = input.value,
            commandArgs = commandInput.split(" ");
        
        if (commandInput.length > 0) {
            
            if (commandArgs.length === 1) {
                
                for (command in commands) {
                    
                    if (commands[command].substring(0, commandInput.length) === commandInput) {

                        completions.push(commands[command]);

                    }
                }
                
                if (completions[0] !== undefined && completions[1] === undefined) {
                    
                    input.value = completions[0];
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
    // CAT
    // -----------------------------------------------------------------------------------------
    cat: function (file) {
        var fileObj,
            isFile,
            returns,
            fileName,
            dirObj,
            path;

        if (file[0] === "/") {
            returns = getPreDirectory(file);
            dirObj = returns[0];
            fileName = returns[1];
            path = returns[2];

            if (dirObj !== null && typeof dirObj === 'object') { printFile(fileName, dirObj.files); } // if parent directory actually exists in the fs

        } else { printFile(file, pwd[1].files); }

        function printFile(fileName, filesArr) {
            isFile = dirSearchFiles(fileName,filesArr);
            if ( isFile ) {
                    fileObj = getFile(fileName, filesArr);
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>" + fileObj.content + "</p>";   
                } else { 
                    output.innerHTML += outputHTML;
                    output.innerHTML += "<p style='color:" + termtheme.text + "'>" + file + " does not exist.</p>";
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
        run: function (file) { // startup editor passing in optional file name
            var fileName,
                files,
                fileData,
                item,
                i;

            document.getElementsByTagName('body')[0].removeEventListener('click', setCommandLineFocus, false);

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
            for ( i = 0; i < terminal.editor.highlight.length; i++ ) {

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

            if ( file ) { // if working with existing file save updated version
                file.content = newContent; 
                terminal.save.fs();
            } 
            

            else { // create and save new file

                var shortname = fileName.slice(0, fileName.indexOf("."));
                var content = terminal.editor.textArea.value;
                newFile = new terminal.File(fileName, shortname, content); // save file to empty array item
                terminal.fs.home.user.files.push(newFile);
                terminal.save.fs();
            
            }

        },
        changePrompt: function () { // change to file name prompt
            terminal.editor.savePrompt.innerHTML = "File Name to Write: new buffer";
        },
        hidePrompt: function () { // hide save prompt
            terminal.editor.savePrompt.style.display = "none";
            terminal.editor.prompting = false;
        },
        showPrompt: function () { // show save prompt

            terminal.editor.prompting = true;

            terminal.editor.savePrompt.style.display = "inline";
            terminal.editor.footerNav.innerHTML = "<li><span class='highlight'>^Y :</span> Yes</li><li><span class='highlight'>^N :</span> No</li><li><span class='highlight'>^C :</span> Cancel</li>";
            
            // style footer list items. iterate over items with class of highlight and apply styles.
            for ( var i = 0; i < terminal.editor.highlight.length; i++ ) {

                item = terminal.editor.highlight[i];
                item.style.color = termtheme.background;
                item.style.background = termtheme.text;

            }

        },
        resetEditor: function() { // reset editor settings to blank
            document.getElementsByTagName('body')[0].addEventListener('click', setCommandLineFocus,false);
            terminal.editor.editor.style.display = "none"; // hide editor overlay 
            terminal.editor.savePrompt.style.display = "none"; // hide save prompt
            terminal.editor.textArea.value = ""; // reset text area
            terminal.editor.footerNav.innerHTML = "<li><span class='highlight'>^X :</span> Save / Exit</li>";
            terminal.editor.prompting = false;
            terminal.editor.currentFile = undefined;
            terminal.commandLine.focus();
        },
        exit: function (save) { // exit editor and call save if true

            var fileName = terminal.editor.header.innerHTML;

            if ( fileName === "new buffer" ) { terminal.editor.changePrompt(); }

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
        },
        tutorial: function () {
            saveItemToLocalStorage(tutorial.currentStage, 'tutorial');
        }
    },
    tutorial: { // should this be here on in tutorial.js ??

        launch: function () {
            // need to set theme styles ... could we be handling things better in the app by utilizing classes, rather than style changes ??
            terminal.clear();
            tutorial.stageArray = tutorial.stageArrayInit(); // init stageArray variable
            document.getElementsByTagName('body')[0].style.margin ="1em";
            document.getElementById('tutorial').style.display = "block";
            tutorial.current();
            tutorial.on = true;
        },
        exit: function () {
            terminal.clear();
            document.getElementById('tutorial').style.display = "none";
            document.getElementsByTagName('body')[0].style.margin ="0.5em";
            tutorial.on = false;
        }
    }

}; 

// END TERMINAL OBJECT



// START HELPLIST

helpList = {
    "tutorial": {
        name: "tutorial",
        info: "Launch the tutorial. Type 'exit' to quit tutorial when launched."
    },
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
    },
    "cat": {
        name: "cat",
        info: "The 'cat' utility reads files and writes them to the standard output.<br>cat [file]<br>ex. cat readme.txt"
    },
    "man": {
        name: "man",
        info: "Man is a verbose form of help.<br>man [command]<br>man help"
    }
}; 

// END HELPLIST




// SETTING VARIABLES

commands = Object.keys(helpList);
pwd = ["~", terminal.fs.home.user, "/home/user"];
input = document.getElementById("input");
histindex = 0;
count = 0;
termtheme = terminal.termthemes[terminal.settings.themeDefault];


// FUNCTION DECLARATIONS

function dirSearchFiles(file, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (file === arr[i]["name"]) {
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
        file,
        files,
        key,
        keys,
        completions = [],
        part2 = "",
        length = full.length - 1;
    
    while(full.charAt(length) !== '/') { // until the last character of full is a /
        part2 = full.charAt(length) + part2; // add the last character of full to part2 string
        full = full.substr(0, length); // remove the last character from full
        length--; // decrement length
    }
    part1 = full; // part1 is full, minus everything after the /
    full = full.substr(0, length); // remove the last character from full, a /
    dirObject = pathStringToObject(full); // retrieve the object that full now represents

    if (dirObject !== null && typeof dirObject === 'object') {
        keys = Object.keys(dirObject);
    }

    for (key in keys) {
        if (keys[key].substring(0, part2.length) === part2) {
            completions.push(keys[key]);
        }
    }
    
    files = dirObject.files;

    for (file in files) {
        if (files[file]["name"].substring(0, part2.length) === part2) {
            completions.push(files[file]["name"]);
        }
    }
    return [completions, part1];
}

function tabRelative(full) {
    var completions = [],
        keys = Object.keys(pwd[1]),
        files = pwd[1].files,
        key,
        file;

    for (key in keys) {

        if (keys[key].substring(0, full.length) === full) {

            completions.push(keys[key]);

        }
    }

    for (file in files) {

        if (files[file]["name"].substring(0, full.length) === full) {

            completions.push(files[file]["name"]);

        }

    }
    
    return completions;
}

function getPreDirectory(directory) {
    
    var full = directory,
        part2 = "",
        length = full.length - 1,
        part1,
        dirObject;

    while(full.charAt(length) !== '/') {
        part2 = full.charAt(length) + part2;
        full = full.substr(0, length);
        length--;
    }

    part1 = full;
    full = full.substr(0, length);
    dirObject = pathStringToObject(full);
    
    return [dirObject, part2, part1];
    
}

function getDirectory(directory) {
    var currentDir = pwd[2] + "/" + directory,
        dirObject = pathStringToObject(currentDir);
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
    var dirObject,
        dotdir = replaceAll("/", ".", dirString);
    
    while(dotdir.charAt(0) === '.') {
        dotdir = dotdir.substr(1);
     }
    
    dirObject = index(terminal.fs, dotdir);
    
    return dirObject;
}

function addToHistory(command) {
    
    if (terminal.settings.hist.slice(-1) != command) {
        
        terminal.settings.hist.push(command);
        terminal.userSettings.hist = terminal.settings.hist;
        terminal.save.settings();
        
    }
}

function tab(e) { //prevent default tab functionality
    if (e.keyCode === 9) { e.preventDefault(); }
}


function textEditor(e) { // for handling saving and exiting cases
    if (e.keyCode === 88 && e.ctrlKey && terminal.editor.prompting === false) { terminal.editor.showPrompt(); } // x key
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

function setCommandLineFocus() {
    input.focus();
}


function scrollToBottom() {
    window.scroll(0, 10000);
}

function checkCommand(e) {

    // should refactor to take multiple args as array    
    function runCommand(command, args){
        command(args);
        scrollToBottom();
        addToHistory(commandInput);
    }

    var commandInput = input.value.toLowerCase(),
        len = commandInput.length,
        output = document.getElementById("output");
    
    commandArgs = commandInput.split(" ");
    outputHTML = "<p style='color:" + termtheme.text + "'><span style='color:" + termtheme.commandLine + "'>WebTerm:" + pwd[0] + " " + terminal.settings.user + "$ </span>" + commandInput + "</p>";

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
            if (commandArgs[1] != "-help" && commandArgs[1] != "--help" && commandArgs[1] != "-h") {
                switch (commandArgs[0]) {

                    case "mkdir":
                        runCommand(terminal.mkdir);
                        break;

                    case "touch":
                        runCommand(terminal.touch);
                        break;

                    case "signin":
                        runCommand(terminal.signin);
                        break;

                    case "theme":
                        runCommand(terminal.theme.defaultCase);
                        break;

                    case "rm":
                        runCommand(terminal.rm.defaultCase);
                        break;

                    case "echo":
                        runCommand(terminal.echo);
                        break;

                    case "ls":
                        runCommand(terminal.ls.l);
                        break;

                    case "cd":
                        runCommand(terminal.cd);
                        break;

                    case "editor":
                        runCommand(terminal.editor.run(commandArgs[1]));
                        break;

                    case "cat":
                        runCommand(terminal.cat, commandArgs[1]);
                        break;

                    case "man":
                        runCommand(terminal.man, commandArgs[1]);
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
                case  "-help":
                case     "-h":
                    terminal.help.info();
                    break;
            }
            
        } else if (commandArgs.length > 2) { // if the command entered has more than one argument
            if (commandArgs[0] != "mv" && commandArgs[0] != "cp") {
                switch (commandArgs[0] + " " + commandArgs[1]) {
                
                    case "youtube -s":
                        runCommand(terminal.youtube.s);
                        break;
                        
                    case "rm -r":
                        runCommand(terminal.rm.r);
                        break;

                    case "theme -set":
                        runCommand(terminal.theme.set, commandArgs[2]);
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
            
            if (commandArgs[0] === "mv") { runCommand(terminal.mv); }
            
            if (commandArgs[0] + " " + commandArgs[1] === "cp -r") { runCommand(terminal.cp.r); }

            else if (commandArgs[0] === "cp") { runCommand(terminal.cp.defaultCase); }
            
        } else { // if the command entered has no arguments

            switch (commandInput) {

                case "help":
                    runCommand(terminal.help.list);
                    break;
                    
                case "signout":
                    runCommand(terminal.signout);
                    break;
                    
                case "version":
                    runCommand(terminal.version);
                    break;
                    
                case "history":
                    runCommand(terminal.history);
                    break;

                case "pwd":
                    runCommand(terminal.pwd);
                    break;

                case "cd":
                    output.innerHTML += outputHTML;
                    pwd = ["~", terminal.fs.home.user, "/home/user"];
                    commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.settings.user + "$ ";
                    break;

                case "ls":
                    runCommand(terminal.ls.defaultCase);
                    break;

                case "github":
                    runCommand(terminal.github);
                    break;

                case "clear":
                    runCommand(terminal.clear);
                    break;

                case "youtube":
                    runCommand(terminal.youtube.defaultCase);
                    break;
                    
                case "date":
                    runCommand(terminal.date);
                    break;

                case "editor":
                    runCommand(terminal.editor.run);
                    break;


                // TUTORIAL STUFF
                case "tutorial":
                    if ( ! tutorial.on ) {
                        runCommand(terminal.tutorial.launch);
                    }
                    break;

                case "next":
                    if ( tutorial.on && tutorial.stageArray.indexOf(tutorial.currentStage) != tutorial.stageArray.length - 1 ) {
                        tutorial.next();
                    }
                    break;

                case "prev":
                    if ( tutorial.on && tutorial.stageArray.indexOf(tutorial.currentStage) != 0 ) {
                        tutorial.previous();
                    }
                    break;

                case "exit":
                    if (tutorial.on) {
                        terminal.tutorial.exit();
                    }
                    break;
                // END TUTORIAL STUFF


                default:
                    if (commands.indexOf(commandInput) == -1) {
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>No command '" + commandInput + "' found. Type 'help' for a list of commands.</p>";
                        scrollToBottom();
                        addToHistory(commandInput);
            
                    } else {
                        output.innerHTML += outputHTML;
                        output.innerHTML += "<p style='color:" + termtheme.text + "'>Try '" + commandInput + " -help' for information on proper usage</p>";
                        scrollToBottom();
                        addToHistory(commandInput);
                    }
            }
        }

        input.value = ""; // reset command line
        input.size = 1; // reset caret
        count = 0; // reset up/down history
    
    } // END ENTER KEY

} // END checkCommand


// LOAD USER AND FS SETTINGS
terminal.init();


















