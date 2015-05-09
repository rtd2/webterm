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
