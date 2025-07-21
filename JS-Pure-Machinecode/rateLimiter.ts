export class RateLimiter {
    private maxAllowedAttempts: number;
    private timeWindow: number;
    private userCache: Map<string, { attempts: number; startTime: number }> =
      new Map();
    constructor(maxAllowedAttempts: number, timeWindow: number) {
      this.maxAllowedAttempts = maxAllowedAttempts;
      this.timeWindow = timeWindow;
    }
  
    isAllowed(userKey: string) {
      try {
        const userData = this.userCache.get(userKey);
        if (!userData) {
          this.userCache.set(userKey, { attempts: 1, startTime: Date.now() });
          setTimeout(() => this.userCache.delete(userKey),this.timeWindow);
          return true;
        }
        const elaspedTime = Date.now() - userData.startTime;
        if (elaspedTime > this.maxAllowedAttempts) {
          this.userCache.set(userKey, { attempts: 1, startTime: Date.now() });
          return true;
        }
        if (userData.attempts < this.maxAllowedAttempts) {
          this.userCache.set(userKey, {
            ...userData,
            attempts: userData.attempts + 1,
          });
          true;
        }
        return false;
      } catch (error) {
        throw new Error("An occured in rate limiter");
      }
    }
    getMetaData(userKey: string) {
      const userData=this.userCache.get(userKey)
      if(!userData){
          throw new Error('No user data found from ratelimiting cache')
      }
      const attemptsRemaining= Math.max(this.maxAllowedAttempts-userData.attempts,0)
      const elapsedTime=Date.now()-userData.startTime
      const tryAgainAfter=Math.max(this.timeWindow-elapsedTime,0)
      return {
          attemptsRemaining,tryAgainAfter
      }
    }
  }
  
//Usage

// interface userReq extends Request{
//     userId:string
// }
// let rateLimiter= new RateLimiter(5,60000)
// function rateLimiterMiddleware(req:userReq,resp:Response,next:NextFunction){
//     const userId=req.userId
//     const isAllowed=rateLimiter.isAllowed(userId)
//     if(!isAllowed){
//         const metaData=rateLimiter.getMetaData(userId)
//         resp.status(429).send({
//             status:'failure',
//             message:`Too many attempts. Retry after ${Math.ceil(metaData.tryAgainAfter/1000)}.`
//         })
//     }
//     next()
// }