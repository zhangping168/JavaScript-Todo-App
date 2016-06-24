//Problems: user interaction doesn't provide desired results
//Solution: add interactivity so the user can manage daily tasks

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//create a newtask list item
var newTaskListItem = function(string){
	
	/*
	Create a new list item from #new-task input text
		  - input:checkbox
		  - label
		  - input:text
		  - button edit
		  - button delete
		  - each elements need modified and appended
	*/
	
	var listItem = document.createElement("li");
	
	var checkbox = document.createElement("input"); //checkbox
	checkbox.type="checkbox";
	
	var label = document.createElement("label"); //label
	label.innerText = string;
	
	var editInput = document.createElement("input"); //text
	editInput.type="text";
	
	var editButton = document.createElement("button"); //Edit button
	editButton.innerText = "Edit";
	editButton.className = "edit";
	
	var deleteButton = document.createElement("button"); //Delete button
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";
	
	listItem.appendChild(checkbox);	
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	
	
	return listItem;
}
//Add a new task
var addTask = function(){
	/*
		1.When Button pressed
		2.Create a new list item from #new-task input text
		  - input:checkbox
		  - label
		  - input:text
		  - button edit
		  - button delete
		  - each elements need modifing
		  - each elements need appended
		
	*/
	var listItem = newTaskListItem(taskInput.value);
	
	//Append the element
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem,incompleteTasks);
	console.log("Adding task");
}

//Edit an existing task

var editTask = function(){
	console.log("Editing task");
	
	var listItem = this.parentNode;
	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");
	
	var editMode = listItem.classList.contains("editMode");
	
	if(editMode){//li has editmode class
		//switch from editmode
		label.innerText = editInput.value;	
	}else{
		//switch to editmode
		editInput.value = label.innerText;
	}
	
	listItem.classList.toggle("editMode");
}

//Delete an existing task

var deleteTask = function(){
	console.log("Deleting task");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	ul.removeChild(listItem);
}

//Mark an existing task as complete

var completedTasks = function(){
	console.log("Completed tasks");
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem,incompleteTasks);
}

//Mark an existing task as incomplete

var incompleteTasks = function(){
	console.log("Incompleted tasks");
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem,completedTasks);
}

//Events

addButton.onclick = addTask;

var bindTaskEvents = function(taskListItem, checkboxEventHandler){
			//select its children
			//bind edit task to editButton
			//bind delete task to delete button
			//bind checkboxEventHandler(taskcompleted/taskIncompleted) to the checkbox
			
			console.log("Bind task events");
			
			var checkbox = taskListItem.querySelector("input[type=checkbox]");
			var editButton = taskListItem.querySelector("button.edit");
			var deleteButton = taskListItem.querySelector("button.delete");
			
			editButton.onclick = editTask;
			deleteButton.onclick = deleteTask;
			
			checkbox.onchange = checkboxEventHandler;
}
//cycle over incompleteTasksHolder ul list items
//for each list item
//bind events to list item's children (taskcompleted)

if(incompleteTasksHolder.children.length) //incompleteTasksHolder element has children (more than one at least)
{
	for(var i=0;i<incompleteTasksHolder.children.length;i++){
		bindTaskEvents(incompleteTasksHolder.children[i],completedTasks);
	}
}	
//cycle over ompleteTasksHolder ul list items
//for each list item
//bind events to list item's children (taskIncompleted)

if(completedTasksHolder.children.length) //completedTasksHolder element has children (more than one at least)
{
	for(var i=0;i<completedTasksHolder.children.length;i++){
		bindTaskEvents(completedTasksHolder.children[i],incompleteTasks);
	}
}	
