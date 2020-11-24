# Vue Task Manager
![altcenter](https://www.mustafacagri.com/wp-content/uploads/2020/11/vue-task-manager-create-task.gif "Vue Task Manager - Create a Task")

![altcenter](https://www.mustafacagri.com/wp-content/uploads/2020/11/vue-task-manager-create-subtask.gif "Vue Task Manager - Create a Subtask")

![altcenter](https://www.mustafacagri.com/wp-content/uploads/2020/11/vue-task-manager-pagination-delete.gif "Vue Task Manager - Pagination and Delete Task")

## Demo
https://vue-js-task-manager.web.app/

## Used
Vuex with modules, Localstorage (It is ready to use Firebase database), Mixins, Lodash, Test (Jest)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

# Challenge

The coding challenge is to create a single-page app using Vue.js and Vuex. You are free to use vue-cli while creating application. 

In this assignment, we would like you to create a simple task manager web application.
You will perform some operations on tasks and subtasks. You can find the details on below.
We expect a cross-browser compatible and responsive web application that matching the requirements below.

We will appreciate that if you add unit-tests and comments for your project (if applicable).
We expect you to write a README.md document.

# Challenge Scenario - Task Board  

With this assignment, we want to create a board for our tasks. Tasks have name, state and levels properties that could be managed by users. Tasks could have below
levels with the given priority order. 
- Blocker  
- Critical 
- High
- Low

Tasks could have subtasks. Subtask have same properties of tasks and also parent task. 
We have two states for tasks that are "Open" and "Closed".


## Rules
 You could choose intuitive way for not described points specifically.
### Creation Rules
- Task could be created with required fields name and level. 
- Task name need to be unique and max 25 character.
- Default state is open.
- Level should be selected, no default value.
- Subtask creation enabled if user select/focus on a task.
- Task could have 4 sub-task at most.
- Task could have no subtask.
- The application will not have any backend so for storing tasks and subtasks you should use local storage in case of refreshing application pages in the browser. 

### List Rules
- There are two lists that open and closed tasks with priority order.
- Tasks need to be sorted high to low priority.
- If two tasks have same priority, first created one has high priority.  
- Subtasks need to be sorted high to low priority under task.
- Lists need to be automatically updated if any task or subtask property is changed.
- Task and subtask cards have color depending on their priority. 
- List cards layout need to be responsive to width of page. For example, If page could show 3 cards in a row, page need to show 2 open card column and 1 closed  
task columns. Open task list has higher priority to column enlarge.
- User could paginate lists. 

## Update Rules
 - Properties modal open with a task or subtask for updating.
 - Task name and parent tasks are showed as read-only not updatable.
 - Levels and state are updatable.
 - Tasks could not be closed if any subtask is still open.
 - If any subtask of task set open, task is set as open too.
 - If any task is deleted, all subtasks are also deleted.
  



# Technology Stack
- VueJs version2
- Vuex
- CSS3/SASS
- ES6+
- Mixins (If applicable)
- Use the related technologies for build configuration to create production ready bundle.
