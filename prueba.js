let array1= [1,3,4,5,6,7,8,9,10,13];
let array2 = [1,6,9,19,78];
let array3 = [];
for (let i = 0; i < array1.length; i++) {
 for (let j = 0; j < array2.length; j++) {
if(array1[i]===array2[j]){
array3.push(array2[j])
}
  
 }
  
}
console.log(array3)