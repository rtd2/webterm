// Set up the classes

// This is the class to help define the Command collection
var Commands = function() {
	this.all = [];
};

// Registers commands
Commands.prototype.register = function(name, helpText, onCalled) {
	var cmd = new Command(name, helpText, onCalled);
	this[name] = cmd;
	this.all.push(cmd);
};


// Defines a command.  onCalled should return the message to be displayed as a string.
var Command = function(name, helpText, onCalled) {
	this.name = name;
	this.helpText = helpText;
	this.onCalled = onCalled;
};

Command.prototype.run = function() {
	// No matter what arguments are passed in push them through
    // JavaScript...sigh.
    var args = [].splice.call(arguments, 0);
    var returnedVal = this.onCalled.call(this, args);
    // Saw this called a lot, not sure it belongs in here
    this.trackHistory(args);
    return returnedVal;
};

Command.prototype.trackHistory = function(args) {
	console.log('History of ' + this.name + ' called with ' + args);
};

// This is your registry instance
var commands = new Commands();
// Now you use it.
commands.register('mkdir', 'Makes a directory', function(directoryName) {
	// Return your message
	return this.name + ' would create ' + directoryName;
});

// You can access by name dot notation wise
var msg = commands.mkdir.run('example');
console.log(msg);
// or using indices...
var dynamicName = 'mkdir';
if (commands[dynamicName]) {
    msg = commands[dynamicName].run('wheee');
    console.log(msg);
} else {
	console.log('The command ' + dynamicName + ' is not known.');
}

console.log('All commands');
// The registry allows for an all to loop over.
commands.all.forEach(function(cmd) {
	console.log(cmd.name, ': ', cmd.helpText);
});
