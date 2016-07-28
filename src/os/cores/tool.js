KISSY.add('os/cores/tool',function(S,Magix ,XTmpl ){

return Magix.View.extend({
    tmpl: "{{#each list}}<div mx-vframe=\"true\" mx-view=\"{{view}}\" class=\"item\" style=\"right:{{right}}px;{{#if top}}top:{{top}}{{else}}bottom:{{bottom}}{{/if}}px;width:{{width}}px;height:{{height}}px\"></div>{{/each}}",
    render: function() {
        var me = this;
        me.request().all({
            name: 'Tools'
        }, function(e, m) {
            var html = new XTmpl(me.tmpl).render({
                list: m.get('data.list', [])
            });
            me.setHTML(me.id, html);
        });
    }
});},{requires:['magix','xtemplate']})