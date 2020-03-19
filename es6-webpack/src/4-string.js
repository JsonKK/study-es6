(function(){
    {
        const fruit = `\u0026\u0023\u0078\u0032\u0037\u0030\u0038`;
        console.log(fruit);
        document.getElementById('unicode').innerHTML = fruit;
    }

    {
        // 模板字符串插入方法
        let dessert = 'cake';
        let drink = 'coffee';

        kitchen`今天早餐是${dessert}与${drink}!`;
        kitchen``;
        kitchen`这是一段纯文本`;
        kitchen`<p>这是一段包含标签的文本</p>`;

        function kitchen(strings,...value){
            // console.log('strings',strings);
            // console.log('...value',value);
            let result = '';
            //输出模板字符串内的东西
            for(var i = 0;i<value.length;i++){
                result += strings[i];
                result += value[i];
            }
            result += strings[strings.length-1];
            console.log('模板字符串通过方法输出:',result);
        }

        //判断字符是否以某个字符开头
        console.log('字符串是否以某个字符开头-',`${drink}是否以co开头：${drink.startsWith('co')}`);
        // 判断字符串是否以某个字符结尾
        console.log('字符串是否以某个字符结尾-',`${dessert}是否是以ke结尾：${dessert.endsWith('ke')}`);
        //判断字符串是否包含某个字符
        console.log('字符串是否包含某个字符',`${drink}是否包含fe：${drink.includes('fe')}`);
    }

    {
        // 展开操作符
        let foods = [{breakfast:'bread'},{lunch:'rice'},{dinner:'noodle'}]
        console.log('展开foods',...foods);
    }

    {
        // 合并操作符
        console.log(`😂`);
    }
})()
