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
  // console.log(result);
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
 <h3 class="bigger">${month}</h3>
 <div class="week_days_container">
 ${weekDays.map(day => `<div class="week_days">${day}</div>`).join("")}
 </div>
 <div class="days_container"></div>
 </div>`;
});

// now that that's out of the way, let's create a calendar for the innerHTML and set it to equal monthsHTML

// from here we will loop over each day and create extra day so that there are open slots available before we get to day 1 - 1st Jan

calendar.innerHTML = monthsHTML;

// before we loop over the emptySlot, let's create a function for it first
function createEmptySlot() {
  const emptyElement = document.createElement("div");
  emptyElement.classList.add("days");

  return emptyElement;
}

// let's also create the createDateElement function to avoid any errors

function createDateElement(date) {
  const day = date.getDate();
  const dateElement = document.createElement("div");
  dateElement.classList.add("days");
  dateElement.innerHTML = `<span class="circle">${day}</span>`;

  return dateElement;
}

// loop over each day
dates.forEach(date => {
  const month = date.getMonth();
  const monthElement = document.querySelector(
    `.month_${month} .days_container`
  );

  // let's create an extra day slot should we need it before day 1 starts
  if (date.getDate() === 1 && date.getDate() !== 0) {
    for (let i = 0; i < date.getDate(); i++) {
      const emptySlot = createEmptySlot();

      monthElement.appendChild(emptySlot);
    }
  }
  const dateElement = createDateElement(date);

  monthElement.appendChild(dateElement);
});

// let's add some click events for the .circle, .randomize as well as a clearing function that will clear the screen

// add a click event listener to all .circle classes
const circles = document.querySelectorAll(".circle");
circles.forEach(circle => {
  circle.addEventListener("click", () => {
    circle.style.backgroundColor = activeColor;
  });
});

// let's give some functionality to the randomize button which will randomly select color & days to fill with random priorities

function getRandomColor() {
  return colors[Math.floor(Math.random() * 5)];
}

randomize.addEventListener("click", () => {
  circles.forEach(circle => {
    circle.style.backgroundColor = getRandomColor();
  });
});

// now we'll create the clear functionality so that we can clear the screen when we want to select different dates
clear.addEventListener("click", () => {
  circles.forEach(circle => {
    circle.style.backgroundColor = defaultColor;
  });
});
