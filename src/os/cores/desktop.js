KISSY.add("os/cores/desktop",function(S,Magix ){/*
    author:xinglie.lkf@taobao.com
 */

var VOM = Magix.VOM;

return Magix.View.extend({
    tmpl:"<div mx-vframe=\"true\" mx-view=\"os/cores/tool\" class=\"tool\" id=\"tool\"></div>\r\n<div mx-vframe=\"true\" mx-view=\"os/cores/icon\" class=\"icon\" id=\"icon\"></div>\r\n<div mx-vframe=\"true\" mx-view=\"os/cores/taskbar\" class=\"taskbar\" id=\"taskbar\"></div>",
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
});},{requires:['magix']});