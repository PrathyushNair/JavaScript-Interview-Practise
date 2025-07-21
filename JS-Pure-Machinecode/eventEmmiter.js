class MyEventEmitter{
    constructor(){
        this.event={}
    }
    //Adding a event listener
    on(eventName,listener){
        if(!this.event[eventName]){
            this.event[eventName]=[]
        }
        this.event[eventName].push(listener)
    }
    //Call a listener
    emit(eventName,...args){
        if(this.event[eventName]){
            this.event[eventName].forEach((listener)=>{
                listener(...args)
            })
        }
    }
    //Remove a listener
    off(eventName,listenerToRemove){
        if(this.event[eventName]){
            this.event[eventName]=this.event[eventName].filter((listener)=>listener!=listenerToRemove)
        }
    }   
    once(eventName,listener){
            const wrapper=(...args)=>{
                listener(...args)
                this.off(eventName,wrapper)
            }
            this.on(eventName,wrapper)
    }

}