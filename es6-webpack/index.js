// import test from "./src/test"
// import "./src/const"
// import "./src/scope"
// import "./src/arrow-function"
// import "./src/parameter"
// import "./src/proxy"
// test()

//第一章变量的学习
import {main as _variate} from './src/1-variate';
_variate();

//字符串学习
//直接引入自执行文件顺序比其他文件都高
import './src/4-string';

//第十章对象的学习
import {main as _object} from './src/10-object';
_object();

//第十二章特殊标识学习
import {main as _symbol} from './src/12-symbol';
_symbol();

//第十三章set 和 map方法
import {main as _setMap} from './src/13-set&map';
_setMap();