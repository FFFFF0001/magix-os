KISSY.add('os/plugins/cal/index',function(S,Magix ){
return Magix.View.extend({
    tmpl: "<iframe src=\"http://rili.160.com/webrili/index.html\" frameborder=\"no\" style=\"width:100%;height:100%\"></iframe>",
    render: function() {
        this.setHTML(this.id, this.tmpl);
    }
});},{requires:['magix']})