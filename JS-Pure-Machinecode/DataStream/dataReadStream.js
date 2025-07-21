const { error } = require('console')
const fs=require('fs')
const path=require('path')
function readStream(){
    const readStream=fs.createReadStream('./input.txt',{ encoding: 'utf8', highWaterMark: 16 * 1024 })

const data=''
readStream.on('data',(chunk)=>{
    data=data+chunk
    console.log('data')
})

readStream.on('end',()=>{
    console.log('reading done')
})
readStream.on('error',(error)=>{
    console.log(error)
})
}

(function () {
    let sentence='This is a line of sample text to test stream chunking.\n'
const repetitions = 2000;
let content=''
for(let i=0;i<repetitions;i++){
    content=content+''
}
fs.writeFileSync('./input.txt',content,'utf8',(error)=>{
    console.log('error',error)
})
console.log('writing done')
})()

setTimeout(()=>{
    readStream()
},1000)


