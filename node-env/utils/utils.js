var _ = require('underscore');

var main = {
    
    //快速输出
    quiteConsole : function(parms,infoToken = _.random(0, 100),filePath = ''){
        var fileNameIndex = _.lastIndexOf(_.toArray(filePath),'\\');
        var fileName = filePath.toString().slice(fileNameIndex+1,filePath.length-3);
        console.info(fileName + '-' + infoToken + ':',parms);
    },
    //判断是否为对象
    isObject(obj){
        return Object.prototype.toString.call(obj) == '[object Object]' ?  true : false;
    },
    //递归拷贝
    deepClone(initalObj,finalObj){
        var obj = finalObj || {};
        for(var i in initalObj){
            var prop = initalObj[i];
            if(prop === obj){
                continue;
            }
            if(typeof prop === 'object'){
                obj[i] = (prop.constructor == Array) ? [] : {};
                main.deepClone(prop,obj[i]);
            }
            else{
                obj[i] = prop;
            }
        }
        return obj;
    },
    deepExtend() {
		var extended = {};
		var deep = false;
		var i = 0;
	
		// 判断是否为深拷贝
		if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
			deep = arguments[0];
			i++; //如果为深拷贝则初始的i为1或者为0
		}
	
		// 将对象属性合并到已存在的对象中
		var merge = function (obj) {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					// 如果属性为对象并且需要深拷贝时则使用函数递归、反之则将当前的属性替换现有的属性
					if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
						extended[prop] = main.deepExtend(extended[prop], obj[prop]);
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};
	
		// 遍历所有对象属性
		for (; i < arguments.length; i++) {
			merge(arguments[i]);
		}
	
		return extended;		
	}
}

module.exports = main;