// Filters tasks by removing objects where the last_completed_date plus the cadence_in_days is
// in the future.  After filtering, the tasks are rendered in a simple HTML format applied to the
// DOM.
function filterByDateThenRender(tasks) {
  const today = new Date();
  let completedDate, nextDateToComplete;
  let filteredTasks = tasks.reduce((tasksToDo, currentTask) => {
    completedDate = new Date(currentTask.last_completed_date);
    nextDateToComplete = new Date(
      completedDate.getTime() + daysToMilliseconds(parseInt(currentTask.cadence_in_days, 10))
    );

    if(today > nextDateToComplete) tasksToDo.push(currentTask);

    return tasksToDo;
  }, []);

  renderToHtml(filteredTasks);
}

function renderToHtml(filteredTasks) {
  let parentNode = document.getElementById("task-renderer");

  let taskNode, taskName, taskLastCompleted, taskDescription, taskNameAndCompleted;
  filteredTasks.forEach((task) => {
    taskNode = document.createElement("div");
    taskNode.className = "task";

    taskName = document.createElement("p");
    taskName.className = "task-name";
    taskName.appendChild(document.createTextNode(task.task_name));

    taskLastCompleted = document.createElement("p") ;
    taskLastCompleted.className = "task-last-completed";
    taskLastCompleted.appendChild(document.createTextNode(task.last_completed_date));

    taskNameAndCompleted = document.createElement("div");
    taskNameAndCompleted.className = "task-name-and-last-completed-container"
    taskNameAndCompleted.appendChild(taskName);
    taskNameAndCompleted.appendChild(taskLastCompleted);

    taskDescription = document.createElement("p") ;
    taskDescription.className = "task-description";
    taskDescription.appendChild(document.createTextNode(task.description));

    taskDescriptionContainer = document.createElement("div");
    taskDescriptionContainer.className = "task-description-container"
    taskDescriptionContainer.appendChild(taskDescription);

    taskNode.appendChild(taskNameAndCompleted);
    taskNode.appendChild(taskDescriptionContainer);

    parentNode.appendChild(taskNode);
  });
}

function daysToMilliseconds(days) {
  return days * 1000 * 60 * 60 * 24;
}