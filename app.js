const { response } = require('express');
const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express();
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
app.post('/', (req, res) => {
    const querycity = req.body.cityName;
    console.log("the city is" + querycity);
    const apikey = '13ca0c89d8cd04873921fbc32a542965';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + querycity + '&appid=' + apikey + '&units=metric'
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on('data', (data) => {
            let weatherdata = JSON.parse(data);
            //    let temperature = weatherdata.main.temp;
            // let long = weatherdata.coord.lon
            // console.log(long);
            //  console.log(weatherdata)
            try {
                let temperature = weatherdata?.main?.temp;
                let pressure = weatherdata?.main?.pressure
                console.log(temperature);
                // const descr = weatherdata?.weather[0]?.description;
                //more than one send method use (write instead of send)
                res.send("the temperature is" + temperature)
            } catch (error) {
                console.log(error);
            }
            // try {
            //     res.write("temperature at" + querycity, "is " + temperature)
            // } catch (error) {
            //     console.log(error);
            // }
            // res.write("Condition at +" + querycity + "is" + descr)
        })
    })
    console.log("the request is recived");
})
app.listen(port, () => {
    console.log("Server Listening");
})