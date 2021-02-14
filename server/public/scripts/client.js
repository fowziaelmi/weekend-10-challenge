$(document).ready(function () {
  console.log('in js');
  getTask();
  $('#viewTasks').on('click', '#delete', onDelete);
  $('#viewTasks').on('change', 'input[name=checkbox]', checkBox);
  $('#createButton').on('click', function () {
    console.log('task button has been clicked');
    let newTask = {
      task: $('#taskIn').val(),
    };
    console.log('the task input is :', newTask);
    addTask(newTask);
  });

  function getTask() {
    console.log('in get task');
    $('#viewTasks').empty();
    $.ajax({
      url: '/tasks',
      method: 'GET',
    })
      .then(function (response) {
        console.log('response', response);
        drawTaskTable(response);
        for (let i = 0; i < response.length; i++) {
          $('#viewTasks').append(`
        <div 
          <input type="checkbox" name="checkbox" id="${
            response[i].id
          }"data-id="${response[i].id}" 
          ${response[i].complete ? 'checked' : ''}>
          <label class="taskss" for=${response[i].id}>
          ${response[i].task_to_complete}</label>
          <button class="${
            response[i].complete ? '' : 'hidden'
          }" id="delete" type="button" data-id="${
            response[i].id
          }">Delete</button>
        </div>
      `);
        }
      })
      .catch(function (error) {
        console.log('GET error', error);
      });
  }
  // POST
  function addTask(taskToDatabase) {
    console.log('in addTask', taskToDatabase);
    $.ajax({
      url: '/tasks',
      method: 'POST',
      data: {
        task_to_complete: $('#taskIn').val(),
      },
      // data = {task: 'taskinput'}
    })
      .then(function (response) {
        $('#taskIn').val('');

        getTask();
      })
      .catch(function (error) {
        console.log('error on POST', error);
      }); /*
    $('#viewTasks').on('click', '.deleteButton', function () {
      console.log('delete button was clicked');
      let deleteId = $(this).parent().parent().data('id');
      console.log(deleteId);
      $.ajax({
        method: 'DELETE',
        url: '/tasks/' + deleteId,
        success: function (response) {
          getTask();
        },
      }); // end of ajax put delete request
    }); // delete button listener
  } */ //Delete
  } //// function drawTaskTable( /// task ///) { // }, // end success // }); //end ajax //} // end of add task function // PUT

  /*function appendTasks(task) {
    for (let i = 0; i < task.length; i++) {
      let taskToDisplay = task[i];
      let taskRowToDisplay = $('<tr class = "taskRow"></tr>');
      if (taskToDisplay.complete === false) {
        $('#viewTasks').append(
          '<td> <button class= "completeButton">Complete</button></td>'
        );
      } else {
        taskRowToDisplay.addClass('completedRow');
        taskRowToDisplay.append(``);
      }
      $('#viewTasks').append(taskRowToDisplay);
    } // end of for loop
  }
}
*/ /*$('#viewTasks').on('click', '#completeButton', function () {
      console.log('complete button was clicked');
      let completeId = $(this).parent().parent().data('id');
      console.log(completeId);
      $.ajax({
        method: 'PUT',
        url: '/tasks/complete'
        success: function (response) {
          getTask();
        },
      }); // end of ajax put complete request
    }); // complete button listener
/*
    } */ function checkBox() {
    let taskId = $(this).data('id');
    console.log('checked id', taskId);

    if ($(this).is(':checked')) {
      completeTodo(taskId);
    } else {
      console.log('not checked');
    }
    getTask();
  }

  function completeTodo(taskId) {
    console.log('in complete task', taskId);

    $.ajax({
      method: 'PUT',
      url: `/tasks/complete/${taskId}`,

      data: {
        taskId,
      },
    })

      .then(function (response) {
        console.log('completed');
        getTask();
      })

      .catch(function (error) {
        console.log('PUT error', error);
      });
  }

  function onDelete() {
    console.log('delete button was clicked');
    let deleteId = $(this).data('id');
    console.log(deleteId);
    $.ajax({
      method: 'DELETE',
      url: `/tasks/${deleteId}`,
    })
      .then(function (response) {
        console.log('delete complete');
        // Call getTodoList to update the DOM
        getTask();
      })
      // Handle error
      .catch(function (error) {
        console.log('delete error', error);
      }); // end of ajax put delete request
  } // delete button listener }
});
/* function unCheck (taskId) {
  console.log('in ', taskId);
  // Set up PUT route
  $.ajax({
    method: 'PUT',
    url: `/tasks/uncheck/${taskId}`,
   
    data: {
      taskId,
    },
  })
    
    .then(function (response) {
      console.log( 'success');
    })
    
    .catch((error) => {
      console.log('UNDO error', error);
    });
}
*/
/* function appendTasks(task) {
  for (let i = 0; i < task.length; i++) {
    let taskToDisplay = task[i];
    //taskToDisplay.id, taskToDisplay.tasks_to_add, taskToDisplay.complete
    let $taskRowToDisplay = $('<tr class = "taskRow"></tr>');
    $taskRowToDisplay.data('id', taskToDisplay.id);
    $taskRowToDisplay.append(
      '<td class = "task">' + taskToDisplay.task_to_complete + '</td>'
    );

    if (taskToDisplay.complete === true) {
      $taskRowToDisplay.append(
        '<td><button class= "completeButton">Complete</button></td>'
      );
    } else {
      $taskRowToDisplay.addClass('completedRow');
      $taskRowToDisplay.append(
        '<td><button class = "deleteButton">Delete</button></td>'
      );
    }
    $('#viewTasks').append($taskRowToDisplay);
  } 

} 
*/
