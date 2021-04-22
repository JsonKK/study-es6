(function(){
    

    {
        
        //自定义迭代器方法
        const chef = function(foods){
            let i = 0;
            return {
                next(){
                    let done = (i>=foods.length);
                    let value = !done ? foods[i++] : undefined;
                    return{
                        value,
                        done
                    }
                }
            }
        }
        let jsonKk = chef([':apple:',':egg:']);
        console.log(jsonKk.next());
        console.log(jsonKk.next());
        console.log(jsonKk.next());
    }

    {
        //在class中定义iterator方法
        class RangeIterator {
            //初始化函数
            //接口开始值和结束值
            constructor(start,stop){
                // 把开始值赋值给value
                this.value = start;
                this.stop = stop;
            } 
            // 定义迭代器方法
            [Symbol.iterator](){
                return this;
            }
            // 定义next方法
            next(){
                let value = this.value;
                // 如果还没有到结束
                if(value < this.stop){
                    this.value++;
                    //只有done为false的对象，才能被of遍历出来
                    return {value,done:false}
                }
                return {value:undefined,done:true};
            }
        }

        const range = function(start,stop){
            return new RangeIterator(start,stop);
        }

        for(let value of range(1,3)){
            //会输出1，2
            console.log('iterator in class:',value);
        }
    }

    {
        //在对象原型上实现迭代器
        const Obj = function(value){
            this.value = value;
            this.next = null;
        }

        Obj.prototype[Symbol.iterator] = function(){
            let current = this;
            const next = function(){
                if(current){
                    let value = current.value;
                    current = current.next;
                    return {done : false,value}
                }
                //切记切记，如果done为false的话会出现死循环
                return {done : true,value:undefined}
            }
            const iterator = {next};
            return iterator;
        }

        const one = new Obj(1);
        const two = new Obj(2);
        const three = new Obj(3);
        one.next = two;
        two.next = three;

        //每次迭代都会去执行迭代器上的next方法
        for(let i of one){
            console.log('iterator in prototype:',i);
            //防止自定义迭代器出现死循环，及时抛出异常
            if(!i){
                throw new Error('iterator in prototype: undefind')
            }
        }
    }

    {
        // 在对象上定义迭代器
        const obj = {
            data : ['hello' ,'world'],
            [Symbol.iterator](){
                const self = this;
                let index = 0;
                return {
                    next(){
                        if(index < self.data.length){
                            return {
                                value : self.data[index++],
                                done : false
                            }
                        }
                        else{
                            return {
                                value : undefined,
                                done : true
                            }
                        }
                    }
                }
            }
        }

        for(let i of obj){
            console.log('iterator in object:',i);
            if( typeof i === 'undefined'){
                throw new Error('iterator error in object');
            }
        }
    }

    {
        // let nodeList = {
        //     a : 1,
        //     b : 2
        // };
        // nodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
        // for(let i of nodeList){
        //     console.log('iterator in nodelist',i);
        // }
    }

    {   
        //迭代当前所有div
        const div = [...document.querySelectorAll('div')] ;
        for(let i in div){
            console.log('iterator in div',i);
        }
    }

    {
        //类数组使用迭代器
        let likeArray = {
            0 : 'a',
            1 : 'b',
            2 : 'c',
            length : 3,
            [Symbol.iterator] : Array.prototype[Symbol.iterator]
        }

        for(let i of likeArray){
            console.log('iterator in likeArray',i);
        }

    }

    {
        //set 使用interator
        let set = new Set().add('a').add('b').add('c');
        for(let i of set){
            console.log('iterator in set:',i);
        }
    }

    {
        // 在yield* 中使用iterator
        const generator = function*(){
            yield 1;
            yield* [2,3,4];
            yield 5;
        }

        const iterator = generator();
        for(let i of iterator){
            console.log('iterator in yield * :',i);
        }
    }

    {
        //return()方法的使用
        //是可选的，不是必须的
        const readList = function(file){
            let index = 0;
            return {
                [Symbol.iterator](){
                    return {
                        next(){
                            if(index < file.length){
                                return {done : false,value:file[index++]}
                            }
                            return {done: true}
                        },
                        return(){
                            index = 0;
                            return {done : true};
                        } 
                    }
                    
                }
            }
        }

        let mReadList = readList('happy');
        //中断了迭代，下次触发的时候会紧接着上一次的执行
        for(let i of mReadList){
            console.log('return() try:',i);
            break;
        }
        //如果在新的一次执行的时候希望重新开始
        //可以在symbol.iterator中的return函数初始化
        for(let i of mReadList){
            console.log('return() try:',i);
            break;
        }
    }

    {
        // 测试使用for of循环和for循环的耗时差别

        let arr = new Array(100000);
        let num = 0;
        console.time('for of time:');
        for(let i of arr){
            num = i;
        }
        console.timeEnd('for of time:');
        console.time('forEach time:');
        arr.forEach(()=>{
            num++;
        })
        console.timeEnd('forEach time:');
        console.time('for time:');
        for(let i = 0,lang=arr.length;i<lang;i++){num++}
        console.timeEnd('for time:');
        console.log(num);
    }
})()