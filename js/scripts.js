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
        
var pwd = ["~", fs.home.rt, "/home/rt"];

window.addEventListener("keyup", checkCommand, false);

function checkCommand(e) {

    var commands = document.getElementById("command");
    var command = commands.value;
    var len = command.length;
    var commandArgs = command.split(" ");
    console.log(commandArgs);
    
    if (len > 0) {
        commands.size = len + 1;
    } else {
        commands.size = 1;
    }
    
    if (e.keyCode === 13) {

        var history = document.getElementById("history");

        if (commandArgs.length > 2) {

            switch(commandArgs[0] + " " + commandArgs[1]){

            case "youtube -s":
                var base = "https://www.youtube.com/results?search_query=";
                var term = "";

                for (var i = 2; i < commandArgs.length; i++) {
                    term += commandArgs[i] + "%20";
                }

                term = term.slice(0,-3);
                console.log(term);

                if (term === "") {
                    
                } else {
                    var url = base + term;
                    window.open(url, '_blank');
                }
                history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";
                commands.size = 1;
                break;
            }

        }   else {
                
                switch(command.toLowerCase()){
                
                case "help":
                    history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";
                    commands.size = 1;
                    break;
                    
                case "cd /home/rt/desktop":
                    history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";
                    pwd = ["/home/rt/desktop", fs.home.rt.desktop, "/home/rt/desktop"]; //display, dot notation, pwd display
                    document.getElementById("block").innerHTML = "WebTerm:" + pwd[0] + " rt$ "  
                    commands.size = 1;
                    break;
                    
                case "mkdir":
                    history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";
                    var length = pwd[1].files.length;
                    var name = window.prompt("What is the folder called?");
                    pwd[1].files[length] = name;
                    commands.size = 1;
                    break;
                    
                case "pwd":
                    history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";
                    history.innerHTML += "<p>" + pwd[2] + "</p>";
                    commands.size = 1;
                    break;
                    
                case "ll":
                    var list = "";
                    for (var i = 0; i < pwd[1].files.length; i++) {
                        list += "<p style='color: white'>" + pwd[1].files[i] + "</p>";
                    }
                    history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";
                    history.innerHTML += "<p>" + list + "</p>";
                    commands.size = 1;
                    break;
                    
                case "clear":
                    history.innerHTML = "";
                    commands.size = 1;
                    break;
                    
                case "youtube":
                    window.open('http://www.youtube.com','_blank');
                    history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";
                    commands.size = 1;
                    break;
                    
                case "youtube -s":
                    var base = "https://www.youtube.com/results?search_query=";
                    var term = window.prompt("What to search?");
                    if (term === "") {
                        
                    } else {
                        var url = base + term;
                        window.open(url, '_blank');
                    }
                    history.innerHTML += "<p>WebTerm:" + pwd[0] + " " + "rt$  " + command + "</p>";
                    commands.size = 1;
                    break;
            }
        }   
        commands.value = "";
        commands.size = 1; 
    }
}
