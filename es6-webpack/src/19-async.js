(function(){
  const privateMethod = {
    id:'',
    get_id_romote(){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve('abc')
        },0)
      })
    },
    async get_id_async(){
      let id = await this.get_id_romote();
      return id;
    },
    getId(){
      let id = this.id;
      if(!id){
        id = this.get_id_async();
        // this.id = id;
      }
      return id;
    }
  }
  // 最后测试失败
  // 无法同步取到返回的id
  let id = privateMethod.getId();
  console.log('第一次',id);
  id = privateMethod.getId();
  console.log('第二次',id);
})()