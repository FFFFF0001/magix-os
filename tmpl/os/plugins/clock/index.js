var Magix = require('magix');
var Module = this;
module.exports = Magix.View.extend({
    tmpl: '@index',
    css: Magix.modulePath(Module, '@index'),
    render: function() {
        var me = this;
        me.setHTML(me.id, me.tmpl);
        var clock = S.one('#' + me.id + ' .clock-box');
        var clock = S.one('.clock-box');
        var dom_h = clock.one('.h'),
            dom_m = clock.one('.m'),
            dom_s = clock.one('.s');
        var clockmove = function() {
            var time = new Date(),
                h = time.getHours(),
                m = time.getMinutes(),
                s = time.getSeconds();
            h = h > 12 ? h - 12 : h;
            h = h * 360 / 12 + parseInt(m / 12, 10) * 6;
            m = m * 360 / 60;
            s = s * 360 / 60;
            dom_h.css('transform', 'rotate(' + (h + 360) + 'deg)');
            dom_m.css('transform', 'rotate(' + (m + 360) + 'deg)');
            dom_s.css('transform', 'rotate(' + (s + 360) + 'deg)');
        };
        setTimeout(clockmove, 30);
        setTimeout(function() {
            dom_h.removeClass('animate');
            dom_m.removeClass('animate');
            dom_s.removeClass('animate');
        }, 1000);
        setInterval(clockmove, 1000);
    }
});