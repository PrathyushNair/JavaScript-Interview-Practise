class Stack
{
    constructor(capacity){
        this.arr=[]
        this.top=-1
        this.capacity=capacity
    }
    push(el){
        if(this.top>=this.capacity-1){
            console.log('Stack Overflow')
            return false
        }
        this.top=this.top+1
        this.arr[this.top]=el
        return true
    }
    pop(){
        if(this.top<0){
            console.log('Stack UnderFlow')
            return 0
        }
        let popEl=this.arr[this.top]
        this.top--
        return popEl
    }
    peek(){
        if(this.top<0){
            console.log('Stack Empty')
            return 0
        }
        return this.arr[this.top]
    }
    isEmpty(){
        return this.top<0
    }
    size(){
        if (this.top<=0){
            return 0
        }
        return this.top+1
    }
}

let s = new Stack(5);
// s.push(10);
// s.push(20);
// s.push(30);
console.log(s.size() + " Size");
console.log(s.pop() + " popped from stack");
console.log(s.pop() + " popped from stack");
console.log(s.pop() + " popped from stack");
console.log("Top element is:", s.peek());