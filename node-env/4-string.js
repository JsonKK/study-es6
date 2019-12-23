var main = function(){

    //4.1
    //unicode用法
    {
        console.log('\\u0061=%s','\u0061');
        console.log('\\uD842\\uDfB7=%s','\uD842\uDfB7');
        console.log('\\u20bb7=%s','\u20bb7');
        console.log('\\u{20bb7}=%s','\u{20bb7}');
        console.log('\\u{41}\\u{42}\\u{43}=%s','\u{41}\u{42}\u{43}');

        let hello = 123;
        console.log('hello=hell\\u{6f}=%d',hell\u{6f});

        console.log('\\u{1F680} === \\uD83D\\uDE80,%s,%s,%s','\u{1F680}','\uD83D\uDE80','\u{1F680}'==='\uD83D\uDE80');

        
    }
}

module.exports = main;