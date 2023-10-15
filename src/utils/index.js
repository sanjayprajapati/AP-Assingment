
export const  MakeQuerablePromise = (promise)=> {
    
    if (promise.isFulfilled) return promise;

    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;

    var result = promise.then(
        function(v) {
            isFulfilled = true;
            isPending = false;
            return v; 
        }, 
        function(e) {
            isRejected = true;
            isPending = false;
            throw e; 
        }
    );

    result.isFulfilled = function() { return isFulfilled; };
    result.isPending = function() { return isPending; };
    result.isRejected = function() { return isRejected; };
    return result;
}

export const courseHours = (n)=>{
    let hr = Math.floor(n)
    return hr
}
export const courseMinutes = (n)=>{
    let hr = Math.floor(n);
    let min = Math.ceil((n - hr)*60)
    return min

}