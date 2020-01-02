var main = function () {
    // unicode字符表示法
    {
        // 校验非空字符
        // console.log(/^\S$/.test('吉'));
        // console.log(/^\S$/u.test('中'));

        //返回字符串长度
        function codePointLength(text) {
            let result = text.match(/[\s\S]/gu);
            return result ? result.length : 0;
        }

        var s = '喆';
        console.log('喆的长度是%d', s.length);
        console.log('喆的长度是%d', codePointLength(s));
    }

    //y修饰符
    {
        var s = 'aaa_aa_a';
        var r1 = /a+/g;
        var r2 = /a+/y;
        console.log('第一次校验r1输出值为', r1.exec(s));
        console.log('第一次校验r2输出值为', r2.exec(s));

        console.log('第二次校验r1输出值为', r1.exec(s));
        console.log('第二次校验r2输出值为', r2.exec(s));
    }

    //计算连续的a出现的次数
    {
        var s = 'aaa_aa_a';
        var r = /a+/g;
        var hasA = true;
        var i = 0;
        while (hasA) {
            if (Array.isArray(r.exec(s))) {
                i++;
            }
            else {
                hasA = false;
            }
        }
        console.log(s + '中重复a,出现了%d次', i);
    }

    //使用正则lastindex属性
    {
        const REGEX = /a/g;

        //从索引2开始匹配
        REGEX.lastIndex = 2;
        let str = 'xaya';
        const r1 = REGEX.exec(str);
        console.log(str + '第一次匹配到的索引%d', r1.index);
        console.log('下次匹配开始的索引位置%d', REGEX.lastIndex);
        let str2 = 'saga';
        const r2 = REGEX.exec(str2);
        console.log(str2 + '第二次匹配到的索引%s', r2 && r2.index);
    }

    //y字符的作用
    {
        const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
        const TOKEN_G = /\s*(\+|[0-9]+)\s*/g;

        function tokenize(TOKEN_REGEX, str) {
            let result = [];
            let match;
            while (match = TOKEN_REGEX.exec(str)) {
                result.push(match[1]);
            }
            return result;
        }
        let str = ' 3x +4';
        console.log('y字符校验结果为', tokenize(TOKEN_Y, str));
        console.log('g字符校验结果为', tokenize(TOKEN_G, str));

    }

    //新增了sticky属性
    {
        var r = /hello\d/y;
        console.log('正则表达式中是否包含y属性%s', r.sticky);
    }

    //返回正则表达式的正文和修饰符
    {
        var reg = /abc/ig;
        console.log(reg.toString() + '的内容是：%s', reg.source);
        console.log(reg.toString() + '的修饰符是：%s', reg.flags);
    }

    //点搭配s 匹配任意字符
    //（.）时任意字符，但有两个例外。一个是四个字节的UTF-16字符，这个可以用u修饰符解决，另一个是行终止符。
    //报错： Invalid flags supplied to RegExp constructor 's'
    {
        // let str = 'foo\nbar';
        // let reg1 = /foo.bar/;
        // let reg2 = /foo.bar/s;
        // console.log(reg1.toString()+'校验'+str,reg1.test(str));
        // console.log(reg2.toString()+'校验'+str,reg2.test(str));
    }

    //具名组匹配
    {
        const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
        var str = (new Date()).toJSON();
        const matchObj = RE_DATE.exec(str);
        if(matchObj && matchObj.length == 4){
            const year = matchObj[1]; // 1999
            const month = matchObj[2]; // 12
            const day = matchObj[3]; // 31
            console.log('匹配年月日格式:',year + '-' + month + '-' + day);
        }
        else{
            console.log(matchObj);
        }
        
    }

    //具名组匹配变量名
    {
        //无法使用
        // const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
        // var str =  RE_DATE.exec('1999-12-31');
        // var str = (new Date()).toJSON();
        // const matchObj = RE_DATE.exec(str);
    }

    //
}

module.exports = main;