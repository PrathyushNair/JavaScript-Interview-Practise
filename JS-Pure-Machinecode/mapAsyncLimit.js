// Implement a mapLimit function that is similar to the Array.map() which returns a promise that resolves on the list of output by mapping each input through an asynchronous iteratee function or rejects it if any error occurs.
// It also accepts a limit to decide how many operations can occur at a time.

// The asynchronous iteratee function will accept a input and a callback. 
//The callback function will be called when the input is finished processing, the first argument of the callback will be the error flag and the second will be the result.

//Input:
let numPromise = mapLimitFunctionWithoutReducer([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 2000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));

// Output:
// /// first batch
// 2
// 4
// 6
// /// second batch
// 8
// 10
// /// final result
// "success: [2, 4, 6, 8, 10]



Array.prototype.chunk=function(chunkSize)
{
    let result=[]
    let temp=[...this]
    for(let i=0;i<temp.length;i++)
    {
        result.push(temp.slice(i,i+chunkSize))
        i=i+chunkSize-1
    }
    console.log(result)
    return result
}

// function mapLimitFunction(arr,chunkSize,iterateFn){
//     Array.prototype.chunk=function(chunkSize)
// {
//     let result=[]
//     let temp=[...this]
//     for(let i=0;i<temp.length;i++)
//     {
//         result.push(temp.slice(i,i+chunkSize))
//         i=i+chunkSize-1
//     }
//     return result
// }
//     console.log(arr,chunkSize,iterateFn);

//     return new Promise((resolve,reject)=>{
//         let chunks=arr.chunk(chunkSize);
//         const final=chunks.reduce((a, b) => { 
//             let result=[]
//             let tasksCompleted = 0;
//             return a.then((val)=>{
//               return new Promise((resolve,reject)=>{
//                 console.log("val",val);
//                 b.forEach((item)=>{
//                     iterateFn(item,(error,value)=>{
//                         if(error) {
//                             reject(error);
//                         } else {
//                             result.push(value);
//                             tasksCompleted++;
//                             if( tasksCompleted>=b.length){
//                                 resolve([...val,...result]);
//                             }
//                         }
//                     })
//                 })
//               })
//             })
//          }, Promise.resolve([]));
//          final
//          .then((result) => {
//            resolve(result);
//          })
//          .catch((e) => {
//            reject(e);
//          });
//     })

    
// }

function mapLimitFunctionWithoutReducer(arr,chunkSize,iterateFn){
    Array.prototype.chunk=function(chunkSize)
{
    let result=[]
    let temp=[...this]
    for(let i=0;i<temp.length;i++)
    {
        result.push(temp.slice(i,i+chunkSize))
        i=i+chunkSize-1
    }
    console.log(result)
    return result
}
return new Promise(async(resolve,reject)=>{
    try{
        let chunks=arr.chunk(chunkSize)
        console.log("Chunks",chunks);
        let finalResult=[]
        for(let chunk of chunks){
            let result=  await Promise.all(
                chunk.map((item)=>{
                   return new Promise((resolve,reject)=>{
                        iterateFn(item,(error,value)=>{
                            if(error) {
                                reject(error);
                            } else {
                                resolve(value);
                                
                            }
                        })
                    })
                })
            )
            finalResult.push(...result);
        }
        resolve(finalResult);
    }
    catch(error){
        reject(error);
    }
})
}
  
