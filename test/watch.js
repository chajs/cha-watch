// Load cha library.
var cha = require('cha')
var tasks = require('./tasks')
cha.watch = require('../')

// Register tasks that should chaining.
cha.in('read',    tasks.read)
   .in('cat',     tasks.cat)
   .in('coffee',  tasks.coffee)
   .in('write',   tasks.write)
   .in('uglifyjs',tasks.uglifyjs)

cha.watch('./fixtures/coffee/*.coffee', {
    cwd: __dirname,
    immediately: true
}, function(filepath, event, watched){

    cha().read(watched)
        .coffee()
        .cat()
        .uglifyjs()
        .write('./test/out/foobar3.js')
})
