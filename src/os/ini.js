KISSY.add("os/ini",function(S,Magix ,XTmpl ){/*
    author:xinglie.lkf@taobao.com
 */


var VOM = Magix.VOM;
var Exchange = Magix.local;
var View = Magix.View;
var VOM = Magix.VOM;
Magix.modulePath = function(module, str) {
    var info = module.packageInfo;
    var base = info.base;
    var name = module.name;
    var url = base + name.substring(0, name.lastIndexOf('/'));
    return str.replace(/@/g, url);
};
XTmpl.addCommand('icon', function(scopes, option) {
    var view = option.params[0];
    var key = view.substring(0, view.indexOf('/'));
    var packages = S.config('packages');
    var pk = packages[key];
    if (pk) {
        return pk.base + view.substring(0, view.lastIndexOf('/')) + '/icon.png';
    }
    return '';
});
Exchange.on('taskbar-active', function(e) {
    var node = S.one('#anim_' + e.id);
    if (node) {
        node.stop(true);
    }
    var d = S.require('os/cores/dialog');
    d.active(e.id);
});
var InvokeTaskbarView = function(method, params) {
    var vf = VOM.get('taskbar');
    if (vf) {
        vf.invokeView(method, params);
    }
};
Exchange.on('dialog-add', function(e) {
    InvokeTaskbarView('addItem', e);
});
Exchange.on('dialog-remove', function(e) {
    InvokeTaskbarView('removeItem', e);
});
Exchange.on('dialog-active', function(e) {
    InvokeTaskbarView('activeItem', e);
});
Exchange.on('dialog-deactive', function(e) {
    InvokeTaskbarView('deactiveItem', e);
});
Exchange.on('dialog-min', function(e) {
    var node = S.one('#' + e.id + ' .title');
    var offset = node.offset();
    var id = 'anim_' + e.id;
    S.one('body').append(S.substitute('<div class="dialog-anim" style="width:{width}px;height:{height}px;left:{left}px;top:{top}px;position:absolute" id="{id}"/>', {
        width: node.outerWidth(),
        height: node.height(),
        left: offset.left,
        top: offset.top,
        id: id
    }));
    var aim = S.one('#taskbar_' + e.id);
    node = S.one('#' + id);
    offset = aim.offset();
    node.animate({
        left: offset.left,
        top: offset.top,
        width: aim.width()
    }, {
        duration: 0.3,
        useTransition: true,
        complete: function() {
            node.remove();
        }
    });
});
View.merge({
    exchange: function() {
        return Exchange;
    }
});
console.log(Magix.config('skin'));
return {
    defaultPath: '/index',
    defaultView: 'os/cores/desktop',
    exts: [
        'os/themes/' + Magix.config('skin') + '/index.css',
        'os/models/manager',
        'os/cores/dialog'
    ]
};},{requires:['magix','xtemplate']});