'use strict';

var todoApp = angular.module('todoApp',['ui.bootstrap']);

todoApp.controller('TodoController', function TodoController($scope){
	
	var TASK_ID = 'todo_tasks';
	var todos = $scope.todos = JSON.parse(localStorage.getItem(TASK_ID) || '[]');
	
	//Watch for a change in the value of 'todos'. Put changes to localStorage
	$scope.$watch('todos', function(){
		localStorage.setItem(TASK_ID, JSON.stringify(todos));
	}, true);
	
	//Mark a task as done and reverse
	$scope.markDone = function(item){
		var now = new Date();
		var index = $scope.todos.indexOf(item);
		var indexItem = $scope.todos[index];
		
		if(indexItem.timedone){
			indexItem.timedone = '';
		}
		else{
			indexItem.timedone = now;
		}
	};

	//Add a task
	$scope.addTodo = function(){
		var now = new Date();
		$scope.todos.push({text: $scope.todoText, priority: $scope.todoPriority, timestamp: now, done: false, archived: false});
		$scope.todoText = '';
		$scope.todoPriority = '';
	};

	//Count how many tasks remain incomplete
	$scope.remaining = function(){
		var count = 0;
		angular.forEach($scope.todos, function(todo){
			count += todo.done ? 0 : 1;
		});
		return count;
	};

	//Count all non-archived tasks
	$scope.countTodos = function(){
		var count = 0;
		angular.forEach($scope.todos, function(todo){
			if(!todo.archived){
				count += 1;
			}
		});
		return count;
	}

	$scope.deleteTodo = function(item){
		var index = $scope.todos.indexOf(item);
		$scope.todos.splice(index, 1);
	};

	$scope.archiveTodo = function(){
		angular.forEach($scope.todos, function(todo){
			if(todo.done){
				//Change to archived
				todo.archived = true;
			}	
		});
	};
});