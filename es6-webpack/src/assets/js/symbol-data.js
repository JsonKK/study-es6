//加for是允许重复，外部可以找到
//不加for保持唯一性，外部不会覆盖
const FOO_KEY = Symbol('foo');
function A(){
    this.foo = 'hello';
}
//这样外部就不会覆盖了
if(!global[FOO_KEY]){
    global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];