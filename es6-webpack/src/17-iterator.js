(function(){

    {
        //自定义迭代器方法
        function chef(foods){
            let i = 0;
            return {
                next(){
                    let done = (i>=foods.length);
                    let value = !done ? foods[i++] : undefined;
                    return{
                        value,
                        done
                    }
                }
            }
        }

        let jsonKk = chef([':apple:',':egg:']);
        console.log(jsonKk.next());
        console.log(jsonKk.next());
        console.log(jsonKk.next());
    }
})()