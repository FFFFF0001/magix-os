KISSY.add("os/models/model",function(S,Magix ,IO ){

return Magix.Model.extend({
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
});},{requires:['magix','io']});