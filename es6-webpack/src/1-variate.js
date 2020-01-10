export function main(){
    {
        // 拉平数组
        let arr = [1,[2,[3,[{name:'jsonKK'}]]]];
        console.log('拉平1个数组',arr.flat());
        console.log('拉平2个数组',arr.flat(2));
        console.log('拉平全部个数组',arr.flat(Infinity));
    }
}