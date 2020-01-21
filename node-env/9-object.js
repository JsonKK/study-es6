var main = function(){
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
}

module.exports = main;