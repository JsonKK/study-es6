export function main(){

    {
        // 重复定义变量
        function f(){
            console.log('重复定义变量','this is outside');
        }
        (function(){
            function f(){
                console.log('重复定义变量','this is inside');
            }
            if(false){}
            f();
        })()
    }

    {
        //对象const
        const foo = {};

        foo.prop = 123;
        console.log('改变const对象foo的值',foo);
        
    }
    

}