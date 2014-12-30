var Magix = require('magix');
var XTmpl = require('xtemplate');
module.exports = Magix.View.extend({
    tmpl: '@tool',
    render: function() {
        var me = this;
        me.request().all({
            name: 'Tools'
        }, function(e, m) {
            var html = new XTmpl(me.tmpl).render({
                list: m.get('list', [])
            });
            me.setHTML(me.id, html);
        });
    }
});