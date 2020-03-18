import _ from 'underscore';
// var _ = {};
// ["Arguments",'Array', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'].forEach(name => {
//     _["is" + name] = function (obj) {
//         return Object.prototype.call(obj) === '[object ' + name + ']';
//     }
// });
(function(){
    
    
    {
        //新增函数的name属性
        function reset(){
        }
        var r = reset;
        if(_.isFunction(r)){
            console.log('输出函数的name方法',r.name);
        }
        var b = new reset();
        if(_.isFunction(b)){
            console.log('输出函数的name方法',b.name);
        }
    }

    {
        //使用解构获取参数
        function reset({location,user='灭霸'}={location:'中国',user:'jsonKK'}){
            console.log('使用解构获取函数参数location:',location);
            console.log('使用解构获取函数参数user:',user);
        }
        //如果只传一个参数且这个参数不在解构对象内，则两个都为undifind,并不会触发后面的默认值
        // reset('匈牙利');
        //如果都不传则会触发定义好的对象
        // reset();
        //完美触发默认值和传参
        reset({location:'匈牙利'});
    }
        
})()