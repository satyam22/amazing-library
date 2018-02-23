// function resolveAfter2Second(){
//     return new Promise(resolve=>{
//     setTimeout(()=>{
//     resolve('resolved')},2000);
//     });
//     }
//     function asyncCall(){
//     let result= await resolveAfter2Second();
//     console.log("result::"+result);
//     }
//     asyncCall();
let isMomHappy=true;
let isSheAgree=true;
let promise1=new Promise((resolve,reject)=>{
    if(isMomHappy)
    resolve({message:'Yes i got my phone'});
    else
    reject("Something changed my mom's mind");
});
// let promise2=new Promise((resolve,reject)=>{
//     if(isSheAgree)
//     resolve({message:'Now you got phone lets go on ride'});
//     else
//     reject("Its no big deal that you got phone.i can't go on ride.i have other plans");
// });
let askHer=function(result){
    
  
        if(isSheAgree){
            console.log("=========31======");
            Promise.resolve({message:"Now you got phone lets go on ride"});            
        }
        else{
            console.log('=====35=======');
            Promise.reject("Its no big deal that you got phone.i can't go on ride.i have other plans");
            
        }
}
promise1.then(result=>askHer(result))
.then(result=>{
    console.log("==========38====");
    console.log("after result::"+result.message);
}).catch(error=>{
    console.log(error);
})