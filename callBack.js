
// Callback
function loadImageWithCallback(url, callback){
    callback(url);
}
function helloCallBack(){
   setTimeout(function (){
        var url = "https://stringee.com/vi/blog/post/setTimeout-setInterval-trong-Javascript"
        loadImageWithCallback(url, function(url1){
            console.log(`Image loaded frome ${url1}`)
        })
    },2000)
}
helloCallBack()
// DOne callback
// Promise 
function fetchData(url){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            if(url == "https://api.example.com/data"){
                resolve({
                    data:"hello world"
                })
            }
            else reject("URL không hợp lệ")
        },1000)     
    })
}
function onSucces(url){
    console.log(url)
}
function onErr(url){
    console.log(url)
}
fetchData("https://api.example.com/data/a").then(onSucces,onErr )
// Done Promise

function task1(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('Đã hoàn thành task 1')
        },1000)
    });
}
function task2(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('Đã hoàn thành task 2')
        },2000)
    });
}
function task3(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('Đã hoàn thành task 3')
        },3000)
    });
}
async function runTasks(){

    console.time("Total Time");

    console.time("Task 1 Time");
    console.log(await task1());
    console.timeEnd("Task 1 Time");

    console.time("Task 2 Time");
    console.log(await task2());
    console.timeEnd("Task 2 Time");

    console.time("Task 3 Time");
    console.log(await task3());
    console.timeEnd("Task 3 Time");

    console.timeEnd("Total Time");
}
runTasks()