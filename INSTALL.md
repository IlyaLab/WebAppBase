### Operating System Support
> The example commands in this file are directed at Linux and Mac OS X users.  However, it should be expected (unless
> explicitly noted) that these technologies are supported by the Windows operating system.

### Basic Dependencies
  [Node.js v0.10.13](http://www.nodejs.org) or newer
> To install global tools, you can use *sudo* or you can change the install path for node libraries to a file path 
> in user space
 
  ```
  export NODE_PATH=$HOME/.node
  export PATH=$NODE_PATH:$PATH
  ```

### Build tools and libraries

> Globally install core build tools (yeoman, grunt, and bower)

```
[sudo] npm install -g yo grunt-cli bower
```

> Build and test dependencies (downloads and installs dependencies listed in package.json to the `node_modules` subdirectory, not to be checked-in)

```
cd /path/to/project
npm install
```

> Installs client-side JavaScript dependencies

```
cd /path/to/project
bower install
```
> Also run after adding a JS dependency in [bower.json](https://github.com/IlyaLab/WebAppBase/blob/master/bower.json)

### Starting a local instance of the application (with Grunt) 
> This serves the web app locally, opens a browser pointed at the local web server, and opens a watch task that 
> reloads the browser automatically when core files (html, css, js) are modified.  It does not build the web app for 
> distibution, as the code becomes difficult to debug when uglified/minified.

```
grunt server
```
> Browser should automatically open at [http://localhost:9010](http://localhost:9010)

### Building the project
> The entire static package should be created in the `dist` subdirectory.  This directory can be copied or linked from any web server serving static content as is

```
grunt build
```

> Alternative to generate un-minified, un-uglified JavaScript code

```
grunt build:debug
```
