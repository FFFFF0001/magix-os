KISSY.add("os/plugins/kuaidi/index",function(S,Magix ){
return Magix.View.extend({
    tmpl:"<iframe src=\"http://baidu.kuaidi100.com/index2.html\" frameborder=\"no\" style=\"width:100%;height:100%\" scrolling=\"no\"></iframe>",
    render: function() {
        this.setHTML(this.id, this.tmpl);
    }
});},{requires:['magix']});