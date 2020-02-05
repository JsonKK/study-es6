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
        obj[PROP_NAME]= "一斤代码" ; 
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
}

export { main }