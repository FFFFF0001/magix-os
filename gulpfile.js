var tmplFolder = 'tmpl'; //template folder
var srcFolder = 'src'; //source folder
var buildFolder = 'build'; //build folder
var excludeTmplFolders = [

];
var onlyAllows = {
    '.html': 1,
    '.css': 1,
    '.json': 1,
    '.png': 1
};

var KISSYTmpl = 'KISSY.add(\'${moduleId}\',function(S){${content}})';
var KISSYTmplDeps = 'KISSY.add(\'${moduleId}\',function(S,${vars}){${content}},{requires:[${requires}]})';
var gulp = require('gulp');
var watch = require('gulp-watch');
var fs = require('fs');
var del = require('del');
var combineTool = require('magix-combine');
combineTool.addProcessor('file:loader', function() {
    var moduleExportsReg = /\bmodule\.exports\s*=\s*/;
    return {
        process: function(o) {
            var tmpl = o.requires.length ? KISSYTmplDeps : KISSYTmpl;
            for (var p in o) {
                var reg = new RegExp('\\$\\{' + p + '\\}', 'g');
                tmpl = tmpl.replace(reg, (o[p] + '').replace(/\$/g, '$$$$'));
            }
            tmpl = tmpl.replace(moduleExportsReg, 'return ');
            return tmpl;
        }
    };
});
combineTool.config({
    htmlminifierOptions: {
        removeComments: true, //注释
        collapseWhitespace: true, //空白
        //removeAttributeQuotes: true, //属性引号
        quoteCharacter: '"',
        keepClosingSlash: true, //
    },
    loaderType: 'kissy',
    excludeTmplFolders: excludeTmplFolders,
    onlyAllows: onlyAllows,
    prefix: 'mp-',
    tmplCommand: /\{\{[\s\S]+?\}\}/g
});

gulp.task('cleanSrc', function() {
    return del(srcFolder);
});
gulp.task('combine', ['cleanSrc'], function() {
    combineTool.combine();
});


gulp.task('watch', ['combine'], function() {
    watch(tmplFolder + '/**/*', function(e) {
        if (fs.existsSync(e.path)) {
            combineTool.processFile(e.path);
        } else {
            combineTool.removeFile(e.path);
        }
    });
});

var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
gulp.task('cleanBuild', function() {
    return del(buildFolder);
});
gulp.task('build', ['cleanBuild'], function() {
    combineTool.build();
    gulp.src(buildFolder + '/**/*.js')
        .pipe(uglify({
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }))
        .pipe(gulp.dest(buildFolder));

    gulp.src(buildFolder + '/**/*.css')
        .pipe(cssnano({
            safe: true
        }))
        .pipe(gulp.dest(buildFolder));
});