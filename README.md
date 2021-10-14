# README

## Instalation MongoDB

1. Go to https://www.mongodb.com/try/download/community
2. Download mongodb Server
3. From project run `cd ../mongodb/bin`
4. `./mongod --dbpath ~/Desktop/Capstone/dateBase` for starting db server.

## Weather request

### Current Weather - `api.openweathermap.org/data/2.5/weather?id={cityId}&appid={key}`

Respones fields - `https://openweathermap.org/current`

### Forecast - `api.openweathermap.org/data/2.5/forecast?id={cityID}&units=metric&appid=6bc2f94dd98d90d1299be3fab517f8c9&cnt={count * 3 hours}`

Response fields - `https://openweathermap.org/forecast5`
