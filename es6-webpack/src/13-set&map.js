import emojiRegex  from 'emoji-regex';
import emoji from 'node-emoji';
import { keys } from 'underscore';
(function(){
    {
        const s = new Set();
        //类型不一致会当做不同值来处理
        [2,3,2,4,54,3,2,4,'2',3].forEach(item=>{s.add(item)});
        console.log('set对象',s);
        //输出set对象的长度
        console.log('set对象的长度',s.size);
        //去除重复字符串
        console.log('去除重复字符串',[...new Set('ababc')].join(''));

        //NaN被认为是相等的，只会加入一次
        let set = new Set();
        let a = NaN;
        let b = NaN;
        console.log('a和b是否相等',a===b);
        set.add(a);
        set.add(b);
        console.log('把a、b加入set得到',set);

        //两个对象总是不想等的
        let set2 = new Set();
        a = {};
        b = {};
        console.log('a和b对象是否相等',a===b);
        set2.add(a);
        set2.add(b);
        console.log('把a、b加入到set得到',set2);
    }

    {
        //set常用方法
        let set = new Set();
        //增加值，链式写法
        set.add(1).add(2).add(2);
        //set的长度
        set.size;
        //set是否包含某个值
        console.log('是否包含1',set.has(1));
        //set删除一个值
        set.delete(1);
        console.log('删除1后是否包含1',set.has(1));

    }

    {
        //使用set去重数组
        function dedupe(array){
            return Array.from(new Set(array));
        }
        console.log('去重数组[1,2,3,1,2,3]后得到：',dedupe([1,2,3,1,2,3]));
    }

    {
        // set函数支持的迭代器方法
        //for of
        let set = new Set();
        set.add('red').add('green').add('blue');
        //使用for in无效
        for(let x of set){
            console.log('使用for of输出set的值',x);
        }
        //使用forEach输出set的值
        //由于set没有索引，所以value和key的值是一致的
        set.forEach((value,key)=>{
            console.log('使用forEach输出set的值','value是:',value,'key是:',key);
        })
        //使用扩展运算符得到数组数据
        console.log('使用扩展运算符得到遍历数据',[...set]);
    }

    {
        // 使用set实现交集、并集、差集；
        let a = new Set([1,2,3]);
        let b = new Set([4,3,2]);
        console.log('a:',[...a],'b',[...b]);
        //并集
        console.log('a、b的并集是：',[...(new Set([...a,...b]))]);
        //交集
        console.log('a、b的交集：',[...(new Set([...a].filter(x=>b.has(x))))]);
        // 差集
        console.log('a、b的差集：',[...(new Set([...a].filter(x=>!b.has(x))))]);
    }

    {
        //weakset的使用
        // 构建weakset
        const a = [1,2];
        let ws;
        try{
            ws = new WeakSet(a);
            console.log(ws);
        }
        catch(e){
            console.log(e);
        }
        //weakset必须是一个数组对象或者类数组对象
        const b = [{a:1,b:2}];
        ws = new WeakSet(b);
        console.log(ws);

        const c = [['a',1],['b',2]];
        ws = new WeakSet(c);
        console.log(ws);
    }

    {
        // map的使用
        const map = new Map();
        let obj = {name : 'hello'};
        map.set(obj,'world');
        console.log('key是对象获取',map.get(obj),[...map.entries()]);
        obj.name = 'hi';
        //key的类型是对象的时候，修改对象的key是不影响获取值
        console.log('key是对象被修改了获取',map.get(obj));
    }

    {
        const div = document.querySelectorAll('div');
        const map = new Map();
        const obj = {};
        const args = {name:'hello'};
        obj[args] = 'div';
        console.log(obj);
        args.name = 'hi';
    }

    // {
    //     console.log(emoji.emojify(':boy:' + ':haircut:' + ':100:' + ':star2:'));
    //     console.log(emoji.emojify(':barber:' + ':haircut:' + ':100:' + ':star2:' ));
    // }

    // {
    //     //定义生成器函数
    //     function* chef(){
    //         yield `${emoji.emojify(':egg:')}`;
    //         yield `${emoji.emojify(':bread:')}`;
    //     }

    //     let jsonKK = new chef();
    //     // console.log(jsonKK.next());

    //     //使用for循环生成迭代器
    //     function* chef2(foods){
    //         for(let i = 0;i<foods.length;i++){
    //             yield `${emoji.emojify(foods[i])}`;
    //         }
    //     }
    //     jsonKK = new chef2([':coffee:',':glass_of_milk:',':tea:']);
    //     console.log(jsonKK.next());
    //     console.log(jsonKK.next());
    //     console.log(jsonKK.next());
    // }

    // {
    //     //class的基本使用
    //     class chef{
    //         constructor(foods){
    //             this.foods = foods;
    //         }

    //         cook(){
    //             let str='';
    //             this.foods.forEach(item=>{
    //                 if(str){
    //                     str += ',';
    //                 }
    //                 str += emoji.emojify(item) ;
    //             });
    //             return str.split(',');
    //         }
    //     }
    //     let jsonKK = new chef([':handball:',':wilted_flower:',':goal_net:']);
    //     console.log(jsonKK.cook());
    // }

    // {
    //     //class中的set和get
    //     class chef{
    //         constructor(foods){
    //             this.foods = foods;
    //         }

    //         set cook(value){
    //             this.foods.push(value);
    //         }

    //         get cook(){
    //             let str='';
    //             this.foods.forEach(item=>{
    //                 if(str){
    //                     str += ',';
    //                 }
    //                 str += emoji.emojify(item) ;
    //             });
    //             return str.split(',');
    //         }
    //     }

    //     let jsonKK = new chef([':handball:',':wilted_flower:',':martial_arts_uniform:']);
    //     jsonKK.cook = ':croissant:';
    //     //引用的时候不能用方法的去应用
    //     console.log(jsonKK.cook);
    // }

    // {
    //     //static的使用
    //     class chef{
            
    //         constructor(){
    //         }
    //         //新写法的提案并没有通过
    //         // static foods = JSON.stringify([':wilted_flower:',':martial_arts_uniform:',':croissant:']);

    //         static menu(foods=[]){
    //             //静态方法无法调用到类的内部方法
    //             let str='';
    //             foods.forEach(item=>{
    //                 if(str){
    //                     str += ',';
    //                 }
    //                 str += emoji.emojify(item) ;
    //             });
    //             console.log(str.split(','));
    //         }
    //     }

    //     //static方法不需要实例化，即可直接引用
    //     chef.menu([':wilted_flower:',':martial_arts_uniform:',':croissant:']);

    //     {
    //         //extend的使用
    //         class Parent {
    //             constructor(name){
    //                 this.name = name;
    //             }
    //             static sayHello(){
    //                 console.log(this.name)
    //             }
    //         }
            
    //         class Child extends Parent {
    //             constructor(name, age){
    //                 super(name);
    //                 this.age = age;
    //             }
    //             sayAge(){
    //                 return this.age;
    //             }
    //         }
    //         let parent = new Parent("Parent");
    //         let child = new Child("Child", 18);
    //         console.log(parent);
    //         console.log(child);
    //     }

    // }
})()