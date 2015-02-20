var tutorial = {
    
    currentStage: "one",
    
    stages: {
        one: {
            title: "Getting Started",
            substage: "1.1",
            content: "What is it: The terminal is an interface in which you can type and execute text based commands. Why use it: It can be much faster to complete some tasks using a Terminal than with graphical applications and menus. Another benefit is allowing access to many more commands and scripts.",
            advice: "Type 'next' and we'll jump into things.",
            command: "next",
            completed: false
        },
        two: {
            title: "",
            substage: "1.2",
            content: "",
            advice: "",
            command: "",
            completed: false
        }
    },
    current: function () {
        var stageArray = Object.keys(tutorial.stages);
        var title = document.getElementById("stage-title");
        var substage = document.getElementById("stage-substage");
        var content = document.getElementById("stage-content");
        var advice = document.getElementById("stage-advice");
        var command = document.getElementById("stage-command");
        
        console.log(stageArray); // ["one", "two"]
        console.log(tutorial.currentStage); // "one"
        console.log(stageArray.indexOf(tutorial.currentStage)); // 0
        
        var index = stageArray.indexOf(tutorial.currentStage); // 0
        tutorial.currentStage = stageArray[index]; // index = 0 + 1, currentStage set to "two"
        
        console.log(tutorial.currentStage); // "two"
        console.log(tutorial.stages[tutorial.currentStage].title);
        
        //swap out contents of page
        title.innerText = tutorial.stages[tutorial.currentStage].title;
        substage.innerText = tutorial.stages[tutorial.currentStage].substage;
        content.innerText = tutorial.stages[tutorial.currentStage].content;
        advice.innerText = tutorial.stages[tutorial.currentStage].advice;
        command.innerText = tutorial.stages[tutorial.currentStage].command;
    },
    next: function() {
        var stageArray = Object.keys(tutorial.stages);
        var title = document.getElementById("stage-title");
        var substage = document.getElementById("stage-substage");
        var content = document.getElementById("stage-content");
        var advice = document.getElementById("stage-advice");
        var command = document.getElementById("stage-command");
        
        console.log(stageArray); // ["one", "two"]
        console.log(tutorial.currentStage); // "one"
        console.log(stageArray.indexOf(tutorial.currentStage)); // 0
        
        var index = stageArray.indexOf(tutorial.currentStage); // 0
        tutorial.stages[tutorial.currentStage].completed = true; // stage one completed, set its completed attribute to true
        tutorial.currentStage = stageArray[index + 1]; // index = 0 + 1, currentStage set to "two"
        
        console.log(tutorial.currentStage); // "two"
        console.log(tutorial.stages[tutorial.currentStage].title);
        
        //swap out contents of page
        title.innerText = tutorial.stages[tutorial.currentStage].title;
        substage.innerText = tutorial.stages[tutorial.currentStage].substage;
        content.innerHTML = tutorial.stages[tutorial.currentStage].content;
        advice.innerHTML = tutorial.stages[tutorial.currentStage].advice;
        command.innerHTML = tutorial.stages[tutorial.currentStage].command;
    },
    
    previous: function() {
        var stageArray = Object.keys(tutorial.stages);
        var title = document.getElementById("stage-title");
        var substage = document.getElementById("stage-substage");
        var content = document.getElementById("stage-content");
        var advice = document.getElementById("stage-advice");
        var command = document.getElementById("stage-command");
        
        var index = stageArray.indexOf(tutorial.currentStage);
        tutorial.currentStage = stageArray[index - 1];

        // swap out contents of page
        // same code as next
        title.innerText = tutorial.stages[tutorial.currentStage].title;
        substage.innerText = tutorial.stages[tutorial.currentStage].substage;
        content.innerText = tutorial.stages[tutorial.currentStage].content;
        advice.innerText = tutorial.stages[tutorial.currentStage].advice;
        command.innerText = tutorial.stages[tutorial.currentStage].command;
    }
}
