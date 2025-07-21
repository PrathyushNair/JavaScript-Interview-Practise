function poll(fn,args,options){
    const {pollInterval,maxTimeOut,shouldStop,maxAttempts=10}=options
   return new Promise((resolve,reject)=>{
    let startTime=Date.now()
    let attempt=0
            async function poll(){
                const timeElapsed=Date.now()-startTime
                if(timeElapsed>maxTimeOut){
                    return reject(new Error('Time Out'))
                }
                if(attempt>maxAttempts){
                    return reject('Max Attempt exceeded')
                }
                try{
                    attempt++
                    const result=await fn(...args||[])
                    if(shouldStop(result)){
                        return resolve(result)
                    }
                    if(result){
                        return resolve(result)
                    }
                    await new Promise(setTimeout(res,pollInterval))
                    poll()
                }catch(error){
                    reject(error)
                }
            }
            poll()
    
   })
   
}