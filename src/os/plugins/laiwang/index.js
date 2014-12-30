KISSY.add("os/plugins/laiwang/index",function(S,Magix ){
return Magix.View.extend({
    tmpl:"<iframe src=\"https://www.laiwang.com/qr.html\" frameborder=\"no\" style=\"width:100%;height:100%\" scrolling=\"yes\"></iframe>",
    render: function() {
        this.setHTML(this.id, this.tmpl);
    }
});},{requires:['magix']});