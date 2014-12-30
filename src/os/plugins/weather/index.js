KISSY.add("os/plugins/weather/index",function(S,Magix ){
var Module = this;
return Magix.View.extend({
    tmpl:"<div>\r\n    <iframe width=\"280\" scrolling=\"no\" height=\"25\" frameborder=\"0\" allowtransparency=\"true\" src=\"http://i.tianqi.com/index.php?c=code&id=34&icon=1&num=3\"></iframe>\r\n</div>",
    css: Magix.modulePath(Module, "div{background: #fff;padding-left:10px;}"),
    render: function() {
        var me = this;
        me.setHTML(me.id, me.tmpl);
    }
});},{requires:['magix']});