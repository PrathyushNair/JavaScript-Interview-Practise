class GetMinStack{
    constructor(){
        this.arr=[]
        this.min=-1
    }
    showArr(){
        return this.arr
    }
    push(data){
        if(this.arr.length==0){
            this.arr.push(data)
            this.min=data
        }
        else if(data<this.min){
            this.arr.push(2*data-this.min)
            this.min=data
        }
        else{
            this.arr.push(data)
        }      
    }
    pop(){
        if(this.arr.length==0){
            return 
        }
        let popElem=this.arr.pop()
        if(popElem<this.min){
            this.min=2*this.min-popElem
        }
    }
    peek(){
        if(this.arr.length==0){
            return -1
        }
        let topElem=this.arr[this.arr.length-1]
        return topElem>this.min? topElem:this.min
    }
    getMin() {
        if (this.arr.length === 0) {
            return -1;
        }
        return this.min;
    }
}
let ss = new GetMinStack();
ss.push(2);
ss.push(3);
console.log(ss.showArr())
console.log(ss.peek(), " ");
ss.pop();
console.log(ss.showArr())
console.log(ss.getMin(), " ");
ss.push(1);
console.log(ss.getMin(), " ");



console