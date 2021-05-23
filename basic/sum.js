console.log("hello");
function sum(item){
    let total=0
    for(let i=1;i<(item+1);i++){
        total+=i
    }
    return total
}
console.log(sum(1)); // 1
console.log(sum(2)); // 3
console.log(sum(10)); // 55
console.log(sum(100000)); 
//千萬要注意for迴圈內是區域變數let