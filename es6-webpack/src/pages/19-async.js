(function(){

  {
    const privateMethod = {
      id:'',
      get_id_romote(){
        return new Promise((resolve,reject)=>{
          setTimeout(()=>{
            let isPass = Boolean(Math.round(Math.random()));
            if(isPass){
              resolve('abc')
            }
            else{
              reject('abc')
            }
            
          },0)
        })
      },
      async get_id_async(){
        let id;
        // 希望获取id 不论成功与否都不要影响外部函数的执行
        try{
          id = await this.get_id_romote();
        }
        catch(e){
          console.warn('获取id失败');
        }
        return id;
      },
      getId(){
        return new Promise((resolve)=>{
          let id = this.id;
          if(!id){
            this.get_id_async().then((newId)=>{
              this.id = newId;
              resolve();
            });
          }
          else{
            resolve()
          }
        });
      }
    }
    // 最后测试失败
    // 无法同步取到返回的id
    privateMethod.getId().then(()=>{
      console.log('第一次获取异步id',privateMethod.id);
    });
    privateMethod.getId().then(()=>{
      console.log('第二次获取异步id',privateMethod.id);
    });
  }

  {
    //使用sync 实现洗牌翻牌动画
    // 全部牌打开
    const allOpen = function(){
      return new Promise((resolve)=>{
        let text = '翻开全部牌!';
        // 判断牌是否翻开
        let isOpen = Boolean(Math.round(Math.random()));
        if(isOpen){
          console.log(text);
          resolve();
        }
        else{
          setTimeout(()=>{
            console.log(text);
            resolve();
          },1000)
        }
      })
    }

    //洗牌
    const washCard = function(){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          console.log('洗牌成功！');
          resolve();
        },1000);
      })
    }

    //发牌
    const assignCard = function(){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          console.log('派牌成功！');
          resolve()
        },1000)
      })
    }
    let isCardLoading = false;
    //重新开牌
    //把洗牌的全流程放在了一个方法里，方便总开关的控制
    // const reloadCard = async function(){
    //   isCardLoading = true;
    //   await allOpen();
    //   await washCard();
    //   await assignCard();
    //   isCardLoading = false;
    //   return isCardLoading;
    // }

    //重写reload方法，使reload的方法更加通用
    const reloadCard = async function(options,animations){
      let ret = null
      try{
        for(let animate of animations){
          ret = await animate(options)
        }
      }
      catch(e){
        console.warn(e);
      }
      return ret;
    }

    //构建按钮元素
    let btnCard = document.createElement('button');
    btnCard.innerText = '洗牌';
    btnCard.addEventListener('click',()=>{
      if(!isCardLoading){
        isCardLoading = true;
        reloadCard({},[allOpen,washCard,assignCard]).then(()=>{
          isCardLoading = false;
        });
      }
      
    })
    document.body.appendChild(btnCard);
  }

  {
    // 同时执行函数
    const getFoo = function(){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          console.log('一秒后获取的getFoo');
          resolve('foo');
        },1000);
      })
    }
    const getBar = function(){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          console.log('零点五秒后获取的getBar');
          resolve('bar');
        },500);
      })
    }

    const dbFun = async function(){
      //两个方法会同时执行，bar的信息会先被输出
      let [foo,bar] = await Promise.all([getFoo(),getBar()]);

      //foo执行结束才会执行bar函数
      // let foo = await getFoo();
      // let bar = await getBar();
      return [foo,bar];
    }

    dbFun();
  }
 
})()