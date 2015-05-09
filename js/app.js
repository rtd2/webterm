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



// helpList loaded
// terminal loaded
// funcs loaded
// checkCommand loaded
// tutorial loaded



// SETTING VARIABLES

commands = Object.keys(helpList);
pwd = ["~", terminal.fs.home.user, "/home/user"];
input = document.getElementById("input");
histindex = 0;
count = 0;
termtheme = terminal.termthemes[terminal.settings.themeDefault];


// LOAD USER AND FS SETTINGS
terminal.init();