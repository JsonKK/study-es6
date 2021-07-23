var utils = require('../utils/utils.js');
var main = function () {
    //单一数组去重
    let set = new Set([1, 2, 4, 2, 6, 3, 3, 8, 6, 7, 4, 5]);
    console.log('set1:',set );

    //多数组合并去重
    let [arr1, arr2] = [[1, 2, 3, 4], [2, 3, 4, 5, 6]];
    let set2 = new Set([...arr1, ...arr2]);
    console.log( 'set2',set2 );

    //向set中添加元素
    set2.add(7);
    console.log('set2-add',set2 );

    //判断并删除存在的项
    set2.has(1) ? set2.delete(1) : this;
    console.log('set2-delete',set2);

    // 清除set
    set2.clear();
    console.log( 'set2-clear',set2);

    //set转数组
    console.log('set-arr',[...set]);
}

module.exports = main;