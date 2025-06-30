function debouncer(fn,delay){
    let timerId
    return function(...args){
        clearTimeOut(timerId)
        timerId=setTimeOut(()=>{
            fn(...args)
        },delay)
    }
}