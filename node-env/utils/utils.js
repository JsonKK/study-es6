var _ = require('underscore');

var main = {
    //快速输出
    quiteConsole : function(parms,infoToken = _.random(0, 100),filePath = ''){
        var fileNameIndex = _.lastIndexOf(_.toArray(filePath),'\\');
        var fileName = filePath.toString().slice(fileNameIndex+1,filePath.length-3);
        console.info(fileName + '-' + infoToken + ':',parms);
    }
}

module.exports = main;