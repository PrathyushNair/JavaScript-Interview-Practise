Function.prototype.myBind = function (execContext, ...bindArgs) {
  if (typeof this !== "function") {
    throw new Error("Calling myBind on a non function");
  }
  let originalFunc=this;
  return function boundFunction(...callArgs){
    const isNew=this instanceof boundFunction
    const context= isNew? this: execContext
    return originalFunc.apply(context,[...bindArgs,...callArgs])
  }

};
function intro(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
  }
  
  const person = { name: "Prathyush" };
  
  const boundIntro = intro.myBind(person, "Hi");
  boundIntro("!"); // Hi, Prathyush!