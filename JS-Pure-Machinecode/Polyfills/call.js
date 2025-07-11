Function.prototype.myCall=function(context,...args){
    if(typeof this!=='function'){
        throw new Error('myCall cannot be attached to non function')
    }
    context=context||globalThis
    let fnSymbol=Symbol('fn')
    context[fnSymbol]=this
    const result = context[fnSymbol](...args)
    delete context[fnSymbol]
    return result
}
function sayHello(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
  }
  
  const person = { name: "Prathyush" };
  
  sayHello.myCall(person, "Hello", "!"); 