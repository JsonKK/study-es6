import * as constants from './constants.js';
import {B} from './constants';
var utils = require('../utils/utils.js');
// import utils from './utils/utils.js';

var begin = function(){
    utils.quiteConsole(constants.A,'constants.A',__filename);
    utils.quiteConsole(B,'B',__filename);
}

module.exports = begin;