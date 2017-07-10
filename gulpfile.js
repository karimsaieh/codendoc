var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


gulp.task('default', function(){
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {
            PORT:8003
        },
        ignore: ['./node_modules/**','./users/**','./docs/**']
    })
    .on('restart', function(){
        console.log('Restarting');
    });
});