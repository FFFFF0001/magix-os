KISSY.add("os/plugins/test/index",function(S,Magix ){
return Magix.View.extend({
    tmpl:"<div>\r\nadf<button mx-click=\"test()\">test</button>\r\n</div>",
    render: function() {
        this.setHTML(this.id, this.tmpl);
    },
    'test<click>': function() {
        this.dialog({
            id: 'abc',
            name: 'test',
            view: 'os/plugins/test/index'
        });
    }
});},{requires:['magix']});