const get_city_name = document.querySelector("#input")
const button = document.querySelector("#button")
const weatherStates = document.querySelector(".weather")
const cities = document.querySelector("#city")
const temp = document.querySelector(".temp")
const tempMin = document.querySelector(".min")
const tempMax = document.querySelector(".max")
const today = new Date()
const time = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`
console.log(today.getDate())
console.log(today.getMonth() + 1)
console.log(today.getFullYear())
const times = document.querySelector("#locatime")
const humidity=document.querySelector(".humidity")
const wind = document.querySelector(".wind")
const weatherimg = document.querySelector(".img")
const img_lst = ["cloud.png","rain.png","sun.png","storm.png","snow.png","clean.png"]

button.addEventListener("click", async function () {
    times.innerHTML = time
    const cityname = get_city_name.value
    const request = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=24a8ab1b971bfeb47ba40b91f97d93f7`);
    const response = await request.json();
    const data = response[0]
    const lat = data['lat']
    const lon = data['lon']
    const get_weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=24a8ab1b971bfeb47ba40b91f97d93f7`);
    const weather = await get_weather.json();
    const weatherState = weather.weather[0].main
    console.log("weatherStates")
    weatherStates.innerHTML = weatherState
    weatherimg.setAttribute("src",weatherState == "Clouds"? img_lst[0]:
                                    weatherState =="Rain"? img_lst[1]:
                                    weatherState == "Sun"? img_lst[2]:
                                    weatherState == "Storm"? img_lst[3]:
                                    weatherState == "Snow"? img_lst[4]:"clean.png")
                            
    console.log(weatherState)
    const temps = weather.main.temp - 273.15
    temp.innerHTML = String(Math.floor(temps)) + "&deg" + "C"
    const tempmin = weather.main.temp_min - 273.15
    tempMin.innerHTML = "Min :" + String(Math.floor(tempmin)) + "&deg" + "C"
    const tempmax = weather.main.temp_max - 273.15
    tempMax.innerHTML = "Max :" + String(Math.floor(tempmax)) + "&deg" + "C"
    city.innerHTML = data.name
    var d= new Date ((new Date().getTime())-25200*1000)
    console.log(d.toISOString())
    const humidiTy=weather.main.humidity
    humidity.innerHTML="Humidity :" + String(Math.floor(humidiTy)) + "&deg" + "C"
    const winD = weather.wind.speed
    wind.innerHTML="Wind speed :"+String(Math.floor(winD)) + "&deg" +"C"

})



// function getWeatherReport(city){
//     fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}`)
//     .then(wether =>{
//         return weather.json();
//     }).then(showWeatherReport);
// }
// // Show wether report
// function showWeatherReport(weather){
//     console.log(weather);
// }
