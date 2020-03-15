var main = function(){
    
    {
        let now = new Date();
        console.log('Date parse/转换为时间戳',Date.parse(now));
        let someDate = new Date(Date.parse('2019-02-02'));
        console.log('someDate',someDate);

        let start = new Date();
        let count = 0;
        for(var i=0;i<10000;i++){
            count++;
        }
        let stop = new Date();
        console.log('distance=',stop-start);
        console.log(count);
    }

    {
        //日期格式化
        let now = new Date();
        let dString = now.toDateString();
        console.log(dString);
    }
}

module.exports = main;