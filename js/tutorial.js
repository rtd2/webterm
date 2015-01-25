var tutorial = {
    
    currentStage: "one",
    
    stages: {
        one: {
            title: "Got 15 minutes and want to learn Git?",
            substage: "1.1",
            content: "Git allows groups of people to work on the same documents (often code) at the same time, and without stepping on each other's toes. It's a distributed version control system.<br><br>Our terminal prompt below is currently in a directory we decided to name 'octobox'. To initialize a Git repository here, type the following command:",
            advice: "Directory:<br>A folder used for storing multiple files.<br>Repository:<br>A directory where Git has been initialized to start version controlling your files.<br>Clicky Click:<br>Click on the instructions preceded by an arrow. They will be copied into the terminal prompt.",
            command: "git init",
            completed: false
        },
        two: {
            title: "Checking the Status",
            substage: "1.2",
            content: "Good job! As Git just told us, our 'octobox' directory now has an empty repository in /.git/. The repository is a hidden directory where Git operates.<br>To save your progress as you go through this tutorial -- and earn a badge when you successfully complete it -- head over to create a free Code School account. We'll wait for you here.<br>Next up, let's type the git status command to see what the current state of our project is:",
            advice: "The .git directory<br>On the left you'll notice a .git directory. It's usually hidden but we're showing it to you for convenience.<br>If you click it you'll notice it has all sorts of directories and files inside it. You'll rarely ever need to do anything inside here but it's the guts of Git, where all the magic happens.",
            command: "git status",
            completed: false
        }
    },
    
    next: function() {
        var stageArray = Object.keys(tutorial.stages);
        var title = document.getElementById("title");
        var substage = document.getElementById("substage");
        var content = document.getElementById("content");
        var advice = document.getElementById("advice");
        var command = document.getElementById("command");
        
        console.log(stageArray); // ["one", "two"]
        console.log(tutorial.currentStage); // "one"
        console.log(stageArray.indexOf(tutorial.currentStage)); // 0
        
        var index = stageArray.indexOf(tutorial.currentStage); // 0
        tutorial.stages[tutorial.currentStage].completed = true; // stage one completed, set its completed attribute to true
        tutorial.currentStage = stageArray[index + 1]; // index = 0 + 1, currentStage set to "two"
        
        console.log(tutorial.currentStage); // "two"
        console.log(tutorial.stages[tutorial.currentStage].title);
        
        // swap out contents of page
        //title.innerHTML = tutorial.stages[tutorial.currentStage].title;
        //substage.innerHTML = tutorial.stages[tutorial.currentStage].substage;
        //content.innerHTML = tutorial.stages[tutorial.currentStage].content;
        //advice.innerHTML = tutorial.stages[tutorial.currentStage].advice;
        //command.innerHTML = tutorial.stages[tutorial.currentStage].command;
    },
    
    previous: function() {
        var stageArray = Object.keys(tutorial.stages);
        var title = document.getElementById("title");
        var substage = document.getElementById("substage");
        var content = document.getElementById("content");
        var advice = document.getElementById("advice");
        var command = document.getElementById("command");
        
        var index = stageArray.indexOf(tutorial.currentStage);
        tutorial.currentStage = stageArray[index - 1];

        // swap out contents of page
        // same code as next
    }
}