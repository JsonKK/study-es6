
const initAllMethods = function(classProperty:{
  [key:string] : Function
}){
  const methodNames = Object.getOwnPropertyNames(classProperty);
  methodNames.forEach((methodName:string)=>{
    if(methodName !== 'constructor'){
      classProperty[methodName] && classProperty[methodName]();
    }
  })
}

export {
  initAllMethods
}

