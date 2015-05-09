var terminal, commands, command;

terminal = {

	command: {
		function check() {},
		function default() {},
		function flag() {},
	},

	command: {
		function default () {
			// if (flag) run flag
			// else continue normal stuff
		},
		function flag () {}
	},
	
	greet: function (greet) {
		console.log(greet);
	},

	hi: function (message) {
		console.log(message);
	}

};



// this is meant to replace the help list
// this should be an object that can match commands and route them properly based on flags
// the method itself should run the logic on what to do with the flag
// either check flags here or in method
// if no flag we can route straight to default case, rather than a flag checker
// if (flags) { terminal.func.check } else { terminal.func.defaultCase }
// would be most awesome if we could only have one check function, rather than one for each command


commands = {
	
	greet: {
		name: greet,
		helpInfo: help info to go here,
		flags: ['-s']
	},

	hi: {
		name: hi,
		helpInfo: some stuff here,
		flags: null,
		run: terminal.hi
	}

	// OR

	func: {
		name: myMethod,
		helpInfo: help me :),
		route: // this would terminal.func.check or terminal.func or terminal.func.defaultCase
	}

};

command = 'greet';

if ( terminal.hasOwnProperty(command) ) {
	commands[command](command);
}

command = 'hi';

if ( terminal.hasOwnProperty(command) ) {
	commands[command](command);
}


