const newTodos = document.querySelector('.todos_form');
const btnSubmit = document.querySelector('.btn-submit');
let todosList = document.querySelector('#todos_box');
let titleValue = document.querySelector('#create_todos');
let url = 'https://jsonplaceholder.typicode.com/todos';
let output = '';

const renderTodos = (todos) => {
	todos.slice(0, 20).forEach((todos) => {
		output += `
    <div class="item">
      <input type="checkbox" id="${todos.id}">
      <label for="${todos.id}" class="todosTitle">${todos.title}</label>
      <a href="#" id="delete_todos">Delete</a>
      <a href="#" id="edit_todos">Edit</a> 
    </div>
    `;
	});

	document.querySelector('.todos-box').innerHTML = output;
};

// FETCH TODOS
fetch(url)
	.then((res) => res.json())
	.then((data) => renderTodos(data));

todosList.addEventListener('click', (e) => {
	e.preventDefault();

	// console.log(e.target.id);

	let deleteBtn = e.target.id == 'delete-todos';
	let editBtn = e.target.id == 'edit-todos';

	// console.log(e.target.parentElement.dataset.id);
	let id = e.target.parentElement.dataset.id;

	// Method: DELETE - remove todos
	if (deleteBtn) {
		fetch(`${url}/${id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then(() => location.reload());
	}

	if (editBtn) {
		const parent = e.target.parentElement;
		let titleContent = parent.querySelector('.todosTitle').textContent;

		titleValue.value = titleContent;
	}

	// Method: PATCH - update todos
	btnSubmit.addEventListener('click', () => {
    e.preventDefault();
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ title: title }),
		})
			.then((res) => res.json())
			.then(() => location.reload());
	});
});

// Method: POST - add new todos
newTodos.addEventListener('submit', (e) => {
	e.preventDefault();

	let title = document.querySelector('#create_todos').value;

	fetch(`${url}/${id}`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({ title: title }),
	})
		.then((res) => res.json())
		.then((data) => {
			const dataArr = [];
			dataArr.push(data);
			renderTodos(dataArr);
		});

	// reset input field
	title.value = '';
});
