var tutorial = {

    on: false,
    
    stages: {
        one: {
            title: "The Terminal: What is it, and Why use it?",
            substage: "<span id='substage'>1.1</span>",
            content: "The terminal is an interface in which you can type and execute text based commands. It can be much faster to complete some tasks using a Terminal than with graphical applications and menus. Another benefit is allowing access to many more commands and scripts. A common terminal task of installing an application can be achieved within a single command, compared to navigating through the finder.<br/><br/>For example the following command would install 'something', rather than clicking through file system and going through the install prompts.<br/>sudo apt-get install 'something'<br/><br/>You are telling the computer what to do, and this becomes very powerful.",
            advice: "<br/>Type '<span id='advice-command'>next</span>' and press enter and we'll jump into things.",
            command: "next",
            completed: false
        },
        two: {
            title: "Commands",
            substage: "<span id='substage'>1.2</span>",
            content: "Commands pre-defined words and letters that help you do common tasks quicker and more efficiently. Commands are typed into the terminal and sent with the enter key. They make take arguments and flags (more on that to come).",
            advice: "<br/>Type '<span id='advice-command'>help</span>' and press enter to send your first command.",
            command: "help",
            completed: false
        },
        three: {
            title: "Flags",
            substage: "<span id='substage'>1.3</span>",
            content: "Success! You should now see a list of commands available in your terminal. You can use the '-help' flag to see additional information and usage on the command. Flags are additional options and settings that can be passed with commands. They allow for greater flexibility and functionality. They come after the command and are separated by spaces, and start with a '-'.",
            advice: "<br/>Try typing some commands followed by '-help'. Ex. <span class='tutorial-highlight'>help -help</span>. Type '<span id='advice-command'>next</span>' when you're ready to move on.",
            command: "next",
            completed: false
        },
        four: {
            title: "pwd",
            substage: "<span id='substage'>1.4</span>",
            content: "'pwd' stands for Present Working Directory, and is used to output the path of the current working directory. It will show you where you are in the file system, sometimes referred to as a file tree. You may better understand this as your location in the finder.<br/><br/>Usage: pwd<br/>Output: /home/whereyouare",
            advice: "<br/>Try typing '<span id='advice-command'>pwd</span>' to see where you are in your file system.",
            command: "pwd",
            completed: false
        }
    },

    currentStage: "one",
    title: document.getElementById("stage-title"),
    substage: document.getElementById("stage-substage"),
    content: document.getElementById("stage-content"),
    advice: document.getElementById("stage-advice"),
    command: document.getElementById("stage-command"),

    stageArrayInit: function () {
        return Object.keys(tutorial.stages);
    },
    stageArray: undefined, // will initialize this at first run

    swapContent: function () {
        tutorial.title.innerHTML = tutorial.stages[tutorial.currentStage].substage + " " + tutorial.stages[tutorial.currentStage].title;
        tutorial.content.innerHTML = tutorial.stages[tutorial.currentStage].content;
        tutorial.advice.innerHTML = tutorial.stages[tutorial.currentStage].advice;
    },

    current: function () {
        var stageArray = tutorial.stageArray;

        if ( getItemFromLocalStorage('tutorial') ) { tutorial.currentStage = getItemFromLocalStorage('tutorial'); }

        console.log(stageArray); // ["one", "two"]
        console.log(tutorial.currentStage); // "one"
        console.log(stageArray.indexOf(tutorial.currentStage)); // 0
        
        var index = stageArray.indexOf(tutorial.currentStage); // 0
        tutorial.currentStage = stageArray[index]; // index = 0 + 1, currentStage set to "two"
        
        console.log(tutorial.currentStage); // "two"
        console.log(tutorial.stages[tutorial.currentStage].title);

        tutorial.swapContent();
    },
    next: function() {

        var stageArray = tutorial.stageArray;

        console.log(stageArray); // ["one", "two"]
        console.log(tutorial.currentStage); // "one"
        console.log(stageArray.indexOf(tutorial.currentStage)); // 0
        
        var index = stageArray.indexOf(tutorial.currentStage); // 0
        tutorial.stages[tutorial.currentStage].completed = true; // stage one completed, set its completed attribute to true
        tutorial.currentStage = stageArray[index + 1]; // index = 0 + 1, currentStage set to "two"
        
        console.log(tutorial.currentStage); // "two"
        console.log(tutorial.stages[tutorial.currentStage].title);
        
        tutorial.swapContent();

        terminal.save.tutorial();
    },
    
    previous: function() {

        var stageArray = tutorial.stageArray;
        
        var index = stageArray.indexOf(tutorial.currentStage);
        tutorial.currentStage = stageArray[index - 1];

        tutorial.swapContent();

        terminal.save.tutorial();
    }
}
