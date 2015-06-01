var fs = require('fs');
var memFile = '/proc/meminfo'
var re = /^[Huge|NFS|Anon|Write|Bounce]/i;
var memObj_ = [];

//export the sample dataset
exports.getDataset = function () {
    var dataset = []
    for (var i=1;i<10;i++) {
        dataset.push( 5 * Math.random() * i);
    }
    return dataset;
}

var read_file = function (callback) {
    fs.readFile(memFile, function (err, data) {
    var memObj = [];
    lst_ = data.toString().split('\n');
    for (var i=0;i<lst_.length;i++) {
        tmp_ = lst_[i].replace('kB','');
        inner= tmp_.split(':');
        if (tmp_.match(re) || inner[0].length == 0 ) {
            continue;
        }
        memObj.push( { type : inner[0] , usage : inner[1]/1000 } );
    }
    callback(memObj);
    }) 
}

function readContent(memObj) {
    memObj_ = memObj;
    console.log("reading the content")
    console.log(memObj.length)
}

exports.getMemData = function () {
    read_file(readContent)
    return memObj_;
};
