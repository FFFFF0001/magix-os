/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var VOM = Magix.VOM;

module.exports = Magix.View.extend({
    tmpl: '@desktop',
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
    },
    '$win<resize>': function() {
        this.resize();
        var vf = VOM.get('icon');
        if (vf) {
            vf.invokeView('resize');
        }
    }
});