
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
    console.log(currentTime);

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

// checkTime every 2 minutes
setInterval(checkTime(), (1000 * 60) * 2);


// saving tasks persistently and retrieving

const businessHours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",];

const events = JSON.parse(localStorage.getItem(".textarea")) || [];

$("#saveBtn1").click(function(event)  {
    var textValue = $(this).siblings(".textarea").val();
    var time = $(this).parent().attr("id")
    console.log(time);
    
    events.push(event);
    
    localStorage.setItem(time, textValue);
    // console.log(events);
});

