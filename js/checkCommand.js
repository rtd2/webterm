function checkCommand(e) {

    // seems more flexible doing it this way, as the amount of commands grows.    
    function runCommand(arg1, arg2) {
        var command = this;
        output.innerHTML += outputHTML;
        command(arg1, arg2);
        scrollToBottom();
        addToHistory(commandInput);
    }

    function displayInputError() {

        output.innerHTML += outputHTML;
        setTimeout(scrollToBottom, 0); // doing this pushes scrollToBottom to next cycle of event loop, giving us the behavior we want in the default cases. Else we would have to call it twice and add lines of code (boo hoo to that)
        addToHistory(commandInput);

    }

    function defaultErrorHandler(commandArg) {
        if (commands.indexOf(commandArg) == -1) {
            displayInputError();
            output.innerHTML += "<p style='color:" + termtheme.text + "'>No command '" + commandArg + "' found. Type 'help' for a list of commands.</p>";

        } else {
            displayInputError();
            output.innerHTML += "<p style='color:" + termtheme.text + "'>Try '" + commandArg + " -help' for information on proper usage</p>";
        }
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
                        runCommand.apply(terminal.mkdir);
                        break;

                    case "touch":
                        runCommand.apply(terminal.touch);
                        break;

                    case "history":
                        runCommand.apply(terminal.history.arg, [commandArgs[1]]);
                        break;

                    case "signin":
                        runCommand.apply(terminal.signin);
                        break;

                    case "theme":
                        runCommand.apply(terminal.theme.defaultCase);
                        break;

                    case "rm":
                        runCommand.apply(terminal.rm.defaultCase);
                        break;

                    case "echo":
                        runCommand.apply(terminal.echo);
                        break;

                    case "ls":
                        runCommand.apply(terminal.ls.l);
                        break;

                    case "cd":
                        runCommand.apply(terminal.cd);
                        break;

                    case "editor":
                        runCommand.apply(terminal.editor.run, [commandArgs[1]]);
                        window.scroll(0, 0); // NEEDED TO RESET SCROLL TO TOP
                        break;

                    case "cat":
                        runCommand.apply(terminal.cat, [commandArgs[1]]);
                        break;

                    case "man":
                        runCommand.apply(terminal.man, [commandArgs[1]]);
                        break;
                        
                    default:
                        defaultErrorHandler(commandArgs[0]);
                }
            }
            
            switch(commandArgs[1]) {
                case "--help":  
                case  "-help":
                case     "-h":
                    runCommand.apply(terminal.help.info);
                    break;
            }
            
        } else if (commandArgs.length > 2) { // if the command entered has more than one argument
            if (commandArgs[0] != "mv" && commandArgs[0] != "cp" && commandArgs[0] != "grep") {
                switch (commandArgs[0] + " " + commandArgs[1]) {
                
                    case "youtube -s":
                        runCommand.apply(terminal.youtube.check);
                        //terminal.youtube.check();
                        break;
                        
                    case "rm -r":
                        runCommand.apply(terminal.rm.r);
                        break;

                    case "theme -set":
                        runCommand.apply(terminal.theme.set, [commandArgs[2]]);
                        break;

                    default:
                        defaultErrorHandler(commandArgs[0]);
                }
            }
            
            if (commandArgs[0] === "mv") { runCommand.apply(terminal.mv); }

            if (commandArgs[0] === "grep") { runCommand.apply(terminal.grep, [commandArgs[1], commandArgs[2]]); }
            
            if (commandArgs[0] + " " + commandArgs[1] === "cp -r") { runCommand.apply(terminal.cp.r); }

            else if (commandArgs[0] === "cp") { runCommand.apply(terminal.cp.defaultCase); }
            
        } else { // if the command entered has no arguments

            switch (commandInput) {

                case "help":
                    runCommand.apply(terminal.help.list);
                    break;
                    
                case "signout":
                    runCommand.apply(terminal.signout);
                    break;
                    
                case "version":
                    runCommand.apply(terminal.version);
                    break;
                    
                case "history":
                    runCommand.apply(terminal.history.defaultCase);
                    break;

                case "pwd":
                    runCommand.apply(terminal.pwd);
                    break;

                case "cd":
                    pwd = ["~", terminal.fs.home.user, "/home/user"];
                    commandLine.innerHTML = "WebTerm:" + pwd[0] + " " + terminal.settings.user + "$ ";
                    break;

                case "ls":
                    runCommand.apply(terminal.ls.defaultCase);
                    break;

                case "github":
                    runCommand.apply(terminal.github);
                    break;

                case "clear":
                    runCommand.apply(terminal.clear);
                    break;

                case "youtube":
                    runCommand.apply(terminal.youtube.check);
                    //terminal.youtube.check();
                    break;
                    
                case "date":
                    runCommand.apply(terminal.date);
                    break;

                case "editor":
                    runCommand.apply(terminal.editor.run);
                    window.scroll(0, 0); // NEEDED TO RESET SCROLL TO TOP
                    break;


                // TUTORIAL STUFF
                case "tutorial":
                    if ( ! tutorial.on ) {
                        runCommand.apply(terminal.tutorial.launch);
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
                    defaultErrorHandler(commandInput);
            }
        }

        input.value = ""; // reset command line
        input.size = 1; // reset caret
        count = 0; // reset up/down history
    
    } // END ENTER KEY

} // END checkCommand
