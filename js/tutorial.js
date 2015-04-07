var tutorial = {

    on: false,
    
    stages: {
        // one: {
        //     title: "The Terminal: What is it, and Why use it?",
        //     substage: "<span id='substage'>1.1</span>",
        //     content: "The terminal is an interface in which you can type and execute text based commands. It can be much faster to complete some tasks using a Terminal than with graphical applications and menus. Another benefit is allowing access to many more commands and scripts. A common terminal task of installing an application can be achieved within a single command, compared to navigating through the finder.<br/><br/>For example the following command would install 'something', rather than clicking through file system and going through the install prompts.<br/>sudo apt-get install 'something'<br/><br/>You are telling the computer what to do, and this becomes very powerful.",
        //     advice: "<br/>Type '<span id='advice-command'>next</span>' and press enter and we'll jump into things.",
        //     command: "next",
        //     completed: false
        // },
        // two: {
        //     title: "Commands",
        //     substage: "<span id='substage'>1.2</span>",
        //     content: "Commands pre-defined words and letters that help you do common tasks quicker and more efficiently. Commands are typed into the terminal and sent with the enter key. They make take arguments and flags (more on that to come).",
        //     advice: "<br/>Type '<span id='advice-command'>help</span>' and press enter to send your first command.",
        //     command: "help",
        //     completed: false
        // },
        // three: {
        //     title: "Flags",
        //     substage: "<span id='substage'>1.3</span>",
        //     content: "Success! You should now see a list of commands available in your terminal. You can use the '-help' flag to see additional information and usage on the command. Flags are additional options and settings that can be passed with commands. They allow for greater flexibility and functionality. They come after the command and are separated by spaces, and start with a '-'.",
        //     advice: "<br/>Try typing some commands followed by '-help'. Ex. <span class='tutorial-highlight'>help -help</span>. Type '<span id='advice-command'>next</span>' when you're ready to move on.",
        //     command: "next",
        //     completed: false
        // },
        // four: {
        //     title: "pwd",
        //     substage: "<span id='substage'>1.4</span>",
        //     content: "'pwd' stands for Present Working Directory, and is used to output the path of the current working directory. It will show you where you are in the file system, sometimes referred to as a file tree. You may better understand this as your location in the finder.<br/><br/>Usage: pwd<br/>Output: /home/whereyouare",
        //     advice: "<br/>Try typing '<span id='advice-command'>pwd</span>' to see where you are in your file system.",
        //     command: "pwd",
        //     completed: false
        // },
        // five: {
        //     title: "cd",
        //     substage: "<span id='substage'>1.5</span>",
        //     content: "'cd' stands for Current Directory, and is used to traverse your file system. This is the equivalent of clicking through your finder windows. This is a very useful command that will save you lots of time.<br/><br/>Usage: cd filepath<br/>Example: cd /home/foo<br/>",
        //     advice: "<br/>If foo exists, this will put you in the foo folder, which resides in the home folder. If successful, 'pwd' should now say '/home/foo'<br/><br/>Try 'cd /home/documents', followed by 'pwd'.",
        //     command: "pwd",
        //     completed: false
        // }






        // START ROBERT

        one: {
            title: "Introduction",
            substage: "<span id='substage'>1.1: The Terminal</span>",
            content: "What is it?<br>The terminal is an interface for typing and executing text based commands.<br>Why use it?<br>It is often much faster to complete some tasks using a Terminal than with a graphical interface.<br>The terminal also provides access to broader, more advanced functionality via commands and scripts.<br/>Type '<span id='advice-command'>next</span>' then press enter and we'll get started.",
            advice: "",
            command: "next",
            completed: false
        },
        two: {
            title: "The Basics",
            substage: "<span id='substage'>1.2: Commands</span>",
            content: "In order to tell a computer exactly what to do, we provide instructions in the form of commands. Commands are typed into the terminal and sent with the enter key. Throughout this tutorial we'll go over a variety of the more common commmands.<br/>Type '<span id='advice-command'>next</span>' then press enter and we'll move on to your first command.",
            advice: "",
            command: "next",
            completed: false
        },
        three: {
            title: "The Working Directory",
            substage: "<span id='substage'>2.1: pwd</span>",
            content: "'pwd' stands for 'Print Working Directory', and is used to output the path of the current directory, also known as the working directory. It will show you where you are in the file system. In Windows or Mac OS, this is the equivalent of having a window open to a particular folder, like documents, or Pictures.<br/>Type and submit the command '<span id='advice-command'>pwd</span>' to see where we are in your file system.",
            advice: "Submit a command by pressing the 'enter' key.",
            command: "pwd",
            completed: false
        },
        four: {
            title: "The Working Directory",
            substage: "<span id='substage'>2.2: cd I</span>",
            content: "'cd' stands for 'Change Directory', and is used to traverse your file system. This is the equivalent of clicking through your finder/file explorer windows. So rather than clicking from your particular user folder, into the documents folder, we issue a 'change directory' command.<br>Type and submit the command '<span id='advice-command'>cd /home/user/documents</span>' to change your working directory to 'documents', or more specifically '/home/user/documents'",
            advice: "'The words 'directory' and 'folder' may be used interchangeably throughout this tutorial. 'Folder' is more common in a Windows environment, whereas 'directory' is a bit of an older term, used since the early days of filesystems.",
            command: "cd",
            completed: false
        },
        five: {
            title: "The Working Directory",
            substage: "<span id='substage'>2.3: Paths I</span>",
            content: "As with the previous example, many commands will require that we provide a 'path' that describes the particular location of a file or folder. In the previous example, the folder 'documents' existed within the folder 'user', which was inside another folder called 'home', the command was 'cd /home/user/documents' to change our 'working directory' to '/home/user/documents'. '/home/user/documents' is called a 'full', or 'absolute path'. It describes the exact location of 'documents', including all those folders that come before it in the filesystem.<br/>Submit the command '<span id='advice-command'>next</span>' when you're ready to move on.",
            advice: "There is another type of 'path', called a 'relative path'. Any ideas how this other type of 'path' might look? We'll revisit 'paths' later in the tutorial.",
            command: "pwd",
            completed: false
        },
        six: {
            title: "The Working Directory",
            substage: "<span id='substage'>2.4: ls I</span>",
            content: "Now that we've covered the terminal basics 'working directory', 'change directory', and 'paths', we can move on to actually interacting with the contents of a directory. Because the terminal is text based, simply viewing the contents of a folder requires that we submit a command. The command 'ls' stands for 'list', and will allow us to check out the contents of your 'working directory'.<br/>Submit the command '<span id='advice-command'>ls</span>' to list the contents of your 'working directory'.",
            advice: "The command 'ls -l' will provide a long-form list. Putting each entry on its own line.",
            command: "ls",
            completed: false
        },
    seven: {
            title: "The Working Directory",
            substage: "<span id='substage'>2.5: ls II</span>",
            content: "<br/>Submit the command '<span id='advice-command'>ls -l /home/user/desktop</span>' to list the contents of the directory 'desktop'.",
            advice: "",
            command: "ls /home/user/desktop",
            completed: false
        },
        eight: {
            title: "Basic Commands: Making files and directories",
            substage: "<span id='substage'>3.1: mkdir</span>",
            content: "Let's try creating a folder. The command 'mkdir' stands for 'make directory'. This command will make a directory with the provided name within your 'working directory'<br>Submit the command <span id='advice-command'>mkdir newFolder</span>' to create a directory called 'newFolder'.",
            advice: "The option also exists to create a directory by providing 'mkdir' an 'absolute path', like so: 'mkdir /home/user/documents/newFolder'. That command would also create a directory called 'newFolder' in 'documents'.",
            command: "mkdir newFolder",
            completed: false
        },
        nine: {
            title: "Basic Commands: Making Files and Directories",
            substage: "<span id='substage'>3.2: touch</span>",
            content: "So how about creating files? The command 'touch' can be used to create a file with the provided name.<br>Submit the command <span id='advice-command'>touch newFile</span>' to create a file called 'newFile'.",
            advice: "As with 'mkdir', the command 'touch' can also work with an 'absolute path', such as 'touch /home/user/documents/newFile', in this case to create a file called 'newFile' in the directory 'documents'.",
            command: "touch newFile",
            completed: false
        },
    ten: {
            title: "Return to the Working Directory",
            substage: "<span id='substage'>4.1: Paths II</span>",
            content: "'Absolute paths' are great, but sort of time consuming. We don't want to be typing in the entire 'path' all the time, especially not when we're ten directories deep into the filesystem. This is where 'relative paths' are useful. Rather than referring to a 'file' called 'newFolder' (which we just created in 'documents') by typing out '/home/user/documents/newFolder', we can just type 'newFolder'.<br>Submit the command <span id='advice-command'>cd newFolder</span>' to change our working directory to 'newFolder'.",
            advice: "",
            command: "cd newFolder",
            completed: false
        },
    eleven: {
            title: "Return to the Working Directory",
            substage: "<span id='substage'>4.2: cd II</span>",
            content: "There you have it. We just changed our 'working directory' to 'newFolder' in 1/3 the keystrokes, thanks to 'relative paths'. Feel free to experiment. 'Relative' or 'absolute' paths, the choice is yours. We're going to change our 'working directory' back to '/home/user/documents' in a lot less keystrokes as well. 'cd' not only accepts relative paths, but also some shortcuts, like '..'. 'cd ..' will change the 'working directory' to our current 'working directory's' parent.<br>Submit the command <span id='advice-command'>cd ..</span>' to change our working directory back to 'documents'.",
            advice: "The 'parent' of a 'directory' is the 'directory' to which it belongs. ex. the 'parent' of 'documents' is 'user' --> '/home/user(the parent)/documents(the child)'",
            command: "cd newFolder",
            completed: false
        }

        // END ROBERT






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
