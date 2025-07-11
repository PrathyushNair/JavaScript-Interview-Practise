Array.prototype.myFilter=function(callback,thisArgs){
    if(this==null){
        throw new Error('Calling myFilter on null value')
    }
    if(typeof callback!=='function'){
        throw new Error('Callback is not a function')
    }
    let obj=Object(this)
    let len=obj.length
    const resultArr=[]
    for(let i=0;i<len;i++){
        if(i in obj && callback.call(thisArgs,obj[i],i,obj)){
            resultArr.push(obj[i])
        }
    }
    return resultArr
}
const arr = [1, 2, 3, 4, 5];
const even = arr.myFilter((n) => n % 2 === 0);
console.log(even); // [2, 4]
