//create, read, delete
const formulario = document.getElementById('form');

//pega o valor do que foi add a lista, a partir do click no btn
formulario.addEventListener('submit', function(event){
    event.preventDefault();
    const {target} = event;

    const idInput = target.getElementsByTagName('input').item.value('id');

    const todoInput = target.getElementsByTagName('input').item.value('todo');
    if(todoInput){
        const todos = save(todoInput.value);
        render(todos.id, todos.text, todos.state);
    }
    target.reset();
});
function getAllTodos(){
    let todos = []
    const todosST = localStorage.getItem('todo-list');
    if(todosST){
        return JSON.parse(todosST);
    }else{
        return todos;
    }
}

//localStorage
function save(text, state = false){
    const todos = {
        id: 1,
        text, state
    }
    const list = getAllTodos();

    let id = 1;
    if(list.length){
        todos.id = list(list.length - 1).id + 1;
    }

    list.push(todos);
    localStorage.setItem('todo-list' . JSON.stringify(list));
    return todos;
}

//deletando
function deleteItem(id){
    let list = getAllTodos();
    list.filter(todos => todo.id != id);

    localStorage.setItem('todo-list' . JSON.stringify(list));
}

//adicionando os produtos na lista
//se não retornar nada, considera como falso
function render(text, state = false){
    const list = document.getElementsByClassName('listGroup');

    if(list){
        const lista = document.createElement('li');
        lista.dataset.id = id;

        const inpt = document.createElement('input');
        input.classList.add('form-control');
        input.value = state;

        const btnDelete = document.createElement('button');
        btnDelete.name = "idDelete";
        btnDelete.innerText = "⛔"; 
        btnDelete.classList.add('btn btn-danger');
        btnDelete.value = id;
        btnDelete.addEventListener('click', function(target){
            deleteItem(target.value), loadItens();
        });

        lista.appendChild(inpt);
        lista.append(text);
        lista.appendChild(btnDelete);
        list.appendChild(lista);
    }
}
function loadItens(){
    const list = document.getElementsByClassName('listGroup');
    list.innerHTML = "";
    getAllTodos().forEach(todos => {
        render(todos.id, todos.text, todos.state);
    });
}

//incremento de quantidade
const button = document.querySelectorAll('#btnQuant');
//percorre a lista
for (i = 0; i < button.length; i++){
    button[i].addEventListener('click', () => {
        saveQuantidade();
    })
}
function loadSaveButton(){
    let quantProdutos = localStorage.getItem('saveQuantidade');
    //add ao HTML
    if(saveQuantidade){
        document.querySelector('#btnQuant').textContent = quantProdutos;
    }
}
//add localstorage
function saveQuantidade(){
    let quantProdutos = localStorage.getItem('saveQuantidade');
    quantProdutos = parseInt(quantProdutos);
    //verifica se tá funcionando
    if(quantProdutos){
        localStorage.setItem('saveQuantidade', quantProdutos + 1);
        document.querySelector('#btnQuant').textContent = quantProdutos + 1;
        //faz a soma e retorna ao loadSaveButton
    }else{
        localStorage.setItem('saveQuantidade', 1);
        document.querySelector('#btnQuant').textContent = 1;
    } 
} //carrega a soma + adição ao HTML
loadSaveButton();

window.onload = loadItens();