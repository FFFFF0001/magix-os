/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Vframe = Magix.Vframe;

module.exports = Magix.View.extend({
    tmpl: '@desktop.html',
    init: function() {
        var me = this;
        var $win = S.one(window);
        var resize = function() {
            me.resize();
            var vf = Vframe.get('icon');
            if (vf) {
                vf.invoke('resize');
            }
        };
        $win.on('resize', resize);
        me.on('destroy', function() {
            $win.off('resize', resize);
        });
    },
    render: function() {
        var me = this;
        me.setHTML(me.id, me.tmpl);
        me.resize();
    },
    resize: function() {
        var icon = S.one('#icon');
        var taskbar = S.one('#taskbar');
        var vheight = S.DOM.viewportHeight();
        var tool = S.one('#tool');
        var h = vheight - taskbar.height();
        icon.height(h);
        tool.height(h);
    }
});