KISSY.add('os/plugins/bmap/index',function(S,Magix ){
return Magix.View.extend({
    tmpl: "<iframe src=\"http://yueqian.sinaapp.com/app/dumap/dumap.html\" frameborder=\"no\" style=\"width:100%;height:100%\" scrolling=\"yes\"></iframe>",
    render: function() {
        this.setHTML(this.id, this.tmpl);
    }
});},{requires:['magix']})