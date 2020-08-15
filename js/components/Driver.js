export class Driver {
    constructor(name) {
        this.name = name;
        this.mins = 0;
        this.miles = 0;
        this.mph = 0;
    }

    addTripInfo(trip) {
        const mins = this.convertMinutes(trip.endTime) - this.convertMinutes(trip.startTime);
        this.addMins(mins);
        this.addMiles(trip.milesDriven);
        this.updateMPH();
    }

    convertMinutes(time) {
        const hours = parseInt(time.split(":")[0], 10);
        let mins = parseInt(time.split(":")[1], 10);

        mins += hours * 60;

        return mins;
    }

    addMins(mins) {
        this.mins += mins;
    }

    addMiles(miles) {
        this.miles += parseFloat(miles, 10);
    }

    updateMPH() {
        this.mph = Math.round(this.miles / (this.mins / 60));
    }
}