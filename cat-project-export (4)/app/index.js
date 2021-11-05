import clock from "clock";                      // needed for clock
import document from "document";                // needed to function
import { preferences } from "user-settings";    // needed for 12 h / 24 h displayed
import { zeroPad, } from "../common/utils";     // import user function zeroPad
import { HeartRateSensor } from "heart-rate";  // import heartrate
import { battery } from "power";                // import power level
import userActivity from "user-activity";       // import activity
import { display } from "display";
import * as document from "document";

// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const timeHandle = document.getElementById("timeLabel");
const batteryHandle = document.getElementById("batteryLabel");
const stepsHandle = document.getElementById("stepsLabel");
const distanceHandle = document.getElementById("distanceLabel");
const heartrateHandle = document.getElementById("heartrateLabel");
const dateHandle = document.getElementById("dateLabel");
const hrImage = document.getElementById("hr2");
const cats1Image = document.getElementById("cats1");
const cats2Image = document.getElementById("cats2");

// getting the heartrate data on the screen
const hrm = new HeartRateSensor();
hrm.onreading = function() {
  heartrateHandle.text = `${hrm.heartRate}`; 
}
hrm.start();

// getting the time on the screen
clock.ontick = (evt) => {
  
  const now = evt.date; 
  let hours = now.getHours();                    // fetch the hours
  let mins = now.getMinutes();                   // fetch the minutes
  let secs = now.getSeconds();                   // fetch the seconds
  

  
  if (preferences.clockDisplay === "12h") {     // for 12 hr screen
    hours = hours % 12 || 12;
  } else {                                       // for 24 h screen
    hours = zeroPad(hours);
  }
  
  let minsZeroed = zeroPad(mins);
  let secsZeroed = zeroPad(secs);
  timeHandle.text = `${hours}:${minsZeroed}:${secsZeroed}`;
  
  let day = zeroPad(now.getDate());
  let month = zeroPad(now.getMonth() + 1);
  let year = now.getFullYear();
  
  dateHandle.text = `${day}.${month}.${year}`;
  
// getting the activity on the screen
let stepsValue = (userActivity.today.adjusted["steps"] || 0);
let stepsString = stepsValue;
stepsHandle.text = stepsString + ' steps';

let distanceValue = (userActivity.today.adjusted["distance"] || 0);
let distanceString = (distanceValue/1000) + ' km';
distanceHandle.text = distanceString;
  
let batteryValue = battery.chargeLevel;       // for battery level
batteryHandle.text = `Battery: ${batteryValue} %`;


  if (display.on) {
    if (secs % 2 == 0) {
      cats1Image.style.visibility = "hidden";
      cats2Image.style.visibility = "visible";
      hrImage.style.visibility = "visible";
      
    }
    else { 
      cats2Image.style.visibility = "hidden";
      cats1Image.style.visibility = "visible";
      hrImage.style.visibility = "hidden"
    }
  } 

}