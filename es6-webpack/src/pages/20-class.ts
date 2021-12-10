//普通的类
class Point{
  x:string;
  y:string;

  constructor(x,y){
    this.x = x;
    this.y = y;
    this.toString();
  }

  toString(){
    console.table([
      {
        title:'输出P的tostring',
        content : `(${this.x},${this.y})`
      }
    ]);
  }
}

// 校验类上是否有取值和赋值函数
class CustomHTMLElement {
  element:Element;
  str:string;
  constructor(element) {
    this.element = element;
    this.str = '';
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }

  set toStr(value){
     this.str = 'ss'
  }

  get toStr(){
    return this.str;
  }
}


export default new class{
  selfCustomHTMLElement : any;
  constructor(){
    new Point(1,2);
    this.selfCustomHTMLElement = new CustomHTMLElement(document.createElement('span'));
    this.disposeCustomHTMLElement();
  }

  disposeCustomHTMLElement(){
    const {selfCustomHTMLElement} = this;
    console.log(selfCustomHTMLElement)
    console.table([
      {
        title : 'toStr赋值为12',
        content : (()=>selfCustomHTMLElement.toStr = 12)()
      },
      {
        title : 'toStr获取值',
        content : (()=>selfCustomHTMLElement.toStr)()
      },
      {
        title : 'toStr描述',
        content : (()=>Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype,'toStr'))()
      }
    ])
  }
}()


// {

//   {
//     // 使用表达式的形式
//     const MyClass = class my{
//       getClassName(){
//         return my.name;
//       }
//     }

//     let inst = new MyClass();
//     // name属性总是返回紧跟在class关键字后面的类名。
//     console.log('获取函数名',inst.getClassName());
//     console.log('获取函数名2',MyClass.name);
//   }

//   {
//     // 在类中使用迭代器
//     class Foo{
//       constructor(...args){
//         this.args = args;
//       }

//       *[Symbol.iterator](){
//         for(let item of this.args){
//           yield item;
//         }
//       }
//     }

//     let foo = new Foo('hellow','world');
//     console.log('输出class上的迭代器',[...foo]);
//   }

//   {
//     // this指向问题
//     class Logger{

//       constructor(){
//         //解决办法1 在构造函数里用箭头函数
//         //注意点 构造器里的函数，会覆盖外部定义的函数
//         // this.printName = (name = 'there') => {this.print(`Hello ${name}`)};

//         //解决办法2 在构造函数里重新定义某个函数的作用域
//         this.printName = this.printName.bind(this);
//       }

//       printName(name = 'there'){
//         this.print(`Hello ${name}`);
//       }

//       print(text){
//         console.log('作用域保持输出',text);
//       }
//     }

//     let logger = new Logger();
//     let {printName} = logger;
//     //使用链式方式不会有问题
//     // logger.printName();
//     // 采用引用的方式，会报print不存在；因为this的指向被改变了
//     printName();
   
//   }

//   {
//     // 静态方法 作用于类的内部
//     // 静态方法只能被类内部使用
//     class Foo {
//       static bar(){
//         this.baz();
//       }

//       static baz(){
//         console.log('static in class');
//       }

//       baz(){
//         console.log('normal in class');
//       }
//     }

//     let foo = new Foo();
//     try{
//       foo.bar();
//     }
//     catch(e){
//       // 通过class点方法的形式，不会触发constructor
//       Foo.bar();
//     }


//     //类继承
//     class otherFoo extends Foo{

//     }
//     //输出父类的方法
//     let minFoo = new otherFoo();
//     minFoo.baz();
//     //继承会保留static方法
//     otherFoo.bar();
//   }

//   {
//     // 子类继承父类，并且重写
//     class Foo {
//       static classMethod() {
//         return 'hello';
//       }

//       classMethod(){
//         return '你好';
//       }
//     }
    
//     class Bar extends Foo {
//       static classMethod() {
//         // 通过super获取父类的方法
//         return super.classMethod() + ' too';
//       }
//     }
    
//     console.log('继承加super:',Bar.classMethod()) 
//   }

  
//   {
//     class A {
//       constructor() {
//         this.p = 2;
//       }
//     }
    
//     class B extends A {
//       //在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
//       // 所以此时的super.p 相当于this.p
//       get m() {
//         return super.p;
//       }
//     }
    
//     let b = new B();
//     console.log('子类无法通过super直接获取到父类的属性',b.m )
//   }

//   {
//     //属性定义在类的prototype上的话，可以被super获取到
//     class A{}
//     A.prototype.p = '定义属性在prototype上，子类通过super获取父类属性';

//     class B extends A{
//       get m(){
//         return super.p;
//       }
//     }

//     let b = new B();
//     console.log(b.m);
//   }

//   {
//     // 静态方法指向的是类，而不是实例
//     class A{
//       constructor(){
//         this.x = '父类A';
//       }
//       static print(){
//         return this.x;
//       }
//     }

//     class B extends A{
//       constructor(){
//         // ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。
//         super();
//         this.x = '子类B';
//       }
//       static m(){
//         super.print();
//       }
//     }

//     B.x = '子类B新值';
//     //目前无法定义静态属性，所以静态属性值无法获取到
//     console.log(B.m());

//   }

//   {
//     //利用symbol定义class私有方法
//     const bar = Symbol('bar');
//     class myClass{
//       getPublicName(){
//         return '公有方法';
//       }

//       [bar](){
//         return '私有方法';
//       }
//     }

//     console.table([
//       {
//         title : '通过getOwnPropertyNames获取myClass方法名',
//         content : JSON.stringify(Object.getOwnPropertyNames(myClass.prototype))
//       },
//       {
//         title : '通过Reflect.ownKeys获取myClss方法名',
//         content : JSON.stringify(Reflect.ownKeys(myClass.prototype))
//       }
//     ]);
    
//   }

//   //es5继承
//   function Parent(name,age){
//     this.name = name;
//     this.age = age;

//     console.log('es5父类被调用了');
//   }

//   Parent.prototype.say = function(){
//     console.log('es5父类方法say');
//   }

//   function Children(name,age){
//     Parent.call(this,name,age);
//     console.log('es5子类被调用');
//   }

//   Children.prototype = new Parent('lily','33');
//   // Children.prototype.constructor = Children;
//   Children.prototype.getName = function(){
//     return `${this.name},年龄：${this.age}`;
//   }

//   const children = new Children('andy',18);
//   console.log(children.getName());
//   children.say();

// }
