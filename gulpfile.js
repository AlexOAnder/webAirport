var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	browserSync = require('browser-sync');

gulp.task('sassCompile',function(){
	return gulp.src('app/sass/**/*.+(sass|scss)')
	.pipe(sass())
	.pipe(gulp.dest('app/css/'))
	.pipe(browserSync.reload({stream:true}))

});
// run browserSyncTask BEFORE watchAll
// sassCompile do again for the browser work
gulp.task('watchAll', ['browserSyncTask','sassCompile'] ,
	 function(){
	 	// sass watch 
		gulp.watch('app/sass/**/*.sass',['sassCompile']);
		// html and js watch
		gulp.watch('app/**/*.html',browserSync.reload);
		gulp.watch('app/js/**/*.js',browserSync.reload);
});

gulp.task('browserSyncTask',function(){
	browserSync({
		server : {
			baseDir : 'app'
		},
		notify : false
	});
});