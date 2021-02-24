
(function(){
    {
        function sleep(ms){
            return new Promise(function(resolve,reject){
                setTimeout(resolve,ms);
            });
        }

        sleep(50).then(()=>{console.log(':egg:')});
    }

    {
        const p1 = new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Error('fail')), 3000)
        })
        
        const p2 = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(p1), 1000)
        })
        
        p2
        .then(result => console.log(result))
        .catch(error => console.log(error))
    }

    {
        var times = new Promise((resolve, reject) => {
            resolve(1+'a');
            console.log(2+'a');
        }).then(r => {
            console.log(r);
        });
        times.then((r)=>{console.log(r+'b')});
    }

    {
        let p1 =new Promise(function(resolve,reject){
            resolve({a:1});
        });
        let p2 = new Promise(function(resolve,reject){
            resolve({b:2});
        });
        let p3 = new Promise(function(resolve,reject){
            resolve([1,2,3]);
        });
        Promise.all([p1, p2, p3]).then(function (results) {
            console.log(results);
        }).catch(function(r){
            console.log("error");
            console.log(r);
        });
    }

    {
        //测试多个promise调用
        let test = function(){
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    let randomNum = parseInt(Math.random() * 10);
                    resolve('这是一个测试被调用许多次的promise' + randomNum);
                },500);
            })
        }
        test().then((res)=>{
            console.log(res)
        })
        test().then((res)=>{
            console.log(res)
        })
        test().then((res)=>{
            console.log(res)
        })

    }
})()