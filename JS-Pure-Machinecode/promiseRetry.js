
async function retry(fn,args=[],maxretry,delay){
    let lastError;
    for(let attempt=0;attempt<maxretry;attempt++){
        try{
            const result= await fn(...args)
            return result
        }catch(error)
        {
            lastError=error
            if(attempt<maxretry-1){
                await new Promise((res)=>setTimeout(res,delay))
            }
        }
    }
    console.log(lastError)
    
}