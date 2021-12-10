const sleep = new class {
  constructor(){
    const {fn,sleep} = this;
    fn([
      ()=> console.log('方法开始执行'),
      ()=> sleep(1000),
      ()=> console.log('执行第一步'),
      ()=> sleep(2000),
      ()=> console.log('执行第二步'),
      ()=> sleep(3000),
      ()=> console.log('方法结束')
    ])
  }

  async fn(arr:any[]){
    for(let i = 0;i<arr.length;i++){
      if(typeof arr[i] !== 'function'){
        continue;
      }
      await arr[i]();
    }
  }

  sleep(ms:number){
    return new Promise<void>((resolve)=>{
      setTimeout(()=>{
        resolve();
      },ms)
    })
  }
}()

export default sleep;