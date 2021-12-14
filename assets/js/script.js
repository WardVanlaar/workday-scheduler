
// to show current day
// adapted from https://medium.com/@aleks.roslyakov/using-css-grid-jquery-making-a-daily-scheduler-pt-ii-7af7d239a55d
let d = new Date();

let year = d.getFullYear();
let month = d.getMonth()+1;
let day = d.getDate();

    //let totalDays = new Date(year, month, 0).getDate();

let output = (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day + '/' + year;

$("#currentDay").text(`${output}`);


// to color-code time of day
// adapted from https://stackoverflow.com/questions/62462599/how-can-i-change-elements-style-based-on-the-time-of-day

var checkTime = function () {

    //Get Current time
    var currentTime = moment().format('H');

    //get all one-hour time blocks with class "textarea"
    var timeBlockElements = $(".textarea");

    //loop through time block classes
    for (var i = 0 ; i < timeBlockElements.length ; i++) {

        //Get element i's ID as a string
        var elementID = timeBlockElements[i].id;

        //get element by ID
        var manipID = document.getElementById(timeBlockElements[i].id)

        //remove any old classes from element
        $(timeBlockElements[i].id).removeClass(".present .past .future");

        // apply new class if task is present/past/future
        if (elementID < currentTime) {
            $(manipID).addClass("past");
        } else if (elementID > currentTime) {
            $(manipID).addClass("future");
        } else {
            $(manipID).addClass("present");
        }
    }
}

// checkTime every 5 minutes
setInterval(checkTime(), (1000 * 60) * 5);


// save tasks

var loadTasks = function() {
  tasks = JSON.parse(localStorage.getItem("tasks"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!tasks) {
    tasks = {
      toDo: [],
      inProgress: [],
      inReview: [],
      done: []
    };
  }

  // loop over object properties
  $.each(tasks, function(list, arr) {
    // then loop over sub-array
    arr.forEach(function(task) {
      createTask(task.text, task.date, list);
    });
  });
};

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};