var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: '@index',
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
});