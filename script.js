// Selectors

var button = document.getElementById('get-weather-button')
var inputCityValue = document.querySelector('.input_city_value')
var inputZipValue = document.querySelector('.input_zip_value')

var cityName = document.querySelector('.city-name')
var description = document.querySelector('.desc')
var temperature = document.querySelector('.temp')
var feelsLike = document.querySelector('.feels-like')
var tempLow = document.querySelector('.temp-low')
var tempHigh = document.querySelector('.temp-high')
var humidity = document.querySelector('.humidity')
var windSpeed = document.querySelector('.windSpeed')
var cloudiness = document.querySelector('.cloudiness')


// Event Listeners

button.addEventListener('click', function(event){
    event.preventDefault()
    // Make get request using fetch. Ditch old HttpRequest method
    const endpoint = 'https://api.openweathermap.org/data/2.5/weather?q='
    const apiKeyPrefix = '&appid='
    const apiKey = '098d9c9da2cbf6afe932af1dace2cf62'
    const country = ',us'

    payload = endpoint + inputCityValue.value + country + apiKeyPrefix + apiKey
    fetch(payload)
        .then(response => response.json())

        // here we grab all the data returned by the api call and save into variables
        .then(data => {
            var nameValue = data['name']
            var tempValue = data['main']['temp']
            var descValue = data['weather'][0]['description']
            var feelsLikeValue = data['main']['feels_like']
            var tempLowValue = data['main']['temp_min']
            var tempHighValue = data['main']['temp_max']
            var humidityValue = data['main']['humidity']
            var windSpeedValue = data['wind']['speed']
            var cloudinessValue = data['clouds']['all']


            // push data to html 
            temperature.innerHTML = tempValue
            cityName.innerHtml = nameValue
            description.textContent = descValue
        })

    .catch(err => alert("Wrong city name"))
    event.preventDefault()
})



