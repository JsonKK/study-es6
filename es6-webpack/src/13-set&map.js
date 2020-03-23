import emojiRegex  from 'emoji-regex';
import emoji from 'node-emoji';
(function(){
    {
        const s = new Set();
        [2,3,2,4,54,3,2,4,2,3].forEach(item=>{s.add(item)});
        console.log('set对象',s);
    }

    {
        console.log(':barber:' + ':haircut:' + ':100:' + ':star2:');
        console.log(emoji.emojify(':barber:' + ':haircut:' + ':100:' + ':star2:' ));
    }

    {
        //定义生成器函数
        function* chef(){
            yield `${emoji.emojify(':egg:')}`;
            yield `${emoji.emojify(':bread:')}`;
        }

        let jsonKK = new chef();
        // console.log(jsonKK.next());

        //使用for循环生成迭代器
        function* chef2(foods){
            for(let i = 0;i<foods.length;i++){
                yield `${emoji.emojify(foods[i])}`;
            }
        }
        jsonKK = new chef2([':coffee:',':glass_of_milk:',':tea:']);
        console.log(jsonKK.next());
        console.log(jsonKK.next());
        console.log(jsonKK.next());
    }

    {
        //class的基本使用
        class chef{
            constructor(foods){
                this.foods = foods;
            }

            cook(){
                let str='';
                this.foods.forEach(item=>{
                    if(str){
                        str += ',';
                    }
                    str += emoji.emojify(item) ;
                });
                return str.split(',');
            }
        }
        let jsonKK = new chef([':handball:',':wilted_flower:',':goal_net:']);
        console.log(jsonKK.cook());
    }

    {
        //class中的set和get
        class chef{
            constructor(foods){
                this.foods = foods;
            }

            set cook(value){
                this.foods.push(value);
            }

            get cook(){
                let str='';
                this.foods.forEach(item=>{
                    if(str){
                        str += ',';
                    }
                    str += emoji.emojify(item) ;
                });
                return str.split(',');
            }
        }

        let jsonKK = new chef([':handball:',':wilted_flower:',':martial_arts_uniform:']);
        jsonKK.cook = ':croissant:';
        //引用的时候不能用方法的去应用
        console.log(jsonKK.cook);
    }

    {
        //static的使用
        class chef{
            
            constructor(){
            }
            //新写法的提案并没有通过
            // static foods = JSON.stringify([':wilted_flower:',':martial_arts_uniform:',':croissant:']);

            static menu(foods=[]){
                //静态方法无法调用到类的内部方法
                let str='';
                foods.forEach(item=>{
                    if(str){
                        str += ',';
                    }
                    str += emoji.emojify(item) ;
                });
                console.log(str.split(','));
            }
        }

        //static方法不需要实例化，即可直接引用
        chef.menu([':wilted_flower:',':martial_arts_uniform:',':croissant:']);

        {
            //extend的使用
            class Parent {
                constructor(name){
                    this.name = name;
                }
                static sayHello(){
                    console.log(this.name)
                }
            }
            
            class Child extends Parent {
                constructor(name, age){
                    super(name);
                    this.age = age;
                }
                sayAge(){
                    return this.age;
                }
            }
            let parent = new Parent("Parent");
            let child = new Child("Child", 18);
            console.log(parent);
            console.log(child);
        }

    }
})()