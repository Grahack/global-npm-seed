# Global NPM Seed Project

This is a tutorial and a template for creating your own CLI with node!

## Getting Setup

Make sure that you have node and npm installed.

Start by creating an empty directory and navigate to it in your terminal. Run ```npm init``` which will ask you a couple of questions about the module that you are building, such as name, versions, repository and author. Once it has all the information, it will compile it into *package.json*, which stores other inforamtion such as dependencies.

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

The directories property is the one that makes this all work. By setting *directories.bin*, we are telling npm which file or directory contains the files to be added to the system PATH.

For this demo, we want users to be able to run ```hello``` from the terminal, so I need to create a new directory *bin* and create a file called *hello* in it.

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
