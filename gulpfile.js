import gulp from 'gulp'
import bump from 'gulp-bump'
import { readFileSync, writeFileSync } from 'fs'

// Define a task to bump the version
gulp.task('bump', function () {
	return gulp.src('./package.json').pipe(bump()).pipe(gulp.dest('./'))
})

// Define the default task
gulp.task(
	'default',
	gulp.series('bump', function (done) {
		// Log the new version
		const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))
		console.log(`New version: ${pkg.version}`)
		done()
	})
)
