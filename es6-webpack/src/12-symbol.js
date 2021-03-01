
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
}

export { main }