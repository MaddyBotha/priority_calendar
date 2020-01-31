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

// Now let's get the elementsById of calendar, priority, randomize and clear
const calendar = document.getElementById("calendar");

// Now lets querySelect elements
const randomize = document.querySelector("#randomize");
const clear = document.querySelector("#clear");

// now that that's out of the way, let's create a forEach loop with a event listener. the loop will itterate over the click event on the calendar.
// - inside the forEach loop we'll create a if statement to check if the classList contains 'selected', if it does then it should be removed and activate the default color or else, 'selected' should be removed and the prop value of the color

const newPriority = document.querySelectorAll(".priority");

newPriority.forEach(priorityClicker => {
  priorityClicker.addEventListener("click", () => {
    // if it is already selected, deselect it
    if (priorityClicker.classList.contains("selected")) {
      priorityClicker.classList.remove("selected");
      activeColor = defaultColor;
    } else {
      newPriority.forEach(priorityClicker => {
        priorityClicker.classList.remove("selected");
      });
      priorityClicker.classList.add("selected");
      activeColor = getComputedStyle(priorityClicker).getPropertyValue("color");
    }
  });
});
// console.log(newPriority);

// add days to Javascript date function
function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// now we can get all the days in a year and create variables that to loop over with a while loop

const getAllDays = year => {
  // First day of the year - 1st January
  const firstDay = new Date(`January 1 ${year}`);
  // Last day of the year - 31th December - used to stop adding days to the array
  const lastDay = new Date(`December 31 ${year}`);

  // Add first day
  const days = [firstDay];

  // Used to keep track of the day
  let lastDayInArray = firstDay;

  // Loop while there are new days to be added in the current year
  while (lastDayInArray.getTime() !== lastDay.getTime()) {
    days.push(addDays(lastDayInArray, 1));
    lastDayInArray = days[days.length - 1];
  }

  return days;
};

// now we can allocate dates = to allcurrentDates in the current year
const dates = getAllDays(currentYear);

// let's create a monthsHTML variable and set it equal to an empty string so that we can populate data when we loop over it
let monthsHTML = "";

// loop over the months and create a div for each month
months.forEach((month, idx) => {
  monthsHTML += `<div class="months month_${idx}">
 <h3>${month}</h3>
 <div class="week_days_container">
 ${weekDays.map(day => `<div class="week_days">${day}</div>`).join("")}
 </div>
 <div class="days_container"></div>
 </div>`;
});

calendar.innerHTML = monthsHTML;
