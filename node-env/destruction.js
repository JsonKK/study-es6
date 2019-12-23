var main = function () { 
    {
        let [x,y,z] = new Set(['a','b','c']);
        console.log(x);
    }
    
    
    function* fibs(){
        var a = 0;
        var b = 1;
        while(true){
            yield a;
            [a,b] = [b,a+b];
        }
    }
    var [first,second,third,fourth,fifth,sixth] = fibs();
    console.log('sixth:',sixth);

    //默认值
    {
        var [foo = true] = [];
        console.log('foo',foo);

        let [x,y='b'] = ['a'];
        console.log('x,y:',x,y);
    }

    //默认值是惰性取值的
    {
        function f(){
            console.log('f','aaaa');
            return 'f';
        }

        let [x = f()] = [];
        console.log('x',x);


        let y;
        if([1][0]){
            y = [1][0];
        }
        else{
            y = f();
        }
        console.log('y',y);
    }

    //易错的解构格式
    {
        let str = '易错的解构格式x=%d,y=%d:';
        let [x = 1,y = x] = [];
        console.log(str,x,y);

        [x = 1,y = x] = [2];
        console.log(str,x,y);

        [x = 1,y = x] = [1,2];
        console.log(str,x,y);
    }

    //对象解构
    {
        let str = '对象解构赋值foo=%s,bar=%s';
        let { foo , bar} = {foo : 'aaa' , bar : 'bbb'};
        console.log(str,foo,bar);

        var { baz } = {foo : 'aaa' , bar : 'bbb'};
        console.log(str+',baz=%s',null,null,baz);

        var { foo : baz} = {foo : 'aaa' , bar : 'bbb'};
        console.log(str+',baz=%s',null,null,baz);

        let obj = { first : 'hello' , last : 'world'};
        let {first : f,last : l} = obj;
        console.log('对象解构赋值f=%s,l=%s',f,l);

        //解决重复定义局部变量
        let repeat;
        ({repeat} = {repeat : 'aaa'});
        console.log('对象解构赋值repeat=%s',repeat);

        //嵌套对象解构
        ({obj} = {obj : {
            p : [
                'hello',{y:'world'}
            ]
        }});
        var {p : [x,{y}]} = obj;
        console.log('对象解构赋值x=%s,y=%s',x,y);

        var node = {
            loc : {
                start : {
                    line : 1,
                    column : 5
                }
            }
        }

        var {loc : {start,start:{line}}} = node;
        console.log('对象解构赋值start[column]=%s,line=%s',start && start.column,line);

        let arr = [];
        ({obj = {}} = {});
        ({foo : obj.prop,bar : arr[0]} = {foo : '123' , bar : true});
        console.log('obj,arr:',obj,arr);

        //对象的解构可以指定默认值
        var {x = 3} = {};
        console.log('对象解构可以指定默认值x=%s',x);
        var {x,y = 5} = {x:1};
        console.log('对象解构可以指定默认值x=%s,y=%s',x,y);
        //默认值完整格式
        var { message : msg = "Someting went wrong"} = {};
        console.log('对象解构默认值完整格式msg:',msg);

        //取到三角函数
        let {log,sin,cos} = Math;
        console.log('基本的三角函数log,sin,cos',log,sin,cos);

    }

    //字符串的解构赋值
    {
        const [a,b,c,d,e] = 'hello';
        console.log('a=%s,b=%s,c=%s,d=%s,e=%s',a,b,c,d,e);

        let {length : len} = 'hello';
        console.log('len=%d',len);
    }

    //函数参数解构赋值
    {
        function add([x,y]){
            return x + y;
        }
        console.log('x+y=%d',add([1,2]));

        console.log([[1,2],[3,4]].map(([a,b]) => a + b));

        function move({x = 0,y = 0}){
            return [x,y];
        }

        console.log('move',move({x:3,y:8}));
        console.log('move',move({x:3}));
        console.log('move',move({}));
        //console.log(move());//报错

        function move2({x,y}={x:0,y:0}){
            return [x,y];
        }
        console.log('move2',move2({x:3,y:8}));
        console.log('move2',move2({x:3}));
        console.log('move2',move2({}));
        console.log('move2',move2());
    }
    
}

module.exports = main;