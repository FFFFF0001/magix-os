var Magix = require('magix');
var XTmpl = require('xtemplate');
module.exports = Magix.View.extend({
    tmpl: '@icon',
    render: function() {
        var me = this;
        me.request().all({
            name: 'Apps'
        }, function(e, m) {
            var html = new XTmpl(me.tmpl).render({
                list: m.get('list', [])
            });
            console.log(m);
            me.map = m.get('map');
            me.setHTML(me.id, html);
            me.resize();
        });
    },
    resize: function() {
        var me = this;
        var height = S.one('#' + me.id).height();
        var items = S.all('#' + me.id + ' .item');
        if (items.length) {
            var first = items.item(0);
            var iheight = first.outerHeight();
            var iwidth = first.outerWidth();
            var left = 0;
            var top = 0;
            items.each(function(it) {
                it.css({
                    left: left,
                    top: top
                });
                top += iheight;
                if (top + iheight > height) {
                    top = 0;
                    left += iwidth;
                }
            });
        }
    },
    'open<click>': function(e) {
        var me = this;
        me.dialog(me.map[e.params.id]);
    }
});