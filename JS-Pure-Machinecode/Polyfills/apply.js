Function.prototype.myApply=function(context,argsArray){
    if(typeof this!=='function'){
        throw new Error(' Cannot use myApply on a non function')
    }
    context =context||globalThis

    fnSymbol=Symbol('fn')
    context[fnSymbol]=this
    let result;
    if(argsArray==null){
        result=context[fnSymbol]()
    }
    else{
        if(!Array.isArray(argsArray)){
            throw Error(' An array of arguements must be passed')
        }
    }
    result=context[fnSymbol](...argsArray)
    delete context[fnSymbol]
    return result
}

function saySomething(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
  }
  
  const user = { name: 'Prathyush' };
  
  saySomething.myApply(user, ['Hey', '!']);