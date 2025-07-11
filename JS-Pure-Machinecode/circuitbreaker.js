
function circuitBreaker(fn,totalAllowedFilaureCount,timeThreshold){
    let failureCount=0
    let lastFailureExectuedAt=null
    let isCircuitOpen=false
    return async  (...args)=>{
        if(isCircuitOpen){
            if(Date.now()-lastFailureExectuedAt>timeThreshold){
                isCircuitOpen=false
            }
            else{
                throw new Error('Service Unavailable')
            }
        }
        try{
            const result= await fn(...args)
            failureCount=0
            isOpen=false
            return result
        }catch(erorr){
            failureCount++
            lastFailureExectuedAt=Date.now()
            if(failureCount>=totalAllowedFilaureCount){
                isCircuitOpen=true
            }
            throw new Error('An error occured while executing')
        }

    }
}

function circuitBreakerWithPolling(fn,maximumFailureAllowed,timeThreshold,maxRetryAttempt,delayForRetry){
    let isOpen=false
    let lastErrorTime=null
    let failureCount=0
    return async (...args)=>{
        if(isOpen){
            if(Date.now()-lastErrorTime>timeThreshold){
                failureCount=0
                isOpen=false
            }
            else{
                throw Error('Circuit Closed')
            }
        }
        for(let attempt=1;attempt<maxRetryAttempt;attempt++){
            try{
                const result=fn(...args)
                failureCount=0
                isOpen=false
                return result
            }
            catch(error){
                failureCount++
                lastErrorTime=Date.now()
                if(failureCount>totalAllowedFilaureCount){
                    isOpen=true
                    break
                }
                if(attempt<=maxRetryAttempt){
                   await new Promise((res)=>setTimeout(res,delay))
                }
                console.log("An Error in executing function")
            }
        }

    }
}
