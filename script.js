document.addEventListener('DOMContentLoaded', bindButtons)


function bindButtons(){
    document.getElementById("get-weather-button").addEventListener('click', function(event)
    {
        var req = new XMLHttpRequest()
        var endpoint = "https://api.openweathermap.org/data/2.5/weather?"
        var apiKeyPrefix = "&appid="
        var apiKey = "098d9c9da2cbf6afe932af1dace2cf62"
        var city = document.getElementById("input_city_value").value
        var zipcode = document.getElementById("input_zip_value").value
        var country = ',us'
        var units = '&units=imperial' // make units imperial
        var payload 

        if (zipcode){
            payload = endpoint + "zip=" + zipcode + country + units + apiKeyPrefix + apiKey
        }
        else {
            payload = endpoint + "q=" + city + country + units + apiKeyPrefix + apiKey
        }

        req.open("GET", payload, true)
        req.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded')
        req.addEventListener("load", function(){
            if (req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText)
                console.log(response)           // write response to console to verify call is working
                document.getElementById('city-name').textContent = "Today in " + response.name
                document.getElementById('temp').textContent = "The temperature is " + Math.floor(response.main.temp) + ' degrees'
                document.getElementById('desc').textContent = response.weather[0].description
                document.getElementById('feels-like').textContent = "and feels like " + Math.floor(response.main.feels_like) + ' degrees'
                document.getElementById('temp-low').textContent = "Today's low will be " + Math.floor(response.main.temp_min) + ' degrees'
                document.getElementById('temp-high').textContent = "Today's high will be " + Math.floor(response.main.temp_max) + ' degrees'
                document.getElementById('humidity').textContent = "Humidity stands at " + response.main.humidity + '%'
                document.getElementById('windspeed').textContent = "Windspeeds of " + response.wind.speed + 'mph'
                document.getElementById('cloudiness').textContent = response.clouds.all + "%" + " cloudy"
            }
            else {
                console.log('Error ' + req.statusText)
            }
        })
        req.send(JSON.stringify(payload))
        event.preventDefault()
    })

}