import { todoList } from "../index";
import { Todo } from "../classes";

// Referencias en el HTML 
const divTodoList = document.querySelector('.todo-list'); 
const txtInput = document.querySelector('.new-todo'); 
const botonEliminarTodos = document.querySelector('.clear-completed'); 
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro'); 


export const crearTodoHtml = ( todo ) => {


    const htmlTodo = 
    `<li class=" ${ (todo.completado) ? 'completed' : '' } " data-id=" ${todo.id} ">
    <div class="view">
        <input class="toggle" type="checkbox"  ${ (todo.completado) ? 'checked' : '' }  >
        <label>${ todo.tarea }</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li> `

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;


}

// Eventos 

txtInput.addEventListener('keyup', ( event ) => {

    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {

        // console.log(txtInput.value);
        const nuevoTodo = new Todo( txtInput.value ); 
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo ); 
        txtInput.value = ''; 

    }

}); 

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName;  // input, label, button 
    // console.log(nombreElemento);
    const todoElemento = event.target.parentElement.parentElement; 
    // console.log(todoElemento);
    const todoId = todoElemento.getAttribute( 'data-id'); 
    // console.log(todoId);

    if ( nombreElemento.includes('input')) {  // click en el Check 
        todoList.marcarCompletado( todoId ); 
        todoElemento.classList.toggle('completed'); 

    } else if ( nombreElemento.includes('button')) {  // click en eliminar (x) 
        todoList.eliminarTodo(todoId); 
        divTodoList.removeChild( todoElemento ); 
    }
    // console.log(todoList);

});

botonEliminarTodos.addEventListener('click', ( event ) => {

    todoList.borrarCompletados(); 
    // console.log(todoList);

    for ( let i = divTodoList.children.length - 1; i>= 0;  i-- ) {

        const elemento = divTodoList.children[i];
        if ( elemento.className == 'completed' ){
            // console.log(elemento);
            divTodoList.removeChild( elemento ); 
        }
    }
}); 

ulFiltros.addEventListener('click', ( event ) => {
    const filtro = event.target.text; 
    // console.log(filtro);

    if( !filtro) { return; }  

    anchorFiltros.forEach(element => element.classList.remove('selected')); 
    event.target.classList.add('selected')

    for ( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden');


        const completado = elemento.classList.contains('completed'); 

        // console.log(completado);

        switch ( filtro ) { 
            case 'Pendientes': 
                if (completado) { 
                    elemento.classList.add( 'hidden'); 
                } 
                break; 
            case 'Completados':
                if (!completado) { 
                    elemento.classList.add( 'hidden'); 
                }
                break; 

        }

    }

})




