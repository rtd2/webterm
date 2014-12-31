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
            documents: {}
        }
    },
    bin: {}
};

var pwd = ["~", fs.home.rt, "/home/rt"]; // display, dot notation, cd display
var commands = document.getElementById("command");


var hist = [];
var histindex = 0;
var count = 0;

window.addEventListener("keyup", checkCommand, false);

function checkCommand(e) {

    var command = commands.value.toLowerCase();
    var len = command.length;
    var history = document.getElementById("history");
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

        if (count !== 1) {

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

            case "youtube -s":
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
                history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";

                addToHistory(command);
                count = 0;

                break;
            }

        }   else {

                switch(command){

                case "help":
                    history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";

                    // display help

                    // terminal history
                    addToHistory(command);
                    count = 0;

                    break;

                case "cd /home/rt/desktop":
                    history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";

                    pwd = ["/home/rt/desktop", fs.home.rt.desktop, "/home/rt/desktop"];
                    document.getElementById("block").innerHTML = "WebTerm:" + pwd[0] + " rt$ "  

                    addToHistory(command);
                    count = 0;

                    break;

                case "mkdir":
                    history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";

                    var length = pwd[1].files.length;
                    var name = window.prompt("What is the folder called?");
                    pwd[1].files[length] = name;

                    addToHistory(command);
                    count = 0;

                    break;

                case "pwd":
                    history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";

                    history.innerHTML += "<p>" + pwd[2] + "</p>";

                    addToHistory(command);
                    count = 0;

                    break;

                case "ll":
                    var list = "";
                    for (var i = 0; i < pwd[1].files.length; i++) {
                        list += "<p style='color: white'>" + pwd[1].files[i] + "</p>";
                    }
                    history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";

                    history.innerHTML += "<p>" + list + "</p>";

                    addToHistory(command);
                    count = 0;

                    break;

                case "clear":
                    history.innerHTML = "";

                    addToHistory(command);
                    count = 0;

                    break;

                case "youtube":
                    history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";

                    window.open('http://www.youtube.com','_blank');

                    addToHistory(command);
                    count = 0;

                    break;

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