KISSY.add('os/plugins/test/index',function(S,Magix ){
return Magix.View.extend({
    tmpl: "<div>adf<button mx-click=\"test()\">test</button></div>",
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
});},{requires:['magix']})