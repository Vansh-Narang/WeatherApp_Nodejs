const { response } = require('express');
const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express();
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
app.post('/', (req, res) => {
    const querycity = req.body.cityname;
    const apikey = '13ca0c89d8cd04873921fbc32a542965';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + querycity + '&appid=' + apikey + '&units=metric'
    https.get(url, (response) => {
        //    console.log(response.statusCode);
        response.on('data', (data) => {
            const weatherdata = JSON.parse(data);
            //  console.log(weatherdata)
            try {
                const temperature = weatherdata?.main?.temp;
                let pressure = weatherdata?.main?.pressure
                // const descr = weatherdata?.weather[0]?.description;
                //more than one send method use (write instead of send)
                res.send("the pressure is" + temperature)
            } catch (error) {
                console.log(error);
            }
            // res.write("temperature at" + querycity, "is " + temp)
            // res.write("Condition at +" + querycity + "is" + descr)
        })
    })
    console.log("the request is recived");
})
app.listen(port, () => {
    console.log("Server Listening");
})