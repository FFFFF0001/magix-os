var Magix = require('magix');
var DD = require('dd');
var XTmpl = require('xtemplate');
var DialogState = {
    MAX: 'max',
    MIN: 'min',
    NORMAL: 'normal'
};
var Vframe = Magix.Vframe;
var Position = 0;
var Dialogs = [];
var Dialog = Magix.View.extend({
    tmpl: '@dialog.html',
    ctor: function(extra) {
        var me = this;
        me.extra = Magix.mix({
            max: true,
            min: true,
            close: true,
            resize: true,
            width: 500,
            height: 300
        }, extra);
        me.state = DialogState.NORMAL;
        me.temp = {};
        me.on('destroy', function() {
            me['close<click>']();
        });
    },
    render: function() {
        var me = this;
        var html = new XTmpl(me.tmpl).render({
            extra: me.extra,
            id: me.id
        });
        me.setHTML(me.id, html);
        var d = me.capture('dialog-move', new DD.Draggable({
            node: '#' + me.id + ' .dialog',
            halt: false,
            handlers: ['.title'],
            bufferTime: 0,
            clickPixelThresh: 0
        }));
        me.$move = d;
        var offset, disx, disy;
        d.on('dragstart', function(e) {
            offset = e.target.get('node').offset();
            disx = e.pageX;
            disy = e.pageY;
            me.showMask();
        });
        d.on('drag', function(e) {
            var x = e.pageX - disx + offset.left;
            var y = e.pageY - disy + offset.top;
            var node = e.target.get('node');
            if (x >= 0) node.css({
                left: x
            });
            if (y >= 0) node.css({
                top: y
            });
        });
        d.on('dragend', function() {
            me.hideMask();
        });
        if (me.extra.resize) {
            var drag = me.capture('dialog-resize', new DD.Draggable({
                node: '#' + me.id + ' .dialog',
                halt: false,
                handlers: ['.resizer'],
                bufferTime: 0,
                clickPixelThresh: 0
            }));
            var startX, startY, width, height;
            drag.on('dragstart', function(e) {
                console.log('dragstart', e);
                me.showMask();
                startX = e.pageX;
                startY = e.pageY;
                var node = e.target.get('node');
                width = node.width();
                height = node.height();
            });
            drag.on('drag', function(e) {
                var xOffset = e.pageX - startX;
                var yOffset = e.pageY - startY;
                e.target.get('node').css({
                    width: Math.max(width + xOffset, 150),
                    height: Math.max(height + yOffset, 50)
                });
            });
            drag.on('dragend', function() {
                me.hideMask();
            });
        }
        me.exchange().fire('dialog-add', me.extra);
        Dialog.active(me.id);
    },
    activeUI: function() {
        var me = this;
        me.showUI();
        me.hideMask();
        var node = S.one('#' + me.id + ' .title');
        if (node) node.addClass('title-active');
        me.exchange().fire('dialog-active', me.extra);
    },
    deactiveUI: function() {
        var node;
        var me = this;
        node = S.one('#' + me.id + ' .title');
        if (node) node.removeClass('title-active');
        me.exchange().fire('dialog-deactive', me.extra);
        me.showMask();
    },
    showMask: function() {
        var me = this;
        var mask = S.one('#mask_' + me.id);
        mask.show();
    },
    hideMask: function() {
        var me = this;
        var mask = S.one('#mask_' + me.id);
        mask.hide();
    },
    showUI: function() {
        var me = this;
        S.one('#' + me.id).show();
        Dialog.show(me.id);
        if (me.temp.state) {
            me.state = me.temp.state;
            me.temp.state = '';
        }
        if (me.state == DialogState.MAX) {
            me.resize();
        }
    },
    hideUI: function() {
        var me = this;
        me.exchange().fire('dialog-min', me.extra);
        S.one('#' + me.id).hide();
        Dialog.hide(me.id);
        me.temp.state = me.state;
        me.state = DialogState.MIN;
    },
    resize: function() {
        var me = this;
        if (me.state == DialogState.MAX) {
            var pNode = S.one('#icon');
            var node = S.one('#' + me.id + ' .dialog');
            var width = pNode.width();
            var height = pNode.height() - node.one('.title').height();
            node.css({
                width: width,
                height: height,
                left: 0,
                top: 0
            });
        }
    },
    'close<click>': function() {
        var me = this;
        me.owner.unmountVframe();
        me.exchange().fire('dialog-remove', me.extra);
        Dialog.remove(me.id);
        var node = S.one('#' + me.id);
        if (node) node.remove();
    },
    'active<mousedown>': function() {
        Dialog.active(this.id, 1);
    },
    'hide<click>': function() {
        this.hideUI();
    },
    'toggle<click>': function() {
        var me = this;
        var node = S.one('#' + me.id + ' .dialog');
        console.log(me.state);
        if (me.state == DialogState.NORMAL) {
            var pNode = S.one('#icon');
            var width = pNode.width();
            var height = pNode.height() - node.one('.title').height();
            console.log(width, height);
            me.temp.nodeStyle = {
                left: node.css('left'),
                top: node.css('top'),
                width: node.css('width'),
                height: node.css('height')
            };
            node.css({
                width: width,
                height: height,
                left: 0,
                top: 0
            });
            me.state = DialogState.MAX;
            node = S.one('#resizer_' + me.id);
            node.hide();
            me.$move.set('disabled', true);
        } else {
            me.state = DialogState.NORMAL;
            me.$move.set('disabled', false);
            node.css(me.temp.nodeStyle);
            node = S.one('#resizer_' + me.id);
            node.show();
        }
    },
    '$win<resize>': function() {
        this.resize();
    }
}, {
    add: function(id) {
        Dialogs.push(id);
        Dialogs[id] = {};
    },
    opened: function(id) {
        return Dialogs[id];
    },
    remove: function(id) {
        delete Dialogs[id];
        for (var i = Dialogs.length - 1; i >= 0; i--) {
            if (Dialogs[i] == id) {
                Dialogs.splice(i, 1);
                break;
            }
        }
        Dialog.active();
    },
    hide: function(id) {
        var info = Dialogs[id];
        info.hide = true;
        Dialog.active();
    },
    show: function(id) {
        var info = Dialogs[id];
        info.hide = false;
    },
    adjust: function(id) {
        var temp, move, info;
        for (var i = Dialogs.length - 1; i >= 0; i--) {
            if (id) {
                if (Dialogs[i] == id) {
                    Dialogs.splice(i, 1);
                    move = true;
                    temp = id;
                    break;
                }
            } else {
                info = Dialogs[temp = Dialogs[i]];
                if (!info.hide) {
                    Dialogs.splice(i, 1);
                    move = true;
                    break;
                }
            }
        }
        if (move) {
            Dialogs.push(temp);
        }
        return move ? temp : null;
    },
    active: function(id, ignore) {
        var vf;
        if (id == Dialog.lId) {
            vf = Vframe.get(id);
            if (!ignore && vf) {
                vf.invoke('hideUI');
            }
            return;
        }
        if (Dialog.lId) {
            vf = Vframe.get(Dialog.lId);
            if (vf) {
                vf.invoke('deactiveUI');
            }
        }
        id = Dialog.adjust(id);
        if (id) {
            vf = Vframe.get(id);
            if (vf) {
                vf.invoke('activeUI');
            }
            Dialog.lId = id;
            for (var i = Dialogs.length - 1; i >= 0; i--) {
                S.one('#' + Dialogs[i] + ' .dialog').css('z-index', i);
            }
        } else {
            Dialog.lId = '';
        }
    },
    create: function(id, options, view) {
        S.one('#taskbar').before('<div id="' + id + '"/>');
        Dialog.add(id);
        if (!options.left && !options.top) {
            options.left = Position * 30 + 130;
            options.top = Position * 30 + 30;
            Position++;
            if (Position > 5) Position = 0;
        }
        view.owner.mountVframe(id, 'os/cores/dialog', options);
    }
});
Magix.View.merge({
    dialog: function(options) {
        var id = options.id;
        if (Dialog.opened(id)) {
            Dialog.active(id, 1);
        } else {
            Dialog.create(id, options, this);
        }
    }
});
module.exports = Dialog;