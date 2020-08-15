This app uses Jasmine for JS TDD Testing. Please view the SpecRunner.html file to view the TDD or the index.html console log for the actual app.


Thought Process of Building This Kata:

I first decide to create 2 classes, a Driver with a field "name" and a Trip with the fields "driver", "startTime", "endTime", "milesDriven". I need multiple instances of each, so a class seemed to be the right approach.

In efforts to maintain clean code, I create separate files for each class, Driver and Trip respectfully. I link these using a module and I import and export functions, classes, and variables as needed.

I begin my testing by making sure I can instantiate an instance of a class with the appropriate fields. Then I create a testing function to interpret the command lines which will break down the different commands and use them to create new instances of each class respectively.

Then I create functions and tests to ensure that I can add a trip to a specific driver. I create a forEach loop to add each trip to the appropriate driver.

Then I create a function and test to interpret the time and convert it into minutes. Once successful, I use the miles and minutes gathered from previous functions to calculate the MPH.

If any trip has an average MPH of less than 5 or greater than 100, then it is discarded (not added to the Driver's record). This of course is included in the tests.

I opted to put all instances of a Driver into an array and all instances of a Trip into a separate array. I use arrays for easy looping. I create a function that sorts each new instance (either a Driver or a Trip) and adds it to the appropriate list. Then I check to see if the instances are added to the array.

Once the arrays are populated with the data, I create a function to produce the report in the form of console logs. I loop through the drivers and display the required information for each driver.

To preserve accuracy of data, I only round the final output when being displayed through the console log. Numbers are not rounded during calculations.