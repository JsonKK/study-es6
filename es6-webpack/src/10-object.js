var main = function(){

    {
        //简写写法在打印对象时也很有用
        let user = {
            name : 'jsonKK'
        }
        let foo = {
            bar : 'baz'
        }

        console.log('简写对象在控制台中的使用',{user,foo});
    }

    {
        // 对象的描述

        // 原型上的toString()方法，是不可枚举的
        let propToString = Object.getOwnPropertyDescriptor(Object.prototype,'toString')
        console.log('原型链上toString方法是否可枚举',propToString.enumerable);

        //数组的length属性
        let lang = Object.getOwnPropertyDescriptor([],'length');
        console.log('数组的length属性是否可枚举',lang.enumerable);
    }

    {
        //遍历对象属性的五种方式

        let arr = {
            1 : 'a',
            2 : 'b',
            3 : 'c',
            4 : 'd'
        }

        for(let i in arr){
            arr[i] = arr[i].toUpperCase();
        }
        console.log('for...in操作后的对象',arr);
        console.log('Object.keys()返回对象的属性集合',Object.keys(arr));
        console.log('JSON.stringify()返回对象字符串内容',JSON.stringify(arr));
        console.log('Object.assign返回合并对象',Object.assign(arr,{1:{11:'someting'}}));
    }

    {
        //super关键字
        const proto = {
            foo : 'hello'
        }

        const obj = {
            foo : 'world',
            find(){
                return this.foo + ' ' +  super.foo;
            }
        }
        Object.setPrototypeOf(obj, proto);
        console.log('新增super字段',obj.find());
    }

    {
        //解构赋值
        //模块报错
        // let { x, y,...z} = { x: 1, y: 2, a: 3, b: 4 };
        // console.log('解构赋值输出的对象:',{x,y});
    }

    {
        //链式运算符
        let message = {
            body : {
                user : {
                    time : (new Date).toJSON()
                }
            }
        }
        // let time = message?.body?.user?.time || '2012';
        // console.log('链式运算符:',time);
    }

    {
        //obje
    }
}

export {main};