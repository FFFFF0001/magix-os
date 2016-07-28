var Magix = require('magix');
var IO = require('io');
var Service = Magix.Service.extend(function(bag, callback) {
    var url = bag.get('url');
    IO({
        url: url,
        dataType: 'json',
        complete: function(data) {
            if (data.info && data.info.ok) {
                bag.set('data', data.data);
                callback();
            } else {
                callback('bad response');
            }
        }
    });
});
var Module = this;
Service.add([{
    name: 'Apps',
    url: Magix.modulePath(Module, '@/apis/apps.json'),
    after: function(m) {
        var list = m.get('data.list', []);
        m.set('map', Magix.toMap(list, 'id'));
    }
}, {
    name: 'Tools',
    url: Magix.modulePath(Module, '@/apis/tools.json')
}]);
Magix.View.merge({
    request: function() {
        var r = new Service();
        return this.capture(r.id, r);
    }
});
module.exports = Service;