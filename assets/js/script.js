var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);

function buildCalendar() {
    let currentHour = moment().subtract(6, 'hours').format("H");
    
    let meridiem = "AM";
    let textAreaClass = "";

    
    for (var i=9; i <=17; i++) {
        let calTime = i;
        if (calTime < currentHour) {
            textAreaClass = "past";
        } else if (calTime == currentHour) {
            textAreaClass = "present";
        } else if (calTime > currentHour) {
            textAreaClass = "future";
        }
        if (calTime < 12) {
            meridiem = "AM";
        } else {
            meridiem = "PM";
            if (calTime > 12){
                calTime -= 12;
            }
        }
        let formEl = $("<form/>",
                     {"class": "timeblock row"},
                     {"id": i});
        let timeBlockEl = $("<div />",
                          {"class": "hour col-1"});
        timeBlockEl.append(calTime+meridiem);
        let textAreaEl = $("<textarea />",
                         {"class": textAreaClass + " col-10"},
                         {"id": "ta-"+i});
        textAreaEl.text("Text goes here" + i);
        let submitBtn = $("<div />",
                        {"class": "saveBtn col-1"})
        submitBtn.html('<submit><i id="sb-' + i + '" class="fas fa-save"></i></submit>');
        formEl.append(timeBlockEl);
        formEl.append(textAreaEl);
        formEl.append(submitBtn);
        $(".container").append(formEl);
    }
}

buildCalendar();
$("submit").click(function() {
    console.log("Clicked:" + $(this).id);
})