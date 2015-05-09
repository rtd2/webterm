var terminal, commands, Command;

Command = function (command) {

	this.name = command;
	this.run = function (flags) {
		console.log(flags);
	}

}

var testing = new Command('testing');

// testing.yoyo('yoyo');
testing.run('run1');

Command.prototype.yoyo = function (message) {
	console.log(message);
}


var hello = new Command('hello');

hello.print = function (message) {
	console.log(message);
};

hello.run('testing');

hello.print('testing prototype');

hello.yoyo('yoyo');

testing.yoyo('more yoyo');

