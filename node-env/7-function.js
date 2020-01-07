var main = function () {

    {
        //简洁写法
        function Point(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }

        var p = new Point();
        console.log('简洁写法的x值是%d', p.x);
        console.log('简洁写法的y值是%d', p.y);
    }

    {
        //解构测试
        function m1({ x = 0, y = 0 } = {}) {
            console.log('m1的x=%s,y=%s', x, y);
        }

        function m2({ x, y } = { x: 0, y: 0 }) {
            console.log('m2的x=%s,y=%s', x, y);
        }
        //下列情况不一样
        m1({});
        m2({});

        m1({ x: 0 });
        m2({ x: 0 });
    }

    {
        let foo = 'outer';

        function bar(func = () => foo) {
            let foo = 'inner';
            console.log(func());
            console.log(foo);
        }

        bar();
    }

    {
        //作用域
        var x = 1;
        //x作为参数传进去,所以x的值只会改变在作用域内
        //y方法取得x是参数x，不是方法内的x，所以foo方法内的x值不会被y方法影响
        function foo(x, y = function () { x = 2; }) {
            var x = 3;
            y();
            console.log('作用域x的值为%s', x);
        }

        foo();
        console.log('作用域x的值为%s', x);
    }

    {
        // rest 参数
        function add(...values) {
            let sum = 0;
            for (let val of values) {
                sum += Number.parseFloat(val);
            }
            return sum;
        }
        console.log(add(1, 2, 3));

        const sortNumbers = (...numbers) => numbers.sort(function (a, b) { if (a > b) { return a } else { return b } });
        console.log(sortNumbers(4, 32, 65));
    }

    {
        //箭头函数和变量解构结合
        const full = ({ first = 'one', last = 'two' } = {}) => first + ' ' + last;
        console.log(full({ first: 'a', last: 'b' }));

        //箭头函数使表达式更加简洁
        //判断是否是偶数
        const isEven = n => n % 2 === 0;
        // 求一个数的指数
        const square = n => n **= 2;
        console.log('是否是偶数%s', isEven(2));
        console.log('3的2次方是%s', square(3));

        //简化函数
        console.log('简化函数[1,2,3]', [1, 2, 3].map(x => x **= 2));
    }

    {
        //箭头函数的this
        function Timer() {
            this.s1 = 0;
            this.s2 = 0;
            setInterval(() => this.s1++, 1000);
            setInterval(function () {
                //this.s2不存在
                this.s2++;
            }, 1000);
        }

        let timer = new Timer();
        // setTimeout(() => console.log(timer.s1), 3100);
        // setTimeout(() => console.log(timer.s2), 3100);
    }

    {
        //箭头函数的应用
        let handler = {
            id: '123456',
            init: function () {
                let time = () => this.doSomething((new Date()).toJSON());
                time();
            },
            doSomething(time) {
                const reg = /(\d{4})-(\d{2})-(\d{2})/;
                const matchObj = reg.exec(time);
                if (matchObj && matchObj.length == 4) {
                    let year = matchObj[1];
                    let month = matchObj[2];
                    let day = matchObj[3];
                    console.log(year + '-' + month + '-' + day);
                }
                else {
                    console.log(matchObj);
                }
            }
        };
        handler.init();
    }

    {
        //嵌套的箭头函数
        function insert(value){
            return { into : function(array){
                return { after : function(afterValue){
                    array.splice(array.indexOf(afterValue) + 1, 0, value);
                    return array;
                }}
            }}
        }

        console.log(insert(4).into([1,3]).after(3));
    }

    {
        //管道函数用es5表示
    }

    {
        //管道函数
        const pipeline = (...funcs) => val => funcs.reduce((a, b) => b(a), val);

        const plus1 = a => a + 1;
        const mult2 = a => a * 2;
        const addThenMult = pipeline(plus1, mult2);

        console.log(addThenMult(5));
    }

}
module.exports = main;