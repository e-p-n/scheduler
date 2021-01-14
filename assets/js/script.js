var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);

function buildCalendar() {
    let currentHour = moment().format("H");
    console.log(currentHour);
    
    for (var i=9; i <=17; i++) {
        if (i < currentHour) {
            console.log("past");
        } else if (i === currentHour) {
            console.log("present");
        } else if (i > currentHour) {
            console.log("future");
        }
    }

}

buildCalendar();