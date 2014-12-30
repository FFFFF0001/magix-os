var Magix = require('magix');
var IO = require('io');
module.exports = Magix.Model.extend({
    sync: function(callback) {
        var me = this;
        var url = me.get('url');
        IO({
            url: url,
            dataType: 'json',
            complete: function(data) {
                if (data.info && data.info.ok) {
                    callback(null, data.data);
                } else {
                    callback('bad response');
                }
            }
        });
    }
});