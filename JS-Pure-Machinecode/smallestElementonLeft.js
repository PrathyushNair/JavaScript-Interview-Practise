var leftSmallestElement = function(nums1) {
    let ans=[]
    let stack=[]
    for(let i=0;i<nums1.length;i++){
        while(stack.length!==0 && stack[stack.length-1]>=nums1[i]){
            stack.pop()
        }
        if(stack.length==0){
            ans[i]=-1
        }
        else{
            ans[i]=stack[stack.length-1]
        }
        stack.push(nums1[i])

    }
    console.log(ans)
};

var leftLargestElement = function(nums1) {
    let ans=[]
    let stack=[]
    for(let i=0;i<nums1.length;i++){
        while(stack.length!==0 && stack[stack.length-1]<=nums1[i]){
            stack.pop()
        }
        if(stack.length==0){
            ans[i]=-1
        }
        else{
            ans[i]=stack[stack.length-1]
        }
        stack.push(nums1[i])

    }
    console.log(ans)
};

var rightLargestElement = function(nums1) {
    let ans=[]
    let stack=[]
    for(let i=nums1.length-1;i>=0;i--){
        while(stack.length!==0 && stack[stack.length-1]<=nums1[i]){
            stack.pop()
        }
        if(stack.length==0){
            ans[i]=-1
        }
        else{
            ans[i]=stack[stack.length-1]
        }
        stack.push(nums1[i])

    }
    console.log(ans)
};

var rightSmallestElement = function(nums1) {
    let ans=[]
    let stack=[]
    for(let i=nums1.length-1;i>=0;i--){
        while(stack.length!==0 && stack[stack.length-1]>=nums1[i]){
            stack.pop()
        }
        if(stack.length==0){
            ans[i]=-1
        }
        else{
            ans[i]=stack[stack.length-1]
        }
        stack.push(nums1[i])

    }
    console.log(ans)
};