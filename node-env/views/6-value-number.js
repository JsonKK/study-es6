var main = function(){
    {
        //二进制表示
        console.log('0b1111=十进制%d',0b1111);
        console.log('0o17=十进制%d',0o17);
        console.log('0xf=十进制%d',0xf);

        //检测数值是否有限
        let x = 3.141592653589793238462643383279502384197169399375105;
        console.log(x + '是否为有限数值%s',Number.isFinite(x));
        console.log('根号2的值为%f,是否为有限数值%s',Math.sqrt(2),Number.isFinite(Math.sqrt(2)));
        console.log('10/3的值为%f,是否为有限数值%s',10/3,Number.isFinite(10/3));
        console.log('Infinity是否为有限数值%s',Number.isFinite(Infinity));

        //判断是否为数值
        console.log('3/0是否为数值%s',Number.isNaN(3/0));
        console.log('字符串15是否为数值%s',Number.isNaN('15'));
        
        //把parseInt 和 parseFloat移植到了Number对象上
        console.log('圆周率转浮点数',Number.parseFloat(x));
        console.log('圆周率转整数',Number.parseInt(x));

        //判断是否为整数
        console.log('25是否为整数%s',Number.isInteger(25));
        console.log('25.1是否为整数%s',Number.isInteger(25.1));
        console.log('25.0是否为整数%s',Number.isInteger(25.0));
        console.log('字符串25.0是否为整数%s',Number.isInteger('25.0'));
        let y = 3.0000000000000002;
        let yStr = '3.0000000000000002';
        //超过js数值表示的最大范围
        console.log('字符串' + yStr + '是否为整数%s',Number.isInteger(y));


        //es6引入上限和下限常量
        console.log('上限是%f,下限是%f',Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER);
        //判断数值是否落在这个区间内
        console.log('字符串5是否属于这个区间%s',Number.isSafeInteger('5'));
        console.log('0.1+0.2是否属于这个区间%s',Number.isSafeInteger(0.2+0.1));
        console.log('51位圆周率是否在这个区间%s',Number.isSafeInteger(x));

        //取整函数
        console.log('null取整是%d',Math.trunc(null));
        console.log('true取整是%d',Math.trunc(true));
        console.log('3/0取整是%d',Math.trunc(3/0));
        console.log('undefined取整是%d',Math.trunc(undefined));

        //判断一个数是正数还是负数
        console.log('圆周率判断正负数%d',Math.sign(x));
        console.log('-100判断正负数%d',Math.sign(-100));
        console.log('-0判断正负数',Math.sign(-0));

        //求数值的立方根
        console.log('8的立方根是%f',Math.cbrt(8));
        console.log('9的立方根是%f',Math.cbrt(9));

        //将参数转为32位无符号位
        console.log('1的32位前置0个数为%d',Math.clz32(1));
        console.log('1左移1位的32位前置0个数为%d',Math.clz32(1 << 1));
        //7转为2进制数为111,右移1位
        console.log('7右移1位的32位前置0个数为%d',Math.clz32(7 >> 1));

        //返回32位单精度浮点数
        console.log('2的24次方是%f',Math.fround(2**24));
        //最大表示范围为2的24次方,大于这个数值精度会丢失
        console.log('2的24次方+1是%f',Math.fround(2**24+1));

        //返回所有参数的和的平方根
        console.log('3的平方加4的平方开根号为：%f',Math.hypot(3,4));

        //变量的n次方
        let b = 2;
        console.log('b的3次方是:%f',b ** 3);
        b **= 4;
        console.log('b的4次方是:%f',b);
    }
};

module.exports = main;