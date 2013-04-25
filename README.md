# Global NPM Seed Project

This is a tutorial and a template for creating your own CLI with node!

## Getting Setup

Make sure that you have node and npm installed.

Start by creating an empty directory and navigate to it in your terminal. Run ```npm init``` which will ask you a couple of questions about the module that you are building such as name, versions, repository and author. You can use the default values for all of these, or enter some real data if you want.

Once it has all the information, it will compile it into *package.json*. *package.json* holds other data and metadata to identify and install your module.

## Modifying Package.json

We need to make a couple of changes to *package.json* to get started.

### Prefer Global

The first property to add is ```preferGlobal```. preferGloabl is a handy little property that tell npm this module is intended to be used from the terminal. If a user tries to install the module locally, npm will warn them that the package is intended for global installation.

```
{
  ...
  "preferGlobal": "true",
  ...
}
```

### Directories Property

The ```directories``` property is the one that makes this all work. By setting ```directories.bin```, we are telling npm which file or directory contains the files to be added to the system PATH.

For this demo, we want users to be able to run ```hello``` from the terminal, so I need to create a new directory *bin* and create a file called *hello* in it. Then add the ```directories``` property to *package.json*. Now when our module is installed the user will be able to access ./bin/hello from the terminal.

```
{
  ...
  "preferGlobal": "true",
  "directories": {
    "bin": "./bin"
  },
  ...
}
```

## Our "Main" File

Create a directory called *lib* in your modules folder, and create *hello.js* inside of it. This file is going to contain all of our functionality. For now, it will display "Hello World!".

### ./lib/hello.js
```
console.log('Hello World!');
```

We have our file ready to go, we still need to link the terminal and this file by modifying *./bin/hello*

## Linking

This is the file that is going to be executed by our terminal. We need it to do two things:

1. Use a shebang to parse the contents as node.js code
2. Execute the contents of *./lib/hello.js*

### ./bin/hello
```
#!/usr/bin/env node
require('./../lib/hello.js');
```

Line one is a [shebang][1]. Line two is a require statement that requires our main file which will be executed. We now have all the pieces in place to test our CLI.

## Installing Your Module

Navigate to your projects root directory, and exectute:

```
npm install -g ./
```

This is telling npm to install the module location in the current directory as a global module, which is exactly what we want. ```-g``` is a flag that specifies that the module should be installed globally.

Now you can test the module by running
```
> hello
"Hello World!"
```

## Adding Support For Argument

Our module is cool, but lets add a optional command-line argument to personalize the greeting. Adding support for --name=myname will do just that.

To do this, we are going to add a dependency to *package.json*

### package.json
```
{
  ...
  "dependencies": {
    "optimist": "~0.3.5"
  }
  ...
}
```

[Optimist](https://github.com/substack/node-optimist) is a node module that helps parse command-line arguments. Now that it is included in out dependencies, npm will install optimist whenever somebody installs our module.

### Modifying ./lib/hello.js

In our main file, we now need to parse the command-line arguments.

## ./lib/hello.js
```
var argv = require('optimist').argv;

conosle.log('Hello ' + (argv.name || 'World') + '!');
```

Now we check to see if the user provided a name. If they did, we greet them with their name, else we greet them with our generic message.

## Reinstalling

Run ```npm install -g ./``` to reinstall the module. This time, optimist is also going to be installed. Now you should be able to run hello with the name argument.

```
> hello
Hello World
```
```
> hello --name=Andrew
Hello Andrew!
```

### Questions?

If you have a question, open an issue. I would love to help you setup your first command-line interface!

[1]: http://en.wikipedia.org/wiki/Shebang_(Unix)
