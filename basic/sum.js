console.log("hello");
function sum(item){
    let total=0
    for(i=0;i<item;i++){
        total+=i
    }
    return total
}
console.log(sum(1)); // 1
console.log(sum(2)); // 3
console.log(sum(10)); // 55
console.log(sum(100000)); 