Array.prototype.myReduce = function (callBack, initialValue) {
  if (this == null) {
    throw new Error("Calling myReduce on null value");
  }
  if (typeof callBack !== "function") {
    throw new Error("Callback is not a function");
  }
  let obj = Object(this);
  const len = obj.length;
  let accumulator;
  let startIndex = 0;
  //check if initial value provided
  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    while (startIndex < len && !(startIndex in obj)) {
      startIndex++;
    }
    accumulator = obj[startIndex++];
  }
  for (let i = 0; i < len; i++) {
    if (i in obj) {
      accumulator = callBack(accumulator, obj[i], i, obj);
    }
  }
  return accumulator
};

const arr = [1, 2, 3, 4];

const sum = arr.reduce((acc, val) => acc + val, 0);
console.log(sum); // 10

const noInit = arr.reduce((acc, val) => acc + val);
console.log(noInit); // 10 (starts from first element)
