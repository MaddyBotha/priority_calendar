// let's create a few variables to start so that we can incorporate it later into our functions as we code along

// we'll create the variables for the currentYear, weekDays, months, colors and a toggle switch so that we can use it in our functions

// create a variable for the current year
const currentYear = 2020;

// create a variable for the weekdays that are in a week
const weekDays = [
  // Let's use an array for this
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

// create a variable called months that will get the months in a year
const months = [
  // Let's create another array
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// create some colors that we are going to use
const colors = [
  // Let's create another array
  "#F25CA2",
  "#0433BF",
  "#032CA6",
  "#021859",
  "#0B9ED9"
];

// create a variable to set the defaultColor of the calendar icons
const defaultColor = "#888";
let activeColor = "";

// Now let's get the elementsById of calendar, moods, randomize and clear
const calendar = document.getElementById("calendar");

// Now lets querySelect elements
const moods = document.querySelector(".mood");
const randomize = document.querySelector("#randomize");
const clear = document.querySelector("#clear");

// now that that's out of the way, let's create a forEach loop with a event listener. the loop will itterate over the click event on the calendar.
// - inside the forEach loop we'll create a if statement to check if the classList contains 'selected', if it does then it should be removed and activate the default color or else, 'selected' should be removed and the prop value of the color
