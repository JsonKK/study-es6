class DeepArray {
  baseObj: Object;

  constructor() {
    this._arrayOf();
    this._arrayFrom();
    this._arrayNewMethods();
    this.baseObj = {
      limitNum: 5,
      name: 'tom',
      age: 12,
      sex: 'man'
    };
    this.addUrlParms();
    console.log(Object.getOwnPropertyNames(DeepArray.prototype))
  }

  private _arrayOf() {
    const arr = [
      { name: 'Array.of(8.0)', content: JSON.stringify(Array.of(8.0)) },
      { name: 'Array(8.0)', content: JSON.stringify(Array(8.0)) },
      { name: 'Array.of(8.0,5)', content: JSON.stringify(Array.of(8.0, 5)) },
      { name: 'Array(8.0,5)', content: JSON.stringify(Array(8.0, 5)) },
      { name: 'Array.of(\'8.0\')', content: JSON.stringify(Array.of('8.0')) },
      { name: 'Array(\'8.0\')', content: JSON.stringify(Array('8.0')) }
    ]
    const titleDom = document.createElement('h4');
    titleDom.innerText = 'Array.of 对比 Array';
    document.body.appendChild(titleDom);
    arr.forEach((item) => {
      const codeDom = document.createElement('code');
      codeDom.innerHTML = JSON.stringify(item);
      document.body.appendChild(codeDom);
    })

  }

  private _arrayFrom() {
    const obj = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
    Array.from(obj, (item, index) => {
      console.log(`Array.from${index}`, item);
      return item.repeat(3);
    }, obj);
    console.log('Array.from obj', obj);
  }

  private _arrayNewMethods() {
    const obj = Object.assign({},this.baseObj);
    const arr = ['a', 'b', 'c', 'd', 'e'];
    // 从第三位开始，到最后赋值值给从索引0开始被覆盖
    const arr2 = arr.copyWithin(0, 3);
    console.log(arr2);
    const arr3 = arr.concat('f', ['i', 'j'], 'k');
    console.log(arr3);

    const arr4 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr5 = arr4.map(item => item * 3);
    //函数必须要用
    const fn = function (this: any, value) {
      return value > ((this && this.limitNum) || 5);
    }
    //第二个参数代表this对象，否则为undefind
    //方法必须为命名函数，如果为箭头函数，this则为执行时候的deepArray
    console.log('操作find', arr5.find(fn, obj));
    console.log('操作findIndex', arr5.findIndex(fn));


    //对象转数组
    const arr6 = Object.entries(obj);
    console.log();
  }

  //数组统一增加标识
  addUrlParms(){
    const parmsArr = ['url1','url2','url3'];
    const parmsUrl = parmsArr.reduce(function(_preItem:any,_item:any,index:number):any{
      if(index === 0){
        return _item;
      }
      else{
        return _preItem + '&' + _item;
      }
    })
    console.log('addUrlParms',parmsUrl);
  }
}


export {
  DeepArray
};