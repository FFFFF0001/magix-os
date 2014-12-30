KISSY.add("os/plugins/clock/index",function(S,Magix ){
var Module = this;
return Magix.View.extend({
    tmpl:"<div class=\"clock-box\">\r\n    <div class=\"dot\"></div>\r\n    <div class=\"h animate\"></div>\r\n    <div class=\"m animate\"></div>\r\n    <div class=\"s animate\"></div>\r\n</div>",
    css: Magix.modulePath(Module, ".clock-box{width:130px;height:130px;background:url(@/images/trad.png) no-repeat;position:relative}\r\n.clock-box div{width:13px;height:129px;position:absolute;top:0px;left:58px}\r\n.clock-box .dot{background:url(@/images/trad_dot.png) no-repeat}\r\n.clock-box .h{background:url(@/images/trad_h.png) no-repeat}\r\n.clock-box .m{background:url(@/images/trad_m.png) no-repeat}\r\n.clock-box .s{background:url(@/images/trad_s.png) no-repeat}\r\n.clock-box .animate{\r\n    -webkit-transition:-webkit-transform 1s ease;\r\n    -moz-transition:-moz-transform 1s ease;\r\n    -o-transition:-o-transform 1s ease;\r\n    transition:transform 1s ease\r\n}"),
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
});},{requires:['magix']});