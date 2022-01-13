import {initAllMethods} from '@utils/index.ts';

export default new class ScopedX{
  constructor(){
    initAllMethods(ScopedX.prototype);
  }

  caseOne(){
    var x = 1;
    function test(x,y = function(){
      x = 3
      console.log(x);
    }){
      console.log(x);

    }
  }
}()