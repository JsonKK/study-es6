
var main = function () {

    {
        //Reflect.ownKeys()方法可以返回所有类别的键名，包括常规键名和symbol键名
        var obj = {
            [Symbol('mykey')]: 1,
            enum: 2,
            noenum: 3
        }
        console.info('输出多种键名', JSON.stringify(Reflect.ownKeys(obj)));
    }

    {
        let size = Symbol('size');

        class Collection {
            constructor() {
                this[size] = 0;
            }

            add(item) {
                this[this[size]] = item;
                this[size]++;
            }

            static sizeOf(instance) {
                return instance[size];
            }
        }

        let x = new Collection();
        Collection.sizeOf(x) // 0

        x.add('foo');
        Collection.sizeOf(x) // 1

        console.log(Object.keys(x)); // ['0']
        console.log(Object.getOwnPropertyNames(x)); // ['0']
        console.log(Object.getOwnPropertySymbols(x)); // [Symbol(size)]
        console.log(x[size]);
    }

    {
        let obj = {
            a : 1,
            b : 2
        }
        let a = Symbol('foo');
        obj[a] = 3;
        const PROP_NAME = Symbol('pr');
        const PROP_AGE = Symbol('age');
        obj[PROP_NAME]= "哈哈哈！" ; 
        obj[PROP_AGE] = 18 
        document.getElementById('symbol').innerHTML = obj[PROP_NAME];
        Object.getOwnPropertySymbols(obj).forEach(function(o){
            console.log('遍历出所有包含symbol为key的值',obj[o]);
        })
        
    }

    {
        let deg = Symbol('bar');
        console.log(deg.toString());
    }

    {
        //消除魔法字符串
        const shapeType = {
            triangle : Symbol('Triangle')
        };

        function getArea(shape,options){
            let area = 0;
            switch (shape){
                case shapeType.triangle:
                    area = .5 * options.width * options.height;
                    break;
            }
            return area;
        }

        console.log(getArea(shapeType.triangle , {width : 100, height : 100}));
    }

    {   
        //global._foo 被预先定义，得到了失真的脚本
        global[Symbol.for('foo')] = {foo : 'world'};
        const a = require('./test');
        console.log(a.foo,'a.foo');
    }
    
    {
        //创建两个相同的symbol
        var s1 = Symbol('s');
        var s2 = Symbol.for('s');
        var s3 = Symbol.for('s');
        // 不相等
        console.log(s1 == s2);
        //相等
        console.log(s3 == s2);
    }

    {
        //测试是否存在iframe
        let iframe = document.getElementById('iframe');
        console.log('iframe内是否存在定义的foo',iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo'));
    }

    {
        //定义一个对象
        //对象已经存在一个key,要增加一个键值，为了避免Key名称重复使用symbol
        const obj = {
            name : 'chef',
            skill : 'cooking'
        }
        const skill = Symbol('skill');
        obj[skill] = 'manage';
        //输出symbol描述
        console.log('输出symbol描述',skill.description);
        //可以发现symbol在对象内是不可枚举的
        console.log(Object.keys(obj))
        // 可以同时获取得到字符串skill和symbol skill
        console.log(obj.skill,obj[skill]);
    }

    {
        // 获取对象中的symbol
        const obj = {
            [Symbol('apple')] : 'apple',
            [Symbol('orange')] : 'orange',
            banner : 'banner'
        }
        // 得到使用symbol的数组，遍历数组得到symbol描述
        for(let i of Object.getOwnPropertySymbols(obj)){
            console.log(i.description);
        }
        // 使用oweKeys方法，得到所有键名
        console.log(Reflect.ownKeys(obj));
    }

    {
        // 创建已经存在的symbol
        let s1 = Symbol.for('apple');
        let s2 = Symbol.for('apple');
        
        const obj = {
            [s1] : 'banner'
        }
        
        obj[s2] = 'pair';
        //因为s2 === s1 所哟得到pair
        console.log(obj[s1]);
    }

    {
        // Symbol.hasInstance 方法的使用
        const Foo = function(){
            this[Symbol.hasInstance] = function(num){
                return Number(num) % 2 === 0;
            }
        }

        const foo = new Foo();

        console.log(2 instanceof foo);
        console.log(foo instanceof Foo)
    }

    {
        // 测试改变对象的instance
        //对象的instanceof是不能改变的
        // Object.prototype[Symbol.hasInstance] = function(num){
        //     console.log('xixihaha')
        //     return Number(num) % 2 === 0;
        // }

        // console.log(2 instanceof Object);
    }

    {
        // 与concat结合使用
        let arr = [3,4];
        // [1, 2, 3, 4, 5] 默认是展开的
        console.log([1,2].concat(arr,5));
        // 设置 Symbol.isConcatSpreadable 为false时候，数组是不展开的
        arr[Symbol.isConcatSpreadable] = false;
        //[1, 2, Array(2), 5]
        console.log([1,2].concat(arr,5));

        // 在类中使用
        class A1 extends Array{
            constructor(args){
                // 暂时不知道super是什么含义
                super(args);
                this[Symbol.isConcatSpreadable] = true;
            }
        }

        class A2 extends Array{
            constructor(args){
                super(args);
                this[Symbol.isConcatSpreadable] = false;
            }
        }

        let a1 = new A1();
        a1[0] = 1;
        a1[1] = 2;
        let a2 = new A2();
        a2[0] = 3;
        a2[1] = 4;
        //[0, 1, 2, Array(2)] a2 设置了symbol.isConcatSpreadable 为false所以不展开
        console.log([0].concat(a1).concat(a2));
    }

    {   
        //实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。
        // 修改衍生对象
        class MyArray extends Array{
            static get [Symbol.species](){
                return Array
            }
        }

        const a = new MyArray();
        const b = a.map(x => x);
        // 修改了实例衍生
        // a 不是 MyArray实例，而是Array实例
        console.log(a instanceof MyArray);
        console.log(b instanceof MyArray);
        console.log(b instanceof Array);
    }

    {
        //symbol.match使用
        // 当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。
        class myObject{
            [Symbol.match](string){
                return 'hellow world'.indexOf(string) > -1 ? string : null;
            }
        }
        //改写后的match方法
        console.log('e'.match(new myObject()));
    }

    {
        // 重写replace
        const x = {};
        x[Symbol.replace] = function(...args){
            return args[0] + args[1];
        }

        console.log('hello'.replace(x,'world'));

    }

    {
        class MySearch{
            constructor(value){
                //存储实例化时候的值
                this.vaule = value;
            }
            [Symbol.search](string){
                return string.indexOf(this.value);
            }
        }

        console.log('foobar'.search(new MySearch('foo')));
    }

    {
        // 定制[object xxx]
        //Symbol.toStringTag
        class Collect{

            get [Symbol.toStringTag](){
                // return typeof string == 'string' ? string : 'xxx';
                return 'xxx';
            }
        }
        let collect = new Collect();
        let arr = JSON.parse('{"a":"123"}');
        console.log(Object.prototype.toString.call(collect));
        console.log(arr[Symbol.toStringTag])
    }
}

export { main }