function promiseAll(promises){
    return new Promise((resolve,reject)=>{
        let result=[]
        let executionCount=0
        if(!Array.isArray(promises)){
            reject(new Error('Array of promises not provided'))
        }
        if(promises.length==0){
            resolve([])
        }
        promises.forEach((promise,index)=>{
            Promise.resolve(promise)
            .then((value)=>{
                result[index]=value
                executionCount++
                if(executionCount==promises.length){
                    resolve(result)
                }
            }).catch((error)=>{
                reject(error)
            })
        })

    })
}
const p1 = Promise.resolve(1);
const p2 = 42; 
const p3 = new Promise((resolve) => setTimeout(() => resolve('done'), 1000));
promiseAll([p1,p2,p3]).then((value)=>{
    console.log(value)
}).catch((err)=>{
    console.log(err)
})