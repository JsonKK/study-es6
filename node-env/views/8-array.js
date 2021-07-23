var main = function () {

    {
        //扩展运算符
        //用三个点表示，将数组转为,号隔开
        console.log('数组扩展运算符%s', 1, ...[2, 3, 4], 5);
        console.log('数组扩展运算符%s', ...[2, 3, 4]);


        //在函数中的使用
        function push(array, ...items) {
            array.push(...items);
        }

        let testArr = [];
        push(testArr, ['b', 'o', 'o', 'k']);
        console.log('函数中的使用入参后返回%s', ...testArr[0]);

        function add(a, b) {
            return a + b;
        }
        let numbers = [3, 4];
        console.log('函数中的使用传参%s', add(...numbers));

        //运算符后可以放置表达式
        let x = 1;
        //如果运算符后为空数组，则不会有任何效果
        let arr = [...((x > 0) ? ['a'] : []), 'b'];
        console.log('运算符在表达式中的使用%s', ...arr);
    }

    {
        let arr = ['a', 'b', 'c', 'd', 'e', 'f'];
        //替代apply方法
        function f5(x, y, z) {
            console.log('替代apply在es5中使用%s', x + y + z);
        }
        f5.apply(null, arr);

        (function () {
            //在es6中 函数会被升级为类
            // 所以以下函数在es6环境中会报错，找不到this
            function person(age, name) {
                this.age = age;
                this.name = name;
            }

            function student(age, name, grade) {
                if(!this){
                    return;
                }
                person.apply(this, arguments);
                this.grade = grade;
                console.log('this student info is %s', this.age + this.name + this.grade);
            }

            student('14', 'jsonKK', 'one');
        })();

        (function () {
            //了解学习apply方法例子
            class Person {
                constructor(age, name) {
                    this.age = age;
                    this.name = name;
                }
            }

            class student {
                constructor(age, name, grade) {
                    new Person(this, arguments);
                    this.grade = grade;
                    console.log('this student info is %s', this.age + this.name + this.grade);
                }
            }

            new student('14', 'jsonKK', 'one');
        })();

        //代替apply在max中使用
        let numArr = [43,543,3213,5651];
        console.log('在es5中使用最大值%s',Math.max.apply(null,numArr));
        console.log('在es6中使用最大值%s',Math.max(...numArr));

        //将数组添加到另个数组的尾部
        {
            let arr1 = [1,2,3];
            let arr2 = [4,5,6];
            Array.prototype.push.apply(arr1,arr2);
            console.log('es5在数组后增加数组%s',...arr1);
        }

        {
            let arr1 = [1,2,3];
            let arr2 = [4,5,6];
            arr1.push(...arr2);
            console.log('es6在数组后增加数组%s',...arr1);
        }

    }

    {
        // 复制数组
        let a1 = [0,1];
        {
            let a2 = a1.concat();
            a2[0] = 1;
            console.log('在es5中复制数组a2=%s a1=%s',a2.join(','),a1.join(','));
        }
        {
            let a2 = [...a1];
            a2[0] = 1;
            console.log('在es6中复制数组a2=%s a1=%s',a2.join(','),a1.join(','));
        }
    }

    {
        //合并数组
        
        let arr2 = ['c'];
        let arr3 = ['d','e'];

        {
            let arr1 = ['a','b'];
            arr1 = arr1.concat(arr2,arr3);
            console.log('es5合并数组输出%s',...arr1);
        }

        {
            let arr1 = ['a','b'];
            arr1 = [...arr1,...arr2,...arr3];
            console.log('es6合并数组输出%s',...arr1);
        }
    }

    {
        //合并数组对象
        let arr2 = [{foo:1,bar:2}];

        {
            let arr1 = [{foo:1,bar:2}];
            arr1 = arr1.concat(arr2);
            //不会合并对象，会在原来数组增加项
            // console.log('es5合并数组对象输出',...arr1);
        }

        {
            let arr1 = [{foo:1,bar:2}];
            arr1 = [...arr1,...arr2];
            //不会合并对象，会在原来数组增加项
            // console.log('es6合并数组对象输出',...arr1);
        }
    }

    {
        // 在unicode码中的使用
        let str = 'x\uD83D\uDE80y';
        console.log([...str]);

        //es5调换字符串顺序
        console.log('es5调换含有unicode编码的顺序',str.split('').reverse());

        console.log('es6调换含有unicode编码的顺序',[...str].reverse());
    }

    {
        let map = new Map([
            [1,'one'],
            [2,'two'],
            [3,'three']
        ]);
        console.log([...map.keys()]);
    }

    {
        //Array.from的用法

        //将两类对象转为真正的数组
        let arrayLike = {
            0 : 'a',
            '1' : 'b',
            2 : 'c',
            length : 3
        }

        console.log('es5转换类数组为数组：%s',...[].slice.call(arrayLike));
        console.log('es6转换类数组为数组：%s',...Array.from(arrayLike));

        let changeArr1 = Array.from(arrayLike,(x)=>{
            return x.toUpperCase();
        });

        console.log('array.form接收第二个参数处理:%s',...changeArr1);

        //去除数组的无效值
        function compact(array){
            try{
                array = Array.from(array,(x)=>{
                    if(x || x === 0){
                        return x;
                    }
                    else{
                        return false;
                    }
                });
                return array;
            }
            catch(error){
                return array;
            }
        }

        console.log('利用Array.from无效字符转为false:%s',...compact([1,,32,0,null,undefined,'fdsf']));

    }

    {
        //Array.of 构建数组
        console.log(Array.of('a','b','c'));
        console.log(Array.of());
        console.log(Array.of(undefined));
        console.log(Array.of(null));
    }

    {
        //find方法
        let arr = Array.of(1,32,43,2,123,500,345);
        let checked = arr.find((value,index)=>{
            return value > 100
        });
        console.log('find选中的项是',checked);
        let checkedIndex = arr.findIndex((value,index)=>{
            return value > 100
        });
        console.log('find选中的项的索引是',checkedIndex);

        //接收第二个参数用来绑定this对象
        function f(v){
            return v > Number(this.age);
        }
        let person = {name: 'jsonKK',age:'33'};
        console.log('find方法接收第二个参数改变this',arr.find(f,person));
    }

    {
        //填充修改
        //如果结束参数小于开始参数，则不会报错，也不会改变原数组
        console.log('使用fill修改数组',...[1,2,3].fill({name:'jsonKK'},1,2));
    }

    {   
        let arr = ['a','b','c'];
        let str = '';
        for(let index of arr.keys()){
            str += index + ',';
        }
        console.log('输出数组的键集合是',str);
        str = '';
        for(let value of arr.values()){
            str += value + ',';
        }
        console.log('输出数组的值集合是',str);
        let catchArr = [];
        for(let [index,ele] of arr.entries()){
            catchArr.push({index,ele});
        }
        console.log('输出数组的键值集合是',...catchArr);
    }

    {
        //includes方法
        console.log('includes方法判断对象（失效）',[{a:1},1,2].includes({a:1}));
        console.log('includes方法判断是否存在某个值',[{a:1},1,2].includes(1));
        console.log('includes方法判断是否存在NaN',[{a:1},1,2,NaN].includes(Number('a')));
        console.log('includes方法判断是否存在null',[{a:1},1,2,NaN,null].includes(null));
        console.log('includes方法判断是否存在undefined',[{a:1},1,2,NaN,null,undefined].includes(undefined));
    }

    {
        // 拉平数组
        let arr = [1,[2,[3,[{name:'jsonKK'}]]]];
        // console.log('拉平1个数组',arr.flat());
    }

}

module.exports = main;