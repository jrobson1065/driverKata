import {
  createInstanceFromCommandLine,
  sortInstance,
  drivers,
  trips,
  getMPH,
  convertMinutes,
  addTripInfoToDrivers,
  fileHelper,
  convertTextFileToCommandLines,
  isMac,
} from "../app.js";

const line1 = "Driver Dan";
const line2 = "Driver Lauren";
const line4 = "Trip Dan 07:15 07:45 17.3";

const driver = createInstanceFromCommandLine(line1);
const trip = createInstanceFromCommandLine(line4);

describe("FileHelper should pull the text from the text file", () => {
  const result = fileHelper.readStringFromFileAtPath("test-input.txt");
  const array = convertTextFileToCommandLines("test-input.txt");

  it("Result should read test then test2 on a new line", () => {
    if (isMac) {
      expect(result).toBe("test1\ntest2");
    } else {
      expect(result).toBe("test1\r\ntest2");
    }
  });

  it("Result should separate each new line into array, line 1 (array index 0) should be test", () => {
    expect(array[0]).toBe("test1");
  });

  it("Result should separate each new line into array, line 2 (array index 1) should be test2", () => {
    expect(array[1]).toBe("test2");
  });
});

describe("Driver should have name", () => {
  it("Driver1 name should be Dan", () => {
    expect(driver.name).toBe("Dan");
  });
});

describe("Trip should have all fields", () => {
  it("Trip driver should be Dan", () => {
    expect(trip.driver).toBe("Dan");
  });
  it("Trip start time should be 07:15", () => {
    expect(trip.startTime).toBe("07:15");
  });
  it("Trip end time should be 07:45", () => {
    expect(trip.endTime).toBe("07:45");
  });
  it("Trip miles driven should be 17.3", () => {
    expect(trip.milesDriven).toBe("17.3");
  });
});

describe("Create instances from command lines", () => {
  it("Command should return a Driver instance with field name Dan", () => {
    expect(driver.name).toBe("Dan");
  });

  it("Command should return a Trip instance with field driver Dan", () => {
    expect(trip.driver).toBe("Dan");
  });

  it("Command should return a Trip instance with field start time 07:15", () => {
    expect(trip.startTime).toBe("07:15");
  });

  it("Command should return a Trip instance with field end time 07:45", () => {
    expect(trip.endTime).toBe("07:45");
  });

  it("Command should return a Trip instance with field miles driven 17.3", () => {
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

describe("App should add trips to array of trips", () => {
  it("Should have 3 Drivers in array of Drivers, no extra Drivers should exist beyond the 3 we checked above", () => {
    expect(drivers.length).toBe(3);
  });

  it("Should have 3 Trips in array of Trips, no extra Trips should exist beyond the 3 we checked above", () => {
    expect(trips.length).toBe(3);
  });
});

describe("Should convert time and return MPH", () => {
  it("01:30 should return 90 minutes", () => {
    const mins = convertMinutes("01:30");
    expect(mins).toBe(90);
  });

  it("Trip should return 60mph", () => {
    const line = "Trip Dan 01:00 02:00 60";
    const newTrip = createInstanceFromCommandLine(line);
    const mph = getMPH(newTrip);
    expect(mph).toBe(60);
  });
});

describe("Trip instances should add data to Driver instance", () => {
  driver.addTrip(trip);
  it("Driver miles should be updated with trip info", () => {
    const miles = driver.miles;
    expect(miles).toBe(17.3);
  });

  it("driver mph should be updated with trip info", () => {
    const mph = Math.round(driver.mph);
    expect(mph).toBe(35);
  });
});

describe("Trips under 5mph and over 100mph should not be added", () => {
  const driver2 = createInstanceFromCommandLine(line2);

  it("Trip under 5mph should not be added, Lauren's miles should be 0", () => {
    const line = "Trip Lauren 01:00 02:00 3.0";
    const newTrip = createInstanceFromCommandLine(line);
    sortInstance(newTrip);
    addTripInfoToDrivers();

    expect(driver2.miles).toBe(0);
  });

  it("Trip over 100mph should not be added, Lauren's miles should be 0", () => {
    const line = "Trip Lauren 01:00 02:00 105.0";
    const newTrip = createInstanceFromCommandLine(line);
    sortInstance(newTrip);
    addTripInfoToDrivers();

    expect(driver2.miles).toBe(0);
  });
});
