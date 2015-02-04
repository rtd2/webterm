var tutorial = {
    
    currentStage: "one",
    
    stages: {
        one: {
            title: "Getting Started",
            substage: "1.1",
            content: "",
            advice: "",
            command: "",
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
