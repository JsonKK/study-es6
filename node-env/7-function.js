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
            console.log('作用域x的值为%s',x);
        }

        foo();
        console.log('作用域x的值为%s',x);
    }

}
module.exports = main;