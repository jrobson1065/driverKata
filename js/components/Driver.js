import { convertMinutes } from "../app.js";

export class Driver {
  constructor(name) {
    this.name = name;
    this.minutes = 0;
    this.miles = 0;
    this.mph = 0;
  }

  addTrip(trip) {
    const minutes =
      convertMinutes(trip.endTime) - convertMinutes(trip.startTime);
    this.addMinutes(minutes);
    this.addMiles(trip.milesDriven);
    this.updateMph();
  }

  addMinutes(minutes) {
    this.minutes += minutes;
  }

  addMiles(miles) {
    this.miles += parseFloat(miles, 10);
  }

  updateMph() {
    this.mph = this.miles / (this.minutes / 60);
  }
}
