const myPromise = new Promise((resolve,reject)=>{
    setTimeout(() => resolve(42),2000);
});

// const data = await myPromise; //await merge doar cu fisiere js modul
// console.log(data);

myPromise.then((data) => data+data).then(console.log);



// setTimeout(()=> console.log(2),1000);
// setTimeout(()=> console.log(3),2000); //cod asincron
// console.log(1); //cod sincron
const apiKey = import.meta.env.VITE_OWM_API_KEY;
await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Cluj-Napoca,RO&units=metric&appid=${apiKey}`)
.then((res) => res.json())
    .then(displayWeatherData);


function displayWeatherData(data) {
    const sinks = document.querySelectorAll('[data-weather]');
    for(const sink of sinks){
        const path = sink.dataset.weather;
        const parts = path.split('.');
        console.log(parts);
       const toDisplay = getData(parts,data);
       sink.textContent = toDisplay;
    }

}

function getData(pathAsArray,obj){
    let val = obj;
    for(const part of pathAsArray){
        val = val[part];
    }
    return val;
}



