(function(){

  {
    //普通的类
    class Point{
      constructor(x,y){
        this.x = x;
        this.y = y;
      }

      toString(){
        return `(${this.x},${this.y})`;
      }
    }
    
    let p = new Point(1,2)
    console.log('输出P的tostring',p.toString());
  }

  {
    // 校验类上是否有取值和赋值函数
    class CustomHTMLElement {
      constructor(element) {
        this.element = element;
      }
    
      get html() {
        return this.element.innerHTML;
      }
    
      set html(value) {
        this.element.innerHTML = value;
      }

      set toStr(value){
         this.s = 'ss'
      }

      get toStr(){
        return this.s;
      }
    }
    
    //无法获取到属性，后期看看是什么问题
    //属性可以被操作，但是无法通过方法判断是否存在
    // let custom = new CustomHTMLElement();
    // console.log(custom.toStr = 12);
    // console.log(custom.toStr);
    // let toString = Object.getOwnPropertyDescriptor(
    //   CompositionEvent.prototype,'toStr'
    // )

    let descriptor = Object.getOwnPropertyDescriptor(
      CustomHTMLElement.prototype, 'html'
    );

    console.log('CustomHTMLElement 的html方法是否有get','get' in descriptor);
    // console.log('CustomHTMLElement 的toString方法是否有get','get' in toString);
  }

  {
    // 使用表达式的形式
    const MyClass = class my{
      getClassName(){
        return my.name;
      }
    }

    let inst = new MyClass();
    // name属性总是返回紧跟在class关键字后面的类名。
    console.log('获取函数名',inst.getClassName());
    console.log('获取函数名2',MyClass.name);
  }

  {
    // 在类中使用迭代器
    class Foo{
      constructor(...args){
        this.args = args;
      }

      *[Symbol.iterator](){
        for(let item of this.args){
          yield item;
        }
      }
    }

    let foo = new Foo('hellow','world');
    console.log('输出class上的迭代器',[...foo]);
  }

  {
    // this指向问题
    class Logger{

      constructor(){
        //解决办法1 在构造函数里用箭头函数
        //注意点 构造器里的函数，会覆盖外部定义的函数
        // this.printName = (name = 'there') => {this.print(`Hello ${name}`)};

        //解决办法2 在构造函数里重新定义某个函数的作用域
        this.printName = this.printName.bind(this);
      }

      printName(name = 'there'){
        this.print(`Hello ${name}`);
      }

      print(text){
        console.log('作用域保持输出',text);
      }
    }

    let logger = new Logger();
    let {printName} = logger;
    //使用链式方式不会有问题
    // logger.printName();
    // 采用引用的方式，会报print不存在；因为this的指向被改变了
    printName();
   
  }

  {
    // 静态方法 作用于类的内部
    // 静态方法只能被类内部使用
    class Foo {
      static bar(){
        this.baz();
      }

      static baz(){
        console.log('static in class');
      }

      baz(){
        console.log('normal in class');
      }
    }

    let foo = new Foo();
    try{
      foo.bar();
    }
    catch(e){
      // 通过class点方法的形式，不会触发constructor
      Foo.bar();
    }


    //类继承
    class otherFoo extends Foo{

    }
    //输出父类的方法
    let minFoo = new otherFoo();
    minFoo.baz();
    //继承会保留static方法
    otherFoo.bar();
  }

  {
    // 子类继承父类，并且重写
    class Foo {
      static classMethod() {
        return 'hello';
      }
    }
    
    class Bar extends Foo {
      static classMethod() {
        // 通过super获取父类的方法
        return super.classMethod() + ' too';
      }
    }
    
    console.log('继承加super:',Bar.classMethod()) 
  }

  {
    // 静态属性
    class Foo {
      //定义静态属性会报错
      // static name = 'kk';
    }
    // Foo.name = 'kk';
    // console.log('Foo的静态属性',Foo.name);
  }

  


})()