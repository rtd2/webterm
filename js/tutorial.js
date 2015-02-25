var tutorial = {

    on: false,
    
    stages: {
        one: {
            title: "Getting Started",
            substage: "<span id='substage'>1.1</span>",
            content: "What is it: The terminal is an interface in which you can type and execute text based commands. Why use it: It can be much faster to complete some tasks using a Terminal than with graphical applications and menus. Another benefit is allowing access to many more commands and scripts.",
            advice: "Type '<span id='advice-command'>next</span>' and we'll jump into things.",
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

    currentStage: "one",
    title: document.getElementById("stage-title"),
    substage: document.getElementById("stage-substage"),
    content: document.getElementById("stage-content"),
    advice: document.getElementById("stage-advice"),
    command: document.getElementById("stage-command"),

    stageArray: function () {
        return Object.keys(tutorial.stages);
    },

    swapContent: function () {
        tutorial.title.innerHTML = tutorial.stages[tutorial.currentStage].substage + " " + tutorial.stages[tutorial.currentStage].title;
        tutorial.content.innerText = tutorial.stages[tutorial.currentStage].content;
        tutorial.advice.innerHTML = tutorial.stages[tutorial.currentStage].advice;
    },

    current: function () {

        var stageArray = tutorial.stageArray();

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

        var stageArray = tutorial.stageArray();

        console.log(stageArray); // ["one", "two"]
        console.log(tutorial.currentStage); // "one"
        console.log(stageArray.indexOf(tutorial.currentStage)); // 0
        
        var index = stageArray.indexOf(tutorial.currentStage); // 0
        tutorial.stages[tutorial.currentStage].completed = true; // stage one completed, set its completed attribute to true
        tutorial.currentStage = stageArray[index + 1]; // index = 0 + 1, currentStage set to "two"
        
        console.log(tutorial.currentStage); // "two"
        console.log(tutorial.stages[tutorial.currentStage].title);
        
        tutorial.swapContent();
    },
    
    previous: function() {

        var stageArray = tutorial.stageArray();
        
        var index = stageArray.indexOf(tutorial.currentStage);
        tutorial.currentStage = stageArray[index - 1];

        tutorial.swapContent();
    }
}
