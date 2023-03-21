// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Set the beginning hour to be 8AM
let hourStart = dayjs().startOf('day').add(8,'h');
// totalHours = 8AM to 6PM = 11 hours
let totalHours = 11;
// Get current hour
let currentHour = dayjs().format('H');
// initializes timeTableElement and currentState of present, future, and past;
let timeTableElement;
let currentState;


//Display and update current date function

  function updateTime() {
    let time = dayjs().format('dddd, MMMM Do, HH:mma')
    $('#currentDay').text(time);
}
setInterval(updateTime, 30000);



function fillTimeTable() {
  for (let hour = 0; hour < totalHours; hour++) { 
    let realHour = hour + 8;

    for (let timeTableElement = hourStart; timeTableElement < totalHours; timeTableElement++) {

    }


      timeTableElement = hourStart.format('h:mma');

      
      // determine the currentState based on the conditions
      if (currentHour == realHour) {
          currentState = 'present';
      } else if (currentHour > realHour) {
          currentState = 'past';
      } else {
          currentState = 'future';
      }

      let appendPreset = 
          `<div id="hour-${realHour}" class="row time-block ${currentState}">
              <div class="col-md-1 hour">${timeTableElement}</div>
              <textarea class="col-md-10 description ${realHour}"></textarea>
              <button class="btn saveBtn col-md-1">
                  <i class="fas fa-save"></i>
              </button>
          </div>`;

      $(".preset").append(appendPreset);
  }
  loadSchedule();
}

// function for save schedule in the local storage
function saveSchedule() {

    let keyName = $(this).parent().attr('id');
    let keyValue = $(this).parent().children().eq(1).val();

    localStorage.setItem(keyName, keyValue);
}

// function to get back the data from the local storage and print it out in to the textarea attribute
function loadSchedule() {

    for (let hour = 0; hour < totalHours; hour++) {
        let realHour = hour + 8;
        let loadedSchedule = localStorage.getItem(`hour-${realHour}`);

        $(`.${realHour}`).val(loadedSchedule);
    }

}

// Function calls
updateTime();
fillTimeTable();
$(document).on('click', '.saveBtn', saveSchedule);
//$('.saveBtn').on('click', saveSchedule);

// updating date and time every 30 seconds

/*

setInterval(function() {
    updateTime();
}, 30000);

// updating entire time table every 10 minutes


setInterval(function() {
    fillTimeTable();
}, 600000);
*/



  
console.log(hourStart)


// TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

