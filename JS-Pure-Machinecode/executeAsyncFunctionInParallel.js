
// Implement a function in JavaScript that takes a list of async functions as input and a callback function and 
// executes the async tasks in parallel that is all at once and invokes the callback after every task is executed.

Input:
// executeParallel([asyncTask(3), asyncTask(1), asyncTask(2)], (result) => {
// console.log(result);
// });

// Output:
// [2, 1, 3]

// If taskes are promises
function executeAsyncPromiseFunction(taskArr,callback){
    let successtaskResults=[]
    let errorResults=[]
    let taskCompleted=0
    taskArr.forEach((task)=>{
        task.then((value)=>{
            successtaskResults.push(value)
        })
        .catch((error)=>{
            errorResults.push(error)
        })
        .finally(()=>{
            taskCompleted++
        })
        if (taskCompleted >= taskArr.length) {
            callback(errors, results);
          }
    })
}

//If normal tasks
function executeParallelTasks(taskArr,callback){
    let successtaskResults=[]
    let errorResults=[]
    let taskCompleted=0
    taskArr.forEach((task)=>{
        task.then((value)=>{
            successtaskResults.push(value)
        })
        .catch((error)=>{
            errorResults.push(error)
        })
        .finally(()=>{
            taskCompleted++
        })
        if (taskCompleted >= taskArr.length) {
            callback(errors, results);
          }
    })
}