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
    function fib(max){
      let a = 0,
          b = 1,
          arr = [0,1];
      while(arr.length < max){
        nextId.next();
        [a,b] = [b, a + b];
        arr.push(b);
      }
      return arr;
    }
    console.log(fib(index));

    //生成器
    function* generatorFib(max){
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
    console.log(arr);

    let arr2 = [];
    //如果这边遍历gF，会返回空数组，gf已经被取完了
    for(let x of generatorFib(index)){
      nextId.next();
      arr2.push(x);
    }
    console.log(arr2);
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
    function* f() {
      console.log('执行了！')
    }
    //函数只
    var generator = f();
    
    setTimeout(function () {
      generator.next()
    }, 0);

    setTimeout(function () {
      generator.next()
    }, 0);
    
  }

  {
    function get_id_romote(){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve('abc')
        },0)
      })
    }
    async function get_id_async(){
      let id = await get_id_romote();
      console.log(id);
      return id;
    }
    //异步方法使用
    function* get_id(){
      let id = '';
      while(true){
        if(!id){
          id = get_id_async();
        }
        yield id;
      }
    }

    let getId = get_id();
    console.log(getId.next())
    console.log(getId.next())
  }

  console.log(nextId.next());
})()