## TDD / Testing
This app uses Jasmine for JS TDD Testing. Please view the `SpecRunner.html` file to view the test results or `test.js` to view the written tests / specs.

All tests are written to fail first, then they are corrected to pass.

## Importing a .txt file
This project uses a simple XML HTTP request to pull text from the `input.txt` file. By default, the app reads the file called `input.txt`. You can either replace `input.txt` with a new `input.txt` file or update `Line 8` in `app.js` to the name of your file.

The file to be read needs to be added to the directory. I chose this method to create an easy to process version of this app as opposed to relying on `node.js` and using the file reader. I wanted the app to be clean and vanilla and friendly for both the user and the reviewer.

## Running the App
After setting up the .txt file, open the `index.html` file in the live server and the report is rendered. Since this is not an HTML/CSS project, no styling was implemented. The JS processes the `input.txt` and calculates the report and creates an `<h2>` tag for each `Driver` that is appended to the HTML body.


## Thought Process of Building This Kata:

1. I first build out a XML HTTP request to get the data from the file. I put this into a separate class called `FileHelper.js` in my `/js/components` folder. I built tests around this to ensure I was getting the expected results. I also split the results by each new line into an array of command lines. Mac and Windows reads a new line differently, Mac reads it as `\n` and Windows reads it as `\r\n`. I included a function to detect the OS, so the input gets parsed correctly for both systems.

2. Once I have an array of command lines, I build out 2 classes to match the 2 possible commands, `Driver` and `Trip` respectively. I give the `Driver` a name field and I give the `Trip` a driver, a start time, an end time, and mileage. I test to ensure a newly instantiated `Driver` has the appropriate name and the `Trip` fields are correct as well.

3. Next, I write a function that will interpret the command lines and use each command line to instantiate a new `Driver` or a new `Trip`. I test to ensure that the commands are instantiating instances of the correct class and uses the data to correctly populate the fields.

4. Then I create a `forEach` loop to run through each line in my array of command lines and create the appropriate instances for each. For each instance, `Driver` or `Trip`, it is added to an array of `drivers` or `trips` respectively. I test each item in `drivers` and `trips` to ensure they were created and added.

5. I then create a function to interpret the time and convert it into a single unit of measure, minutes. Once the test is passing, I use the miles and minutes gathered to calculate the MPH.

6. I use my MPH calculator to screen each `Trip` to make sure it is between 5 and 100mph. Any `Trip` outside of that range does not get added to the `trips` array. I test to ensure the `Trips` are not added.

7. Once each `Trip` has been screened and placed into the `trips` array, I then loop through the array and add each `Trip` to the corresponding `Driver`. I created a function in the `Driver` class that will allow a `Trip` to be passed as a parameter and then broken down into usable data to calculate minutes and mileage. Minutes and miles are parsed into decimal numbers (`floats`). I test to ensure a `Trip` adds successfully to the `Driver` and the fields are updated accordingly.

8. Finally, I create a function that sorts the `Drivers` based on their miles driven and I loop through each `Driver` and create an `<h2>` tag to display the information for each `Driver` which is sequentially added to the document. I also added a small feature to not display MPH if the `Driver's` mileage is 0. This is how it appears in the prompt.

9. To preserve accuracy of data, I opted to only round the final output when being displayed; numbers are not rounded during calculations.