import { Driver } from "../components/Driver.js";
import { Trip } from "../components/Trip.js";
import {
  createObjectFromCommandLine,
  sortObject,
  drivers,
  trips,
  getMPH,
  convertMinutes,
  addTripInfoToDrivers,
} from "../app.js";
import { FileHelper } from "../components/FileHelper.js";

const line1 = "Driver Dan";
const line2 = "Driver Lauren";
const line4 = "Trip Dan 07:15 07:45 17.3";

const driver = createObjectFromCommandLine(line1);
const trip = createObjectFromCommandLine(line4);

describe("FileHelper should pull the text from the text file", () => {
  const fh = new FileHelper();
  const result = fh.readStringFromFileAtPath("test-input.txt");
  const array = result.split(/\n/);

  it("Result should read test then test2 on a new line", () => {
    expect(result).toBe(`test\ntest2`);
  });

  it("Result should separate each new line into array, line 1 (array index 0) should be test", () => {
    expect(array[0]).toBe("test");
  });

  it("Result should separate each new line into array, line 2 (array index 1) should be test2", () => {
    expect(array[1]).toBe("test2");
  });
});

describe("Driver should have name", () => {
  it("Driver1 name should be Dan", () => {
    const driver1 = new Driver("Dan");
    expect(driver1.name).toBe("Dan");
  });
});

describe("Trip should have all fields", () => {
  const trip1 = new Trip("Dan", "07:15", "07:45", "17.3");
  it("Trip1 driver should be Dan", () => {
    expect(trip1.driver).toBe("Dan");
  });
  it("Trip1 start time should be 07:15", () => {
    expect(trip1.startTime).toBe("07:15");
  });
  it("Trip1 end time should be 07:45", () => {
    expect(trip1.endTime).toBe("07:45");
  });
  it("Trip1 miles driven should be 17.3", () => {
    expect(trip1.milesDriven).toBe("17.3");
  });
});

describe("Create objects from command lines", () => {
  it("Command should return a Driver Object with field name Dan", () => {
    expect(driver.name).toBe("Dan");
  });
  it("Command should return a Trip Object with field driver Dan", () => {
    expect(trip.driver).toBe("Dan");
  });
  it("Command should return a Trip Object with field start time 07:15", () => {
    expect(trip.startTime).toBe("07:15");
  });
  it("Command should return a Trip Object with field end time 07:45", () => {
    expect(trip.endTime).toBe("07:45");
  });
  it("Command should return a Trip Object with field miles driven 17.3", () => {
    expect(trip.milesDriven).toBe("17.3");
  });
});

describe("All drivers and trips should be added to array", () => {
  it("First driver should be Lauren", () => {
    expect(drivers[0].name).toBe("Lauren");
  });

  it("Second driver should be Dan", () => {
    expect(drivers[1].name).toBe("Dan");
  });

  it("Third driver should be Kumi", () => {
    expect(drivers[2].name).toBe("Kumi");
  });

  it("First trip should have 17.3 miles", () => {
    expect(trips[0].milesDriven).toBe("17.3");
  });

  it("Second trip should have 21.8 miles", () => {
    expect(trips[1].milesDriven).toBe("21.8");
  });

  it("Third trip should have 42.0 miles", () => {
    expect(trips[2].milesDriven).toBe("42.0");
  });
});

describe("Trip objects should add data to Driver instance", () => {
  it("Driver miles should be updated with trip info", () => {
    if (driver.name === trip.driver) driver.addTripInfo(trip);

    let miles = parseFloat(driver.miles, 10);

    expect(miles).toBe(17.3);
  });
});

describe("Should convert time and return MPH", () => {
  it("01:30 should return 90 minutes", () => {
    const mins = convertMinutes("01:30");
    expect(mins).toBe(90);
  });

  it("Trip should return 60mph", () => {
    const line = "Trip Dan 01:00 02:00 60";
    const newTrip = createObjectFromCommandLine(line);
    const mph = getMPH(newTrip);
    expect(mph).toBe(60);
  });
});

describe("App should add trips to array of trips", () => {
  it("Should have at least 3 Drivers in array of Drivers", () => {
    expect(drivers.length).toBeGreaterThanOrEqual(3);
  });

  it("Should have at least 3 Trips in array of Trips", () => {
    expect(trips.length).toBeGreaterThanOrEqual(3);
  });
});

describe("Trips under 5mph and over 100mph should not be added", () => {
  const driver2 = createObjectFromCommandLine(line2);

  it("Trip under 5mph should not be added, Lauren's miles should be 0", () => {
    const line = "Trip Lauren 01:00 02:00 3";
    const newTrip = createObjectFromCommandLine(line);
    sortObject(newTrip);
    addTripInfoToDrivers();

    expect(driver2.miles).toBe(0);
  });

  it("Trip over 100mph should not be added, Lauren's miles should be 0", () => {
    const line = "Trip Lauren 01:00 02:00 105";
    const newTrip = createObjectFromCommandLine(line);
    sortObject(newTrip);
    addTripInfoToDrivers();

    expect(driver2.miles).toBe(0);
  });
});
