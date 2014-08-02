cha-watch
=========
> Watch extension for cha.

## Install

Install watch extension for cha:
```sh
npm install cha-watch --save-dev
```

## Usage

Once the extension has been installed, it should required inside your scripts with this line of JavaScript:
```js
cha.watch = require('cha-watch')
```

Example script:

```js
var cha = require('cha')

cha.watch = require('cha-watch')

// Register tasks that should chaining.
cha.in('reader',    require('task-reader'))
    .in('coffee',   require('task-coffee'))
    .in('combine',  require('task-combine'))
    .in('writer',   require('task-writer'))
    .in('uglifyjs', require('task-uglifyjs'))


// Start watcher.
cha.watch('./fixtures/coffee/*.coffee', {
    cwd: __dirname,
    immediately: true
}, function(filepath, event, watched){

    cha().reader(watched)
        .coffee()
        .cat()
        .uglifyjs()
        .writer('./out/foobar3.js')
})

```

To run the command we prepend our script name with run:
```sh
$ npm run watch

> cha@0.0.1 watch
> node ./test/watch

read /test/fixtures/coffee/bar.coffee
read /test/fixtures/coffee/foo.coffee
concat /test/fixtures/coffee/bar.coffee,/test/fixtures/coffee/foo.coffee
write ./out/foobar3.js
```

## API
```js
cha.watch(patterns, options, callback)
```

### patterns
Defines what file patterns will watch. Can be a string or an array of files and/or minimatch patterns.

### options
* cwd {string} Set the current working directory, default is `process.cwd()`.
* immediately {boolean} Trigger the callback at startup of the watcher.
* interval {integer} Interval to pass to fs.watchFile.
* debounceDelay {integer} Delay for events called in succession for the same file/event.

### callback(filepath, event, watched)
Trigger the callback when an added, changed or deleted event occurs.

* filepath - The path of the file that added, changed or deleted.
* event
    * added - When a file has been added to a watch directory.
    * changed - When a file has been changed.
    * deleted - When a file has been deleted.
* watched - The currently watched files.
