// START HELPLIST

helpList = {
    "tutorial": {
        name: "tutorial",
        info: "Launch the tutorial. Type 'exit' to quit tutorial when launched."
    },
    "touch": {
        name: "touch",
        info: "Create a new file in the present working directory<br>touch [file]<br>ex. touch mydocument.txt"
    },
    "clear": {
        name: "clear",
        info: "Clear the terminal output<br>clear"
    },
    "editor": {
        name: "editor",
        info: "Open the built in text editor<br>editor<br>Open the provided file in the text editor<br>editor [file]<br>ex. editor readme.txt"
    },
    "signin": {
        name: "signin",
        info: "Sign in the provided user<br>signin [userName]<br>ex. signin rt"
    },
    "signout": {
        name: "signout",
        info: "Signout the currently signed in user<br>signout"
    },
    "version": {
        name: "version",
        info: "Output the version of the Web Terminal<br>version"
    },
    "echo": {
        name: "echo",
        info: "Output the provided string<br>echo [string]<br>ex. echo Hello"
    },
    "date": {
        name: "date",
        info: "Output the current date, time, and timezone<br>date"
    },
    "rm": {
        name: "rm",
        info: "Remove the provided file<br>rm [file]<br>ex. rm readme.txt<br>Remove the provided directory<br>rm -r [directory]<br>ex. rm -r documents"
    },
    "history": {
        name: "history",
        info: "Output a list of previously entered commands<br>history<br><br>Output a number of previously entered commands<br>history [number]</br>ex. 'history 5' will list history items 1-5<br><br>Clear the list of previously entered commands</br>history -c"
    },
    "cd": {
        name: "cd",
        info: "Change the present working directory<br>cd<br>cd ..<br>cd [directory]<br>ex. cd Documents<br>ex. cd /home/user/Documents"
    },
    "ls": {
        name: "ls",
        info: "Output a list of the files and directories in the present working directory<br>ls<br>Output in long format<br>ls -l"
    },
    "theme": {
        name: "theme",
        info: "Change the color scheme of the Web Terminal<br>theme [theme]<br>ex. theme white<br>Output a list of available themes<br>theme -l"
    },
    "help": {
        name: "help",
        info: "Provides a list of available commands, and information on the Web Terminal<br>help"
    },
    "youtube": {
        name: "youtube",
        info: "Open a new tab in your browser to youtube.com<br>youtube<br>Search youtube.com with the provided search query<br>youtube -s [query]<br>ex. youtube -s funny cats"
    },
    "pwd": {
        name: "pwd",
        info: "Output the present working directory<br>pwd"
    },
    "mkdir": {
        name: "mkdir",
        info: "Create a new directory in the present working directory<br>mkdir [directory]<br>ex. mkdir Pictures"
    },
    "cp": {
        name: "cp",
        info: "Copy a file<br>cp [file] [destination]<br>ex. cp readme.txt /home/user/desktop<br>cp [file] [newName]<br>ex. cp readme.txt readme2.txt<br>Copy a directory<br>cp -r [directory] [destination]<br>ex. cp -r downloads desktop"
    },
    "mv": {
        name: "mv",
        info: "Move (cut and paste) a file or directory<br>mv [file] [destination]<br>ex. mv readme.txt /home/user/desktop<br>mv [directory] [destination]<br>ex. mv Documents /home/user/Desktop"
    },
    "cat": {
        name: "cat",
        info: "The 'cat' utility reads files and writes them to the standard output.<br>cat [file]<br>ex. cat readme.txt"
    },
    "man": {
        name: "man",
        info: "Man is a verbose form of help.<br>man [command]<br>man help"
    },
    "grep": {
        name: "grep",
        info: "Grep is a search tool.<br>grep [search term] [file]<br>grep foo bar.txt"
    }
}; 

// END HELPLIST
