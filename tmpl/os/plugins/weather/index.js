var Magix = require('magix');
var Module = this;
module.exports = Magix.View.extend({
    tmpl: '@index',
    css: Magix.modulePath(Module, '@index'),
    render: function() {
        var me = this;
        me.setHTML(me.id, me.tmpl);
    }
});