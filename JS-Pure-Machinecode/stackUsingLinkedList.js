class Node{
    constructor(data){
        this.data=data
        this.next=null
    }
}

class Stack{
    constructor(){
        this.head=null
    }
    isEmpty(){
        return this.head==null
    }
    push(newData){
        let newNode= new Node(newData)
        if(!newNode){
            console.log('Stack Overflow')
            return 
        }
        newNode.next=this.head
        this.head=newNode
    }
    pop(){
        if(this.isEmpty()){
            console.log('Cannot pop')
            return 
        }
        let temp=this.head
        this.head=this.head.next
        temp=null
    }
    peek(){
        if(!this.isEmpty()){
            return this.head.data
        }
        console.log('Stack Empty')
        return 0
    }
}