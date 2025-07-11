Array.prototype.myMap=function(callback,thisArgs){
    if(this==null){
        throw new Error(' Calling map on null')
    }
    if(typeof callback !== 'function'){
        throw new Error ('Callback is not a function')
    }
    const obj=Object(this)
    const len =obj.length
    let resultArr=new Array(len)

    for(let i=0;i<len;i++){
        if(i in obj){
            resultArr[i]=callback.call(thisArgs,obj[i],i,obj)
        }
    }
    return resultArr
}

const arr=[1,2,3]
const double=arr.myMap((x)=>x*2)
console.log(double)