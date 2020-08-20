import { FileHelper } from "./components/FileHelper.js";
import { Driver } from "./components/Driver.js";
import { Trip } from "./components/Trip.js";

export const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

export const fileHelper = new FileHelper();
const textFileToRead = "input.txt";
const commandLines = convertTextFileToCommandLines(textFileToRead);

export let drivers = [];
export let trips = [];

export function convertTextFileToCommandLines(textFile) {
  const input = fileHelper.readStringFromFileAtPath(textFile);

  if (isMac) {
    return input.split("\n");
  } else {
    return input.split("\r\n");
  }
}

function runApp() {
  commandLines.forEach((line) => {
    const instance = createInstanceFromCommandLine(line);
    sortInstance(instance);
  });
  addTripInfoToDrivers();
  sortDrivers();
  printOutput();
}

export function sortInstance(instance) {
  if (instance instanceof Driver) drivers.push(instance);
  if (instance instanceof Trip) {
    const mph = getMPH(instance);
    if (mph >= 5 && mph <= 100) trips.push(instance);
  }
}

export function createInstanceFromCommandLine(line) {
  const words = line.split(" ");
  const command = words[0];
  let args = [];

  for (let i = 1; i < words.length; i++) {
    args.push(words[i]);
  }

  if (command === "Driver") {
    return new Driver(args[0]);
  }
  if (command === "Trip") {
    return new Trip(args[0], args[1], args[2], args[3]);
  }
}

export function getMPH(trip) {
  const minutes = convertMinutes(trip.endTime) - convertMinutes(trip.startTime);
  return Math.round(parseFloat(trip.milesDriven, 10) / (minutes / 60));
}

export function convertMinutes(time) {
  const hours = parseInt(time.split(":")[0], 10);
  let minutes = parseInt(time.split(":")[1], 10);

  minutes += hours * 60;
  return minutes;
}

export function addTripInfoToDrivers() {
  trips.forEach((trip) => {
    const tripDriver = trip.driver;
    drivers.forEach((driver) => {
      const driverName = driver.name;
      if (tripDriver === driverName) {
        driver.addTrip(trip);
      }
    });
  });
}

function sortDrivers() {
  drivers.sort((a, b) => parseFloat(b.miles) - parseFloat(a.miles));
}

function printOutput() {
  drivers.forEach((driver) => {
    const h2 = document.createElement("h2");
    if (driver.miles === 0) {
      h2.innerHTML = `${driver.name}: ${Math.round(
        parseFloat(driver.miles)
      )} miles`;
    } else {
      h2.innerHTML = `${driver.name}: ${Math.round(
        parseFloat(driver.miles)
      )} miles @ ${driver.mph} mph`;
    }

    document.body.appendChild(h2);
  });
}

runApp();
