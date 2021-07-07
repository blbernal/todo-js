
import './styles.css'; 
// import { saludar } from './js/componentes'; 
// import { Todo } from './classes/todo.class'; 
// import { TodoList } from './classes/todo-list.class'; 
import { Todo, TodoList } from './classes'; 
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList(); 

todoList.todos.forEach( todo => crearTodoHtml(todo)); 


// todoList.todos[0].imprimirClase(); 

// console.log(typeof todoList.todos[1] );

// const tarea = new Todo ('Aprender Javascript !!'); 

//  tarea.completado = true; 

// todoList.nuevoTodo(tarea); 


// console.log( todoList );

// crearTodoHtml( tarea ); 



