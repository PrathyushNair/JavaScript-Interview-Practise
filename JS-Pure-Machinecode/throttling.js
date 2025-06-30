function throttler(fn,delay){
    let timerId=null
    let lastExecuted=0
    return function(...args){
        let now =Date.now
        let timeSinceLast=now-lastExecuted
        if(timeSinceLast>=delay)
        { lastExecuted=now
            fn(...args)
        }
        else if(!timerId){
           setTimeOut(()=>{
           lastExecuted=now
           timerId=null
        },delay-timeSinceLast) 
        }

    }
}