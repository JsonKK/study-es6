
// 重复定义变量
function f(){
    console.log('重复定义变量','this is outside');
}

var main = function(){
    {   
        (function(){
            // 内部的覆盖了外部的
            function f(){
                console.log('重复定义变量','this is inside');
            }
            f();
        })();
    }

    {
        //对象const
        const foo = {};

        foo.prop = 123;
        console.log('改变const对象foo的值',foo);

    }

    {
        //变量提升
        let arr = [];
        for(var i = 0;i<3;i++){
            arr[i] = function(){
                return i*2;
            }
        }
        console.table([
            arr[0](),
            arr[1](),
            arr[2]()
        ]);

        // 局部变量不会提升
        let arr2 = [];
        for(let i = 0;i<3;i++){
            arr2[i] = function(){
                return i*2;
            }
        }
        console.table([
            arr2[0](),
            arr2[1](),
            arr2[2]()
        ]);
    }

    {
        const foo = Object.freeze({});

        // 常规模式时，下面一行不起作用；
        // 严格模式时，该行会报错
        //foo.prop = 123;
    }
}


export  var base = {main};