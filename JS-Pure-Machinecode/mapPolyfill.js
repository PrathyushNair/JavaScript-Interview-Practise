
Array.prototype.myMap=function(callBack){
    let result=[]
    for(let i=0;i<this.length;i++){
        result.push(callBack(this[i],i,this))
    }
    return result
}
const arr=[1,2,3]
const double=arr.myMap((x)=>x*2)
console.log(double)

Array.prototype.myFilter= function(callback){
    let result=[]

    for(let i=0;i<this.length;i++){
        if(callback(this[i],i,this)){
            result.push(this[i])
        }
    }
    return result
}