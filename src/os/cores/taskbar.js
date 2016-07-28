KISSY.add('os/cores/taskbar',function(S,Magix ,XTmpl ){

return Magix.View.extend({
    tmpl: "<div class=\"start\"></div>{{#each list}}<div class=\"item\" title=\"{{name}}\" id=\"taskbar_{{id}}\" mx-click=\"active({id:'{{id}}'})\"><img src=\"{{icon view}}\"/></div>{{/each}}<div class=\"notify\"></div>",
    ctor: function() {
        var me = this;
        me.items = [];
    },
    activeItem: function(options) {
        S.one('#taskbar_' + options.id).addClass('item-active');
    },
    deactiveItem: function(options) {
        S.one('#taskbar_' + options.id).removeClass('item-active');
    },
    addItem: function(options) {
        var me = this;
        me.items.push(options);
        me.items[options.id] = options;
        me.render();
    },
    removeItem: function(options) {
        var me = this;
        var list = me.items;
        for (var i = 0; i < list.length; i++) {
            if (list[i] == options) {
                list.splice(i, 1);
                delete list[options.id];
                break;
            }
        }
        me.render();
    },
    render: function() {
        var me = this;
        console.log(me);
        var html = new XTmpl(me.tmpl).render({
            list: me.items
        });
        me.setHTML(me.id, html);
    },
    'active<click>': function(e) {
        var me = this;
        me.exchange().fire('taskbar-active', me.items[e.params.id]);
    }
});},{requires:['magix','xtemplate']})