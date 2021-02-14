$(document).ready(function () {
  console.log('in js');
  getTask();
});
function getTask() {
  console.log('in get task');
  $('#viewTasks').empty();
  $.ajax({
    url: '/tasks',
    type: 'GET',
  }).then(function (response) {
    console.log('response', response); // end of ajax
  });
}
