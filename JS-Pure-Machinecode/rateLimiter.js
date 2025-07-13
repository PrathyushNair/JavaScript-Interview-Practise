function rateLimiter(maxAttempts,timeWindow){
    const userMap=new Map()

    return function isAllowed(userKey){
        let userRecord=userMap.get(userKey)
        if(!userRecord){
            userMap.set(userKey,{count:1,startTime:Date.now()})
            return true
        }
        const {count,startTime}=userRecord

        if((Date.now()-startTime)>timeWindow){
            userMap.set(userKey,{count:1,startTime:Date.now()})
            return true
        }
        if(count<maxAttempts){
            userRecord.count=userRecord.count+1
            return true
        }
        return false
    }
}