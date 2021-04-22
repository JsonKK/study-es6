// 三种状态
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

//定义promise
class Promise {
  constructor(fn){
    const that = this;
    if(typeof fn !== 'function'){
      throw new Error(`Promise resolver ${fn} is not a function`);
    }
    //初始化状态为等待
    that.currentState = PENDING;
    //初始化回调值为空
    that.value = undefined;
    //用于保存then的缓存回调函数，只有当promise状态为pending的时候才能缓存
    that.resolvedCallbacks = [];
    // 用于存储catch的缓存回调方法
    that.rejectedCallbacks = [];
    that.resolve = function(value){
      // 如果value是promise,递归执行
      if(value instanceof Promise){
        return value.then(that.resolve,that.reject);
      }
      //异步执行保证顺序
      setTimeout(()=>{
        //状态为等待才执行
        if(that.currentState === PENDING){
          that.currentState = RESOLVED;
          that.value = value;
          that.resolvedCallbacks.forEach((cb) => cb && cb());
        }
      })
    }

    //失败原因
    that.reject = function(reason){
      setTimeout(()=>{
        if(that.currentState === PENDING){
          that.currentState = REJECTED;
          that.value = reason;
          that.rejectedCallbacks.forEach((cb)=>cb && cb());
        }
      })
      console.log('reject');
    }

    try{
      fn(that.resolve,that.reject);
    }
    catch(err){
      that.reject(err)
    }
  }

  then(nResolved, onRejected){
    
  }
}

try{
  module.exports = Promise;
}
catch(err){
  console.log(err);
}
