var gulp       = require("gulp");
var nodemon    = require("gulp-nodemon");
var sass       = require("gulp-sass");
var livereload = require("gulp-livereload");

gulp.task("nodemon", function() {
  nodemon({
    script: "server.js"
  }).on("restart", function() {
    setTimeout(livereload.reload, 1000);
  });
});
gulp.task("sass", function() {
  return gulp.src("public/scss/**/*.scss")
    .pipe(sass({
      includePaths   : ["node_modules/foundation-apps/scss"],
      errLogToConsole: true
    }))
    .pipe(gulp.dest("public/css"))
    .pipe(livereload());
});
gulp.task("hbs", function() {
  return gulp.src("views/**/*.hbs")
    .pipe(livereload());
});
gulp.task("watch", function() {
  livereload.listen();
  gulp.watch("public/scss/**/*.scss", ["sass"])
    .on("change", livereload.changed);
  gulp.watch("views/**/*.hbs", ["hbs"])
    .on("change", livereload.changed);
});
//define tasks
gulp.task("default", ["nodemon", "sass", "hbs", "watch"]);