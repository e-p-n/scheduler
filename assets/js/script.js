// loads local storage of schedule into array or makes an empty array if there is nothing in local storage
var scheduleItems = JSON.parse(localStorage.getItem("schedule"));
if (!scheduleItems) {
    scheduleItems = [];
}

// get and set today's date using moment.js. Display on screen
var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);

function saveText(schedId) {
    // Get the value of the of the textarea next to teh button pressed
    let scheduleItemText = $("#"+schedId).val();
    let scheduleItem = [schedId, scheduleItemText];
    // check if item for the same time already exists in the scheduleItems array and remove it if it does
    for (var i = 0; i < scheduleItems.length; i++) {
        if (scheduleItems[i][0] === scheduleItem[0]) {
            scheduleItems.splice(i, 1);
        }
    }
    // add the scheduleItem to scheduleItems
    scheduleItems.push(scheduleItem);
    // save scheduleItems array in local stotage
    localStorage.setItem("schedule", JSON.stringify(scheduleItems))
}

function buildSchedule() {
    // save today's date in local storage
    localStorage.setItem("date", today);

    // set the current hour using moment.js
    let currentHour = moment().format("H");
    let meridiem = "AM";
    let textAreaClass = "";
    let textAreaContents;

    // run through for loop and add schedule line for every hour between 9am and 5 pm
    for (var i=9; i <=17; i++) {
        let calTime = i;
        textAreaContents = "";
        // set the class for the textarea depending on time of day
        if (calTime < currentHour) {
            textAreaClass = "past";
        } else if (calTime == currentHour) {
            textAreaClass = "present";
        } else {
            textAreaClass = "future";
        }
        // format time to fit 12 hour clock
        if (calTime < 12) {
            meridiem = "AM";
        } else {
            meridiem = "PM";
            if (calTime > 12){
                calTime -= 12;
            }
        }
        // create form element and display it on screen. Add an event listener for each button
        let textId = "ta-" + calTime;
        let formEl = $("<form/>",
                     {"class": "timeblock row"},
                     {"id": i});
        let timeBlockEl = $("<div />",
                          {"class": "hour col-1"});
        timeBlockEl.append(calTime+meridiem);
        let textAreaEl = $("<textarea />",
                         {"class": textAreaClass + " col-10", "id": textId});

        // loop through scheduleItems array and if it's id matches textId load it's contents into the textarea
        for (var j = 0; j < scheduleItems.length; j++) {
            if (scheduleItems[j][0] === textId) {
                textAreaContents = scheduleItems[j][1];
            }
        }
        textAreaEl.text(textAreaContents);
        let submitBtn = $("<div />",
                        {"class": "saveBtn col-1"})
        submitBtn.html('<submit><i id="sb-' + calTime + '" class="fas fa-save"></i></submit>');
        formEl.append(timeBlockEl);
        formEl.append(textAreaEl);
        formEl.append(submitBtn);
        $(".container").append(formEl);

        // add an event listener for eaxh submit button
        $("#sb-"+calTime).click(function(event) {
            event.preventDefault();
            saveText(textId);
        });

    }
}
// compare the date saved in local storage with today's date. If they don't match, reset the scheduleItems array to empty.
function dateCheck() {
    let savedDate = localStorage.getItem("date");
    if (savedDate != today) {
        scheduleItems = [];
    }
    buildSchedule();
}


dateCheck();