KISSY.add('os/plugins/youdao/index',function(S,Magix ){
return Magix.View.extend({
    tmpl: "<iframe src=\"http://dict.youdao.com/app/360\" frameborder=\"no\" style=\"width:100%;height:100%\" scrolling=\"no\"></iframe>",
    render: function() {
        this.setHTML(this.id, this.tmpl);
    }
});},{requires:['magix']})