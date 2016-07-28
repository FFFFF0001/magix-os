KISSY.add('os/plugins/clock/index',function(S,Magix ){
Magix.applyStyle('mp-bbf',".clock-box{width:130px;height:130px;background:url(src/os/plugins/clock/images/trad.png) no-repeat;position:relative}.clock-box div{width:13px;height:129px;position:absolute;top:0;left:58px}.clock-box .dot{background:url(src/os/plugins/clock/images/trad_dot.png) no-repeat}.clock-box .h{background:url(src/os/plugins/clock/images/trad_h.png) no-repeat}.clock-box .m{background:url(src/os/plugins/clock/images/trad_m.png) no-repeat}.clock-box .s{background:url(src/os/plugins/clock/images/trad_s.png) no-repeat}.clock-box .animate{-webkit-transition:-webkit-transform 1s ease;transition:transform 1s ease}");
return Magix.View.extend({
    tmpl: "<div class=\"clock-box\"><div class=\"dot\"></div><div class=\"h animate\"></div><div class=\"m animate\"></div><div class=\"s animate\"></div></div>",
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
});},{requires:['magix']})