/**
* 产生背景
* 1.让明显属于对象内部的方法只部署在reflect上
* 2.让某些方法返回值更加合理（本身为异常的，则转为false返回）
* 3.让操作都变为函数。有些delete obj[key]操作变为 Reflect.deleteProperty(obj,name)
* 4.与proxy方法一一对应
*/
(function(){

  {
    //使用Reflect在Proxy中完成默认行为
    const proxy = new Proxy({},{
      set(target,key,value,receiver){
        let success = Reflect.set(target,key,value,receiver);
        if(success){
          console.log(`属性${key}的值为：${value}增加成功`);
        }
        return success;
      }
    })
    //会返回当前对象
    console.log(proxy.name = 'jsonKK');
    console.log(proxy.obj = {like:'tt'});
  }


  //提供的13个静态方法
  //Reflect get使用
  {
    var myObject = {
      foo: 1,
      bar: 2,
      get baz() {
        return this.foo + this.bar;
      },
    };
    
    var myReceiverObject = {
      foo: 4,
      bar: 5,
    };
    //使用 Reflect.get
    //如果第一个参数不是对象会报错
    console.log('把第二个对象与第一个对象和并取值',Reflect.get(myObject,'baz',myReceiverObject));
  }

  {
    var obj = {
      foo : 1,
      //设置获取bar函数
      get bar(){
        return this.foo;
      },
      // 设置 设置Bar函数
      set bar(value){
        return this.foo = value
      }
    }

    obj.bar = 2;
    console.log(obj.foo);
    //使用Reflect 如果有第四个参数，则作用域变为receiver
    let otherObj = {
      foo : 4
    }
    Reflect.set(obj,'bar',10,otherObj);
    console.log(otherObj.foo);

    //has方法
    console.log('obj对象是否包含bar字段：',Reflect.has(obj,'bar'));
  }

  {
    //construct方法使用，调用构造函数
    //无法使用construct构造 date math等函数
    // const date = Reflect.construct(Date);
    // console.log(date);

    function Test(value){
      this.name = value || 'jsonKK';
    }
    //参数要以数组的形式传递
    const test = Reflect.construct(Test,['new Name']);
    console.log('使用construct构造的test的name属性：',test.name);
  }

  {
    //apply方法的写法改变
    const ages = [11, 33, 12, 54, 18, 96];
    //旧
    const youngest = Math.min.apply(Math,ages);
    //新
    //方法 作用域指向 参数
    const oldest = Reflect.apply(Math.max,Math,ages);
    //第三个参数为数组，必须要传，不传则报错
    const type = Reflect.apply(Object.prototype.toString,oldest,[]);
    console.log('youngest',youngest);
    console.log('oldest',oldest);
    console.log('type',type);
  }

})()