(function(){
  //id自增提供给所有方法执行，累计id加到多少次
  function* next_id(){
    let id = 0;
    while(id > -1){
      yield id++;
    }
  }
  var nextId = next_id();
  {
    let index = 5;
    //一般形式实现斐波那契数列
    const fib = function (max){
      let a = 0,
          b = 1,
          arr = [0,1];
      while(arr.length < max){
        nextId.next();
        // a的值等于b ; b的值等于a+b
        [a,b] = [b, a + b];
        //数组增加新的b
        arr.push(b);
      }
      return arr;
    }
    console.log('一般形式实现斐波那契数列',fib(index));

    //生成器
    const generatorFib = function* (max){
      var a = 0,
          b = 1,
          n = 0;
      while (n < max) {
          nextId.next();
          yield a;
          [a, b] = [b, a + b];
          n ++;
      }
      return;
    }

    let gF = generatorFib(index);
    let arr = [];
    for(let i = 0; i< index;i++){
      nextId.next();
      let next = gF.next();
      if(!next.done){
        arr.push(next.value);
      }
    }
    console.log('使用generator实现斐波那契数列',arr);

    let arr2 = [];
    //使用for of循环出generator数列
    //如果这边遍历gF，会返回空数组，gf已经被取完了
    for(let x of generatorFib(index)){
      nextId.next();
      arr2.push(x);
    }
    console.log('for of循环得到斐波那契数列',arr2);
  }

  {
    //多个异步需要相互依赖的方法
    // function one(){
    //   setTimeout(()=>{
    //     return 'one';
    //   },0)
    // }
    // function two(){
    //   setTimeout(()=>{
    //     return 'two';
    //   },0)
    // }
    // try{
    //   let a = yield one();
    //   let b = yield two();
    // }
    // catch (err){
    //   console.log(err);
    // }
  }

  {
    //只会打印一次函数
    const f = function* () {
      console.log('执行了！')
      yield '执行了！'
    }
    //函数只
    var generator = f();
    // 得到yeild的值
    setTimeout(function () {
      console.log(generator.next());
    }, 0);
    // 得到undefind
    setTimeout(function () {
      console.log(generator.next());
    }, 0);
    
  }

  {
    //定义异步返回函数
    const get_id_romote = function(){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve('get_id_romote')
        },0)
      })
    }
    //定义async函数接收异步函数的参数
    const get_id_async = async function(){
      let id = await get_id_romote();
      console.log(id);
      return id;
    }
    //异步方法使用
    //遍历执行输出获取到的id
    const get_id = function* (){
      let id = '';
      while(true){
        if(!id){
          id = get_id_async();
        }
        yield id;
      }
    }

    let getId = get_id();
    console.log(getId.next(),'第一次')
    console.log(getId.next(),'第二次')
  }

  {
    //next中传参
    const foo = function* (x){
      nextId.next();
      let y = 2 * (yield (x + 1));
      let z = yield(y/3);
      return (x + y + z);
    }

    const a = foo(5);
    console.log('next中没有参数 a',a.next());
    console.log('next中没有参数 a',a.next());
    console.log('next中没有参数 a',a.next());

    const b = foo(5);
    //定义参数可以知道上一次yeild的值
    //参数代表上一次yield 的值，所以上一次
    console.log('next中有参数 b',b.next());
    //传入参数12，表示yield(x + 1) = 12
    //永久的修改了yield(x + 1)的值
    console.log('next中有参数 b',b.next(12));
    //传入1表示yield(y/3)为 1
    console.log('next中有参数 b',b.next(0));
  }

  {
    const foo = function* (){
      yield 1;
      yield 2;
      return 3;
    }
    //使用for of输出，return被忽略
    for(let v of foo()){
      console.log('使用for of输出，return 3被忽略',v);
    }
  }

  {
    // 在对象的iterator属性上增加 生成器函数
    const objectEntries = function* (){
      let proKeys = Object.keys(this);
      for(let proKey of proKeys){
        yield [proKey,this[proKey]];
      }
    }

    let jane = { first: 'Jane', last: 'Doe' };
    
    jane[Symbol.iterator] = objectEntries;

    for(let [key,value] of jane){
      console.log('对象上增加Symbol.iterator为gnerator函数',`${key}:${value}`);
    }
  }

  {
    //throw异常接收方法的使用
    //如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。
    //throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。
    const go = function* (){
      // 自定义了一个try catch 所以只会接收一次throw()方法
      // 大于一次的throw()方法会被外部的try catch捕获
      try{
        yield '方法正常执行';
        
      }
      catch(e){
        console.info('内部捕获报错',e);
      }
      yield '方法正常执行2';
    }

    
    const g = go();
    console.log('throw异常接收方法的使用',g.next());
    try{
      //1.如果执行过next() 则一次内部异常和一次外部异常
      //2.如果没有执行锅next() 则只执行一次外部异常
      //3.throw方法会直接执行了下一次yeild
      console.log('throw异常接收方法的使用',g.throw('第一次'));
      g.throw('第二次');
    }
    catch(e){
      console.info('外部捕获报错',e);
    }
  }


  {
    // 取出嵌套数据
    const iterArr = function(arr){
      if(!Array.isArray(arr)){
        return arr
      }
      let newArr = []

      const iterTree = function* (tree) {
        if (Array.isArray(tree)) {
          for(let i=0; i < tree.length; i++) {
            yield* iterTree(tree[i]);
          }
        } else {
          yield tree;
        }
      }
      for(let x of iterTree(tree)) {
        newArr.push(x);
        // console.log('取出嵌套数据',x);
      }
      return newArr;
    }
    
    const tree = [ 'a', ['b', 'c'], ['d', 'e',['f',['g']]] ];
    console.log('拉平嵌套数组数据',iterArr(tree));
    
  }

  {
    //实现状态开关
    let isLoading = false;
    const clock = function* (){
      while(true){
        isLoading = !isLoading;
        console.log('isLoading ? ',isLoading);
        yield;
      }
    }

    clock().next();
    clock().next();
  }

  {
    // 部署iterator函数
    const iterEntries = function* (obj){
      let keys = Object.keys(obj);
      for(let i=0,lang=keys.length;i<lang;i++){
        let key = keys[i];
        yield [key,obj[key]];
      }
    }

    let myObj = { foo: 3, bar: 7 };

    for (let [key, value] of iterEntries(myObj)) {
      console.log('iterEntries',`[${key}, ${value}]`);
    }
  }

  {
    class ListenBtnClick{
      constructor(fn){
        this.renderBtn();
        this.id = 'touchMe';
        this.fn = fn;
      }
      //构造dom
      renderBtn(){
        const btn = document.createElement('button');
        btn.innerText = '点我呀';
        btn.id = this.id;
        document.body.appendChild(btn);
        this.addEvent();
      }
      //增加事件
      addEvent(){
        const btn = document.getElementById(this.id);
        btn.onclick = ()=>{
          console.log('点击了')
          this.clickBack().next();
        }
      }

      *clickBack(){
        for(let i =0;true;i++){
          yield this.fn && this.fn();
        }
      }

    }

   new ListenBtnClick(()=>{
     console.log('还是只能在回调函数中被点击事件调用，表示遗憾')
   });

  }

})()

