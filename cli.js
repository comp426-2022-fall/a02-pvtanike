#!/usr/bin/env node

// Dependencies: load minimiist, moment, and fetch
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';


//Declare timezone based on location
let timezone = moment.tz.guess()


//initialize args of command line reader
const args = minimist(process.argv.slice(2));

//Viewing arguments
//console.log(args)
//console.log(timezone)

//Help command default action
if (args.h){
console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
-h            Show this help message and exit.
-n, -s        Latitude: N positive; S negative.
-e, -w        Longitude: E positive; W negative.
-z            Time zone: uses tz.guess() from moment-timezone by default.
-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
-j            Echo pretty JSON from open-meteo API and exit.
`)
process.exit()
}




// Process options

//Declare latitude
let latitude = '35.90';
if (args.n != undefined){
    const lat = args.n;
    latitude = lat;
}

if(args.s != undefined){
    const lat = args.s;
    latitude = -lat;
}


//Declare longitude
let longitude = '-75.05';
if (args.e != undefined){
    const lon = args.e;
    longitude = lon;
}

if(args.w != undefined){
    const lon = args.w;
    longitude = -lon;
}

//Timezone
if (args.z != undefined){
    timezone = args.z;
}

//Days
let days = 0;
if (args.d != undefined){
    days = args.d;
}

if(args.j){
    // Make a request
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+ latitude + '&longitude=' + longitude+'&daily=precipitation_hours&temperature_unit=fahrenheit&windspeed_unit=mph&timezone='+timezone+'&past_days='+days)
    // Get the data from the request
    const data = await response.json();
    // Log the data onto STDOUT
    console.log(data);
    process.exit(0)

}


// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+ latitude + '&longitude=' + longitude+'&daily=precipitation_hours&temperature_unit=fahrenheit&windspeed_unit=mph&timezone='+timezone+'&past_days='+days)
// Get the data from the request
const data = await response.json();
// Log the data onto STDOUT
console.log(data);



if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}


