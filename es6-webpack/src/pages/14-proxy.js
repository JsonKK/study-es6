(function(){
  {
    var obj = new Proxy({}, {
      get: function (target, propKey, receiver) {
        console.log(`getting ${propKey}!`);
        return Reflect.get(target, propKey, receiver);
      },
      set: function (target, propKey, value, receiver) {
        console.log(`setting ${propKey}!`);
        return Reflect.set(target, propKey, value, receiver);
      }
    });
    obj.count = 1;
    ++obj.count;
  }

  {
    //定义对象
    let person = {
      name : '张三'
    }

    // 实例proxy
    let proxy = new Proxy(person,{
      //定义get获取到了数据，判断如果存在person内则返回，否则抛出异常
      get(target,key){
        if(key in target){
          return target[key];
        }
        else{
          return ('this key:'+key+' is not in target');
        }
      }
    })

    console.log(proxy.name);
    console.log(proxy.age);
  }

  {
    const createArray = function(...elements) {
      let handler = {
        get(target, propKey, receiver) {
          let index = Number(propKey);
          if (index < 0) {
            propKey = String(target.length + index);
          }
          //Reflect当前对象
          return Reflect.get(target, propKey, receiver);
        }
      };
    
      let target = [];
      target.push(...elements);
      return new Proxy(target, handler);
    }
    
    let arr = createArray('a', 'b', 'c');
    console.log(arr[-1])
  }

  {
    //设定一种场景，访问对象的id，则对象的访问数量加1
    var proxy = new Proxy({
      id : 'testId',
      visiteTimes : 0
    },{
      get(target,key){
        if(key == 'id'){
          target.visiteTimes++;
        }
        return target[key]
      }
    });

    proxy.id;
    proxy.id;
    console.log('visiteTimes次数',proxy.visiteTimes);
  }

  {
    
    //把proxy设置到对象上查看效果
    var object = {
      proxy : new Proxy({name:'jsonkk',age:18},{})
    }
    //和直接定义的效果一样
    console.log(object.proxy.name);
  }

  {
    //穿插object.create的用法
    //为什么q 33读取不到
    //为什么要设置writabl 才能修改p的值
    let o = Object.create({q:33},{p:{value:42,writable:true}});
    console.log(o);
    o.p = 24;
    console.log(o.p);
  }

  {
    // proxy支持的拦截操作实战
    let proxy = new Proxy({id:'no.89757',age:'18',_name:'jsonKK'},{
      // 拦截 key in target
      has(target,key){
        if(key[0] == '_'){
          return false
        }
        return true
      },
      //拦截delete属性
      deleteProperty(target,key){
        if(key[0] == '_'){
          return false
        }
        //只返回布尔值是没用的，还需要手动删除target的key属性
        delete target[key]
        return true
      }
    })

    //校验has属性是否生效
    console.log('proxy内是否有_name属性','_name' in proxy);
    console.log('proxy内是否有id属性','id' in proxy);
    delete proxy['id'];
    console.log('删除id后的proxy',proxy);
  }

  {
    //利用get属性实现一个生成各种dom节点的通用函数dom
    const dom = new Proxy({},{
      get(target,key){
        //第一个参数为属性值
        //第二个参数为节点内容的字符串
        return function(attrs = {},...children){
          //创建dom节点
          const el = document.createElement(key);
          //遍历属性，赋值给dom
          for(let prop of Object.keys(attrs)){
            el.setAttribute(prop,attrs[prop]);
          }
          //增加子节点
          for(let child of children){
            if(typeof child === 'string'){
              child = document.createTextNode(child);
            }
            el.appendChild(child);
          }
          return el;
        }
      }
    })

    // 构造页面结构
    const el = dom.section(
      {class:'main'},'main容器',
      dom.ul({class:'ul-list'},
        'ul盒子',
        dom.li({},'li-one'),
        dom.li({},'li-two'),
        dom.li({},'li-three')
      )
    )

    document.body.append(el);
  }

  {
    //set属性实战场景，假设对象有age属性，age只能是1~200之间的整数，其余情况的赋值不改变值，收集错误日志
    const proxy = new Proxy({age : 1,log:[]},{
      set(target,key,value){
        if(key == 'age'){
          //判断数值是否为1-100
          let reg = /^([1-9][0-9]{0,1}|100)$/;
          if(!reg.test(value)){
            let date = new Date().toUTCString();
            target.log.push('时间：'+date+' 传入非法数据:'+value);
          }
          else{
            target[key] = value;
          }
          return true;
        }
        //如果要修改log阻止
        else if(key == 'log'){
          return true;
        }
        else{
          target[key] = value;
          return true;
        }
      },
      //删除拦截
      deleteProperty(target,key){
        if(key == 'log'){
          return true;
        }
        else{
          delete target[key];
        }
      }
    })

    proxy.age = 101;
    proxy.age = 99;
    proxy.age = 'hello world';
    proxy.age = undefined;
    //无法为log赋值新的值
    proxy.log = 'delete';
    // 无法删除log
    delete proxy.log;
    console.log('proxyLog收集：',proxy.log);
  }

  {
    //测试this指向问题
    //proxy this指向的是
    const proxy = new Proxy(new Date(),{
      get(target,key){

        //
        if(typeof target[key] == 'function'){
          return target[key].bind(target);
        }
        else{
          return target[key];
        }
      }
    });
    //this is not a Date object. 报错
    console.log('proxy.getDate',proxy.getDate());
  }

  {
    const fn = function(left, right){
      console.log('i am fn');
      return left + right;
    }
    const obj = new Proxy(fn,{
      get(target,propKey,receiver){
        console.log('get');
        return Reflect.get(target,propKey,receiver);
      },
      set(target,propKey,value,receiver){
        console.log('set');
        return Reflect.set(target,propKey,value,receiver);
      },
      apply(target, thisBinding, args){
        console.log('apply',thisBinding,args);
        return Reflect.apply(...arguments);
      },
      //拦截作为构造函数调用
      //并不知道如何触发
      construct(target, args){
        console.log('construct',target,args);
        return new target(...args);
      }
    })

    //会被apply方法拦截
    //执行步骤
    // 1.被apply拦截
    // 2.执行fn方法
    // 3.返回执行结果
    // 4.得到的数据为函数返回值
    // console.log(obj(1,2));

    //执行步骤
    // 1.先被get拦截
    // 2.被apply拦截
    // 3.执行fn函数
    // 4.返回函数值
    // 5.copyObj 为fn返回的值
    // const copyObj = obj.call({name:'xixihaha'},1,2);
    // console.log(copyObj)

    //执行步骤
    // 1.先被construct拦截器拦截
    // 2.再执行fn方法
    // 3.copyFn为一个对象
    // const copyFn = new obj();
    // console.log(copyFn);
  }
})()