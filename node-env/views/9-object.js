var utils = require('../utils/utils.js');
var _ = require('lodash');
const fs = require('fs');

var main = function(){
    utils.isObject({});
    {
        const cart = {
            _wheels : 4,
            get wheels(){
                return this._wheels;
            },
            set wheels(value){
                if(value > this._wheels){
                   this._wheels = value;
                }
                return this._wheels
            }
        }
        cart.wheels = 3
        console.log('对象set 和 get方法的使用：',cart.wheels);
    }

    {
        const obj = {
            f(){
                this.foo = 'bar';
            }
        }
        //简写的方法不能使用构造函数
        // new obj.f();

        //允许使用表达式对对象属性命名
        let propKey = 'foo';
        let data = {
            [propKey] : 'baz',
            ['a' + 'bc'] : 'ABC'
        }
        console.log('使用表达式对对象属性命名:',data);

        //表达式定义方法名
        let h = 'hello';
        let obj2 = {
            [h](){
                return 'hello world'
            }
        }
        console.log('使用表达式定义方法名',obj2[h]());


        //返回指定对象上自有属性的描述符
        let obj3 = {
            get foo(){
                return 'something'
            }
        }

        console.log('对象上自有属性输出',Object.getOwnPropertyDescriptor(obj3,'foo'));

        obj3.arr = [1,2,3];

        console.log('对象上自有属性输出',Object.getOwnPropertyDescriptor(obj3,'arr'));
    }

    // {
    //     let { x, y,...z} = { x: 1, y: 2, a: 3, b: 4 };
    //     console.log('解构赋值输出的对象:',{x,y});
    // }

    {
        let obj =  { width: 'aaa', bar: 'bbb' }
        let { width, foo } = obj;
        console.log('width',width);
    }

    {
        let num = 999;
        let count = 0;

        do
        {
            count++;
            num = parseInt(num/10); 
        }
        while(num >0);

        console.log("它是个" + count + "位的数！");
    }

    {
        //使用is方法
        console.log('NaN === NaN:',NaN === NaN);
        console.log('Object.is(NaN,NaN)',Object.is(NaN,NaN));

        console.log('+0 === -0',+0 === -0);
        console.log('Object.is(+0,-0)',Object.is(+0,-0));
    }

    {
        // 实现浅拷贝
        function cloneObj(){
            let obj = {};
            if(arguments[0] && utils.isObject(arguments[0])){
               for(let i in arguments[0]){
                   obj[i] = arguments[0][i]
               } 
            }
            return obj;
        }

        let obj = {
            a : 'hello',
            b : {
                a : 'world',
                b : 21
            },
            c : ['Bob','Tom','Jenney'],
            d : function(){
                alert('hello world')
            }
        }

        let cObj = utils.deepClone(obj,{b:{c:24}})
        console.log('深拷贝后的值',JSON.stringify(cObj.b));
        var obj1 = { body: { a: 10 } };
        var obj2 = { body: obj1.body };
        obj2.body.a = 20;
        console.log(obj1.body.a);
    }

    {
        //objcet.asssign 进行的是浅拷贝，拷贝的对象是属性的引用，而不是对象的本身
        let obj = {
            a : { a : 'kobe',b : 39}
        };
        let obj2 = {a : {c : 'james'}};
        let initalObj = Object.assign({},obj,obj2);
        initalObj.a.a = 'wade';
        console.log('initalObj',JSON.stringify(initalObj));
    }

    {
        // 通过 nodejs 判断同级目录下的 ’ykt.json’文件是否存在，若存在则用同步的方式打开文件并在末尾追加任意数据，请写出具体代码
        fs.readFile('./ykt.json',function(error,data){
            if(error){
                console.log(error);

            }
            console.log(data);
        })
    }
}

module.exports = main;