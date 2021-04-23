import myPromise from '@assets/js/my-promise.js';
import { reject } from 'underscore';



//promise缺点
//首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
//其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
//第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
const initOriginal = function () {
	

	{
		const sleep = function (ms) {
			return new Promise(function (resolve) {
				setTimeout(resolve, ms);
			});
		}

		sleep(50).then(() => { console.log(':egg:') });
	}

	{
		//1.reject()等价于抛出错误
		//2.如果状态已经变为resolved,再抛出错误是无效的
		//3.错误具有冒泡性质，会一直向后传递，知道被捕获为止
		const p1 = function (msg) {
			return new Promise(function (resolve, reject) {
				setTimeout(() => resolve('来自p1的信息' + msg), 1000)
			})
		}

		const p2 = new Promise(function (resolve, reject) {
			setTimeout(() => resolve(p1('p2信息')), 1000)
		})

		//p2依赖于p1，状态不仅仅受自身限制，还收到p1限制
		p2
			.then(result => console.log(result))
			.catch(error => console.log(error))
	}

	{
		//两个注意点
		//如果在一定promise的时候就有then，则返回参数只会在这个then里返回
		//console 在resolve后面，但是会先执行
		var times = new Promise((resolve, reject) => {
			resolve(1 + 'a');
			console.log(2 + 'a');
		}).then(r => {
			console.log(r);
		});
		times.then((r) => { console.log(r + 'b') });
	}

	{
		let p1 = new Promise(function (resolve, reject) {
			resolve({ a: 1 });
		});
		let p2 = new Promise(function (resolve, reject) {
			resolve({ b: 2 });
		});
		let p3 = new Promise(function (resolve, reject) {
			resolve([1, 2, 3]);
		});
		//同时执行多个promise，执行返回的结果会被当做数组返回。
		//如果多个promise中有一个是失败的，则all执行catch,并在回调函数里返回第一个抛出异常的方法信息
		Promise.all([p1, p2, p3]).then(function (results) {
			console.log(results);
		}).catch(function (r) {
			console.log("error");
			console.log(r);
		});

		//会把最先成功的参数返回，其他promise成功参数无法获取
		//暂时想不到使用场景
		const race = Promise.race([p1, p2, p3]);
		race.then((a, b, c) => {
			console.log(a);
		})

		//使用场景是当关心多个promise活动状态而不是活动结果的时候使用，all方法就无法做到这点
		//会等到所有返回再返回
		//在第一个参数返回数据
		//数据和传入的数组一一对应
		//0: {status: "fulfilled", value: {…}}
		// 1: {status: "fulfilled", value: {…}}
		// 2: {status: "rejected", reason: Array(3)
		const allSettled = Promise.allSettled([p1, p2, p3]);
		allSettled.then((a, b, c) => {
			console.log(a);
		})

		//promise any方法
		//返回参数只返回最早执行的then 和race类似
		const any = Promise.any([p1, p2, p3]);
		any.then((a, b, c) => {
			console.log('any then a:', a);
			console.log(b);
		})
	}

	{
		//测试多个promise调用
		let test = function () {
			return new Promise((resolve) => {
				setTimeout(() => {
					let randomNum = parseInt(Math.random() * 10);
					resolve('这是一个测试被调用许多次的promise' + randomNum);
				}, 500);
			})
		}
		test().then((res) => {
			console.log(res)
		})
		test().then((res) => {
			console.log(res)
		})
		test().then((res) => {
			console.log(res)
		})

	}

	{
		const ajax = function (callBack) {
			setTimeout(() => {
				callBack && callBack('resolve返回')
			}, 0)
		}
		//返回promise 实例状态为resolve
		//then直接返回ajax 
		const resolve = Promise.resolve(ajax);
		resolve.then((a) => { console.log('ajax', a) })

		//让函数变为异步操作
		//使用场景可以替代setTimeout(fn,0)
		Promise.resolve().then(ajax((msg) => {
			console.log('使用resolve方式书写', msg);
		}))
		//使用try 方式执行
		//参数为一个需要执行的方法
		Promise.try(function () {
			ajax((msg) => {
				console.log('使用try方式书写', msg);
			})
		})
		//会被先执行
		console.log('异步操作之后的操作');
	}
	
}

// 调试自主封装的promise
const initSelf = function(){
	{	console.log(1);
		const fn = function(){
			return new myPromise((resolve,reject)=>{
				console.log(2);
				setTimeout(()=>{
					resolve('join in');
				})
				
			})
		}
		fn().then((value)=>{
			console.log('value',value);
		});
		console.log(3);
		
	}
}

export {
	initOriginal,
	initSelf
}