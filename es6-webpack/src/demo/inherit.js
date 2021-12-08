{
  //使用原型链继承

  const Parent = function () {
    this.name = 'parent';
    this.numbers = [1, 2, 3];
  }

  const Child = function () {
    this.name = 'child';
  }

  Child.prototype = new Parent();

  const caseChildOne = new Child();
  const caseChildTwo = new Child();
  //只修改了第一个子集，的numbers的数组，但是惊奇的发现实例出来的第二个子集的Numbers也同时被改变了
  // 使用的是同一个实例对象，内存空间是共享的
  caseChildOne.numbers.push(...[4, 5, 6]);
  console.table([{
      name: 'caseChildOne',
      value: JSON.stringify(caseChildOne.numbers)
    },
    {
      name: 'caseChildTwo',
      value: JSON.stringify(caseChildTwo.numbers)
    }
  ])
}

{
  // 使用call来进行继承
  const Parent = function () {
    this.name = 'parent';
    this.numbers = [1, 2, 3];
    this.setName = (name)=>{
      if(typeof name === 'string'){
        this.name = name;
      }
    }
  }
  Parent.prototype.getName = ()=>{
    return this.name;
  }

  const Child = function(){
    Parent.call(this);
    this.type = 'child';
  }

  Child.prototype.constructor = Child;
  // Child.prototype = new Parent();

  const caseChildOne = new Child();
  const caseChildTwo = new Child(); 
  //使用call方法解决了第一种继承带来的问题，同一个实例，占用同一个内容空间，第一个子集改变，所有子集改变的问题
  caseChildOne.numbers.push(...[4, 5, 6]);
  console.table([{
      name: 'caseChildOne call',
      value: JSON.stringify(caseChildOne.numbers)
    },
    {
      name: 'caseChildTwo call',
      value: JSON.stringify(caseChildTwo.numbers)
    }
  ])
  //但是带来了一个新的问题，发现父类原型上的getName方法并没有被继承下来
  console.log('caseChildOne call`s getName is ',typeof caseChildOne.getName)
}

{
  // 结合上面两种的继承，形成第三种继承方式
  // 使用call来进行继承
  const Parent = function () {
    this.name = 'parent';
    this.numbers = [1, 2, 3];
    this.setName = (name)=>{
      if(typeof name === 'string'){
        this.name = name;
      }
    }
  }
  Parent.prototype.getName = ()=>{
    return this.name;
  }

  const Child = function(){
    Parent.call(this);
    this.type = 'child';
  }
  Child.prototype = new Parent();
  const caseChildOne = new Child();
  const caseChildTwo = new Child(); 
  //使用call方法解决了第一种继承带来的问题，同一个实例，占用同一个内容空间，第一个子集改变，所有子集改变的问题
  caseChildOne.numbers.push(...[4, 5, 6]);
  console.table([{
      name: 'caseChildOne combine',
      value: JSON.stringify(caseChildOne.numbers)
    },
    {
      name: 'caseChildTwo combine',
      value: JSON.stringify(caseChildTwo.numbers)
    }
  ])
  //父类的原型上的方法也被继承了
  console.log('caseChildOne combine`s getName is ',typeof caseChildOne.getName)
  // 带来了一个新的问题，Parent类多被执行了一次
}

{
  // 使用create继承
  //完美的解决了以上三种情况遇到的问题
  const Parent = function () {
    this.name = 'parent';
    this.numbers = [1, 2, 3];
    this.setName = (name)=>{
      if(typeof name === 'string'){
        this.name = name;
      }
    }
  }
  Parent.prototype.getName = ()=>{
    return this.name;
  }

  const caseChildOne = Object.create(new Parent());
  const caseChildTwo = Object.create(new Parent());
  caseChildOne.numbers.push(...[4, 5, 6]);
  console.table([{
      name: 'caseChildOne create',
      value: JSON.stringify(caseChildOne.numbers)
    },
    {
      name: 'caseChildTwo create',
      value: JSON.stringify(caseChildTwo.numbers)
    }
  ])
  //父类的原型上的方法也被继承了
  console.log('caseChildOne create`s getName is ',typeof caseChildOne.getName)
}

{
  //create方法加强版
  const Parent = function () {
    this.name = 'parent';
    this.numbers = [1, 2, 3];
    this.setName = (name)=>{
      if(typeof name === 'string'){
        this.name = name;
      }
    }
  }
  Parent.prototype.getName = ()=>{
    return this.name;
  }

  const Clone = function(original){
    const clone = Object.create(original);
    clone.getNumbers = ()=>{
      return clone.numbers;
    }
    return clone;
  }

  const caseChildOne = Clone(new Parent());
  const caseChildTwo = Clone(new Parent());
  caseChildOne.numbers.push(...[4, 5, 6]);
  console.table([{
      name: 'caseChildOne clone',
      value: JSON.stringify(caseChildOne.getNumbers())
    },
    {
      name: 'caseChildTwo clone',
      value: JSON.stringify(caseChildTwo.getNumbers())
    }
  ])
  //父类的原型上的方法也被继承了
  console.log('caseChildOne clone`s getName is ',typeof caseChildOne.getName)
}

{
  // 寄生式继承，封装
  //clone 方法的作用是把父类的原型继承到子类的原型，又避免实例化一次父类
  const Clone = function(parent,child){
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  }

  const Parent = function () {
    this.name = 'parent';
    this.numbers = [1, 2, 3];
    this.setName = (name)=>{
      if(typeof name === 'string'){
        this.name = name;
      }
    }
  }
  Parent.prototype.getName = ()=>{
    return this.name;
  }
  const Child = function(){
    Parent.call(this);
    this.type = 'child';
  }
  Clone(Parent,Child);
  const caseChildOne = new Child();
  const caseChildTwo = new Child();
  caseChildOne.numbers.push(...[4, 5, 6]);

  console.table([{
      name: 'caseChildOne theMost',
      value: JSON.stringify(caseChildOne.numbers)
    },
    {
      name: 'caseChildTwo theMost',
      value: JSON.stringify(caseChildTwo.numbers)
    }
  ])
  //父类的原型上的方法也被继承了
  console.log('caseChildOne theMost`s getName is ',typeof caseChildOne.getName)
}