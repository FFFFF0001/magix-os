/**
 * magix 项目打包脚本
 */
module.exports = function(grunt) {
    var FS = require('fs');
    var Path = require("path");
    var SEP = Path.sep;
    grunt.registerMultiTask('test', 'test it', function() {
        var src = this.data.src;
        var to = this.data.to;
        var reg = new RegExp(SEP.replace(/\\/g, '\\\\'), 'g');
        var depsReg = /var\s+([^=]+)=\s*require\(([^\(\)]+)\);?/g;
        var remainsReg = /[^\.]require\(([^\(\)]+)\);?/g;
        var walk = function(folder) {
            var files = FS.readdirSync(folder),
                key;
            files.forEach(function(file) {
                var path = folder + SEP + file;
                var stat = FS.lstatSync(path);
                if (stat.isDirectory()) {
                    walk(path);
                } else if (/\.js$/.test(path)) {
                    key = path.substring(src.length);
                    grunt.file.copy(path, to + key, {
                        process: function(content) {
                            var vars = [];
                            var deps = [];
                            content = content.replace(depsReg, function(match, key, str) {
                                vars.push(key);
                                deps.push(str);
                                return '';
                            }).replace(remainsReg, function(match, str) {
                                deps.push(str);
                                return '';
                            }).replace(/\bKISSY(?=\.)/g, 'S')
                                .replace(/module\.exports\s*=\s*/, 'return ')
                                .replace(/\btmpl\s*:\s*(['"])@([^'"]+)(?:\1)/g, function(m, s, name) {
                                var file = Path.dirname(path) + SEP + name + '.html';
                                if (FS.existsSync(file)) {
                                    return 'tmpl:' + JSON.stringify(grunt.file.read(file));
                                }
                                return 'tmpl:""';
                            }).replace(/\bcss\s*:([\s\S]*?)(['"])@([^'"]+)(?:\2)/g, function(m, fill, s, name) {
                                var file = Path.dirname(path) + SEP + name + '.css';
                                if (FS.existsSync(file)) {
                                    return 'css:' + fill + JSON.stringify(grunt.file.read(file));
                                }
                                return 'css:""';
                            });
                            return ['KISSY.add("',
                            key.substring(1).replace(reg, '/').replace(/\.js$/, ''),
                                '",function(S', vars.length ? (',' + vars.join(',')) : '', '){', content, '}',
                            deps.length ? ',{requires:[' + deps + ']}' : '', ');'].join('');
                        }
                    });
                } else {
                    key = path.substring(src.length);
                    var extname = Path.extname(path);
                    if (extname == '.html' || extname == '.css') {
                        var jsf = Path.dirname(path) + SEP + Path.basename(path, extname) + ".js";
                        if (!FS.existsSync(jsf)) {
                            grunt.file.copy(path, to + key);
                        }
                    } else {
                        grunt.file.copy(path, to + key);
                    }
                }
            });
        };
        walk(src);
    });
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            src: {
                files: ['tmpl/**/*'],
                tasks: ['test']
            }
        },
        test: {
            build: {
                src: 'tmpl',
                to: 'src'
            }
        }
    });
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
        if (action == 'deleted') {
            grunt.file.delete('src' + filepath.substring(4));
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
};