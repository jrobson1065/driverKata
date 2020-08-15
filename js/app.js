import { Driver } from "./components/Driver.js";
import { Trip } from "./components/Trip.js";

export let drivers = [];
export let trips = [];

export const line1 = "Driver Dan";
export const line2 = "Driver Lauren";
const line3 = "Driver Kumi";
export const line4 = "Trip Dan 07:15 07:45 17.3";
const line5 = "Trip Dan 06:12 06:32 21.8";
const line6 = "Trip Lauren 12:01 13:16 42.0";

const lines = [line1, line2, line3, line4, line5, line6];

export function runApp() {
  const line1 = "Driver Dan";
  const line2 = "Driver Lauren";
  const line3 = "Driver Kumi";
  const line4 = "Trip Dan 07:15 07:45 17.3";
  const line5 = "Trip Dan 06:12 06:32 21.8";
  const line6 = "Trip Lauren 12:01 13:16 42.0";

  const lines = [line1, line2, line3, line4, line5, line6];

  lines.forEach((line) => {
    const object = createObjectFromCommandLine(line);
    sortObject(object);
  });

  addTripInfoToDrivers();
  printOutput();
}

export function sortObject(object) {
  if (object instanceof Driver) {
    drivers.push(object);
  }

  if (object instanceof Trip) {
    const mph = getMPH(object);
    if (mph >= 5 && mph <= 100) trips.push(object);
  }
}

export function createObjectFromCommandLine(line) {
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

export function addTripInfoToDrivers() {
  trips.forEach((trip) => {
    let tripDriver = trip.driver;

    drivers.forEach((driver) => {
      let driverName = driver.name;
      if (tripDriver === driverName) {
        driver.addTripInfo(trip);
      }
    });
  });
}

export function getMPH(trip) {
  const mins = convertMinutes(trip.endTime) - convertMinutes(trip.startTime);

  return Math.round(parseFloat(trip.milesDriven, 10) / (mins / 60));
}

export function convertMinutes(time) {
  const hours = parseInt(time.split(":")[0], 10);
  let mins = parseInt(time.split(":")[1], 10);

  mins += hours * 60;

  return mins;
}

export function printOutput() {
  drivers.sort((a, b) => parseFloat(b.miles) - parseFloat(a.miles));

  drivers.forEach((driver) => {
    if (driver.miles === 0) {
      console.log(
        driver.name + ": " + Math.round(parseFloat(driver.miles)) + " miles"
      );
    } else {
      console.log(
        driver.name +
          ": " +
          Math.round(parseFloat(driver.miles)) +
          " miles @ " +
          Math.round(parseFloat(driver.mph)) +
          " mph"
      );
    }
  });
}

runApp();