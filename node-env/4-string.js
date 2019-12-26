var main = function () {

    //4.1
    //unicode用法
    {
        console.log('\\u0061=%s', '\u0061');
        console.log('\\uD842\\uDfB7=%s', '\uD842\uDfB7');
        console.log('\\u20bb7=%s', '\u20bb7');
        console.log('\\u{20bb7}=%s', '\u{20bb7}');
        console.log('\\u{41}\\u{42}\\u{43}=%s', '\u{41}\u{42}\u{43}');

        let hello = 123;
        console.log('hello=hell\\u{6f}=%d', hell\u{6f});

        console.log('\\u{1F680} === \\uD83D\\uDE80,%s,%s,%s', '\u{1F680}', '\uD83D\uDE80', '\u{1F680}' === '\uD83D\uDE80');
    }

    //遍历字符串
    {
        for (let codePointe of 'foo') {
            console.log('遍历的字符串是codePointe=%s', codePointe);
        }
    }

    //字符串方法
    {
        console.log('jsonString输出%s', JSON.stringify('\uDF06\uD834'));
    }

    //模板字符串
    {
        let basket = {
            count: 10,
            onSale: '在售'
        };
        let modelStr = ` There are <b>${basket.count}</b> items in your basket, <em>${basket.onSale}</em>are on sale!`;
        console.log('输出模板字符串:\nmodelStr=%s', modelStr);

        //不想要空格处理
        let list = `
            <ul>
                <li>first</li>
                <li>second</li>
            </ul>
        `.trim();
        console.log('压缩过的模板字符串list=%s', list);

        //模板字符串嵌套
        const tmpl = (addrs) => `
            <table>
            ${addrs.map(addr => `
                <tr><td>${addr.first}</td></tr>
                <tr><td>${addr.last}</td></tr>
            `).join()}
            </table>
        `;
        const sendData = [
            { first: '<Jane>', last: 'Bond' },
            { first: 'Lars', last: '<Croft>' }
        ];
        console.log('模板字符串嵌套:', tmpl(sendData));
    }

    // 模板编译
    {
        // 使用<%%>放置javascript代码
        // 使用<%= ..%>输出javascript表达式
        let template = `
            <ul>
                <% for(let i = 0;i<data.supplies.length;i++) { %>
                    <li><%= data.supplies[i]%></li>
                <%}%>
            </ul>
        `;

        function compile(template) {
            const evalExpr = /<%=(.+?)%>/g;
            const expr = /<%([\s\S]+?)%>/g;

            template = template
                .replace(evalExpr, '`); \n echo ( $1 ); \n echo(`')
                .replace(expr, '`); \n $1 \n echo(`');
            template = 'echo(`' + template + '`);';

            let script =
                `(function parse(data){
                let output = "";

                function echo(html){
                    output += html;
                }

                ${template}

                return output;
            })`;

            return script;

        }

        let parse = eval(compile(template));
        let html = parse({ supplies: ["broom", "mop", "cleaner"] });
        console.log('html', html);


    }

     //标签模板
     {
        console.log`'这是个标签模板输出',123`;

        let a = 5;
        let b = 10;
        let parms = `Hello ${a + b} world ${a * b}`;
        console.log(parms);
        // 等于console.log(['Hello ', ' world ', ''], 15, 50);
        console.log`Hello ${a + b} world ${a * b}`;

        //输出逻辑推导
        function tag(s,v1,v2){
            if(Array.isArray(s)){
                console.log(s);
                s.forEach(function(o,i){
                    // console.log(o);
                });
            };
            console.log(v1);
            console.log(v2);
        }
        tag`Hello ${a + b} world ${a * b}`;

        //复杂的标签模板
        let total = 30;
        let msg = passthru`The total is ${total} (${total*1.05} with tax)`;
        function passthru(literals){
            let result = '';
            let i = 0;

            while(i < literals.length){
                result += literals[i++];
                console.log('result',result);
                if(i < arguments.length){
                    result += arguments[i];
                }
            }
            return result;
        }
        console.log(msg);
    }

    //函数采用rest参数的写法
    {
        //复杂的标签模板
        let total = 30;
        let msg = passthru`The total is ${total} (${total*1.05} with tax)`;
        function passthru(literals, ...values){
            let output = '';
            let index;
            for(index = 0; index < values.length; index++){
                output += literals[index] + values[index];
            }
            output += literals[index];
            return output;
        }
        console.log(msg);
    }

    //标签模板  过滤html
    {
        let sender = '<script>alert("abc")</script>';
        let message = 
            SafeHtml`<p>${sender} has sent you a message</p>`;
        function SafeHtml(templateData){
            let s = templateData[0];
            for(let i = 1; i < arguments.length; i++){
                let arg = String(arguments[i]);

                s += arg.replace(/&/g,'&amp')
                        .replace(/</g,'&lt')
                        .replace(/>/g,'&gt');
                s += templateData[i];
            }
            return s;
        }
        console.log('过滤html',message);
    }

    //模板字符串中的raw属性
    {
        tag`First line\nSecond line`;

        function tag(strings){
            console.log('模板字符串中的raw属性',strings.raw);
        }
    }

    {
        function tag(strs){
            console.log(strs);
            console.log(strs.raw[0] === '\\unicode and \u{55}');
        }
        tag`\\unicode and \u{55}`;
    }
}

module.exports = main;