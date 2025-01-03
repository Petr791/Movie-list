//let elems = document.querySelectorAll('.custom-checkbox');



const inputNode = document.querySelector('.js-movie__input');
const addButtonNode = document.querySelector('.js-movie__btn');
const movieListNode = document.querySelector('.movie-list');
//console.log(movieListNode);

let movieArray = [];
const posts = [];

function getMovieFromUser() {
	// тут проверки
	//console.log(inputNode.value);
	return inputNode.value;
}

function getMovieFromUser2() {
	// тут проверки
	//console.log(inputNode.value);
	return inputNode.value;
}


/**/
function createExpense() {
	const title = getExpanseFromUser();
	if (!title) {
		return;
	}
	let idItem;


	const newExpense = {
		currentTitle: title,
		currentId: idItem
	};
	movieArray.push(newExpense);
	saveExpensesToStorage();
	render();
	clearInput(inputNode);
	categoryNode.options[0].selected = true;


	//
	const newMovie = currentTitle;
	movieArray.push(newMovie);
	clearInput(inputNode);
	render();
	return;

}




/**/



function clearInput(input) {
	input.value = '';
}

function checkInputField() {

	if (inputNode.value.trim() === '') {
		/* validationMessage.innerText = `Поле заголовка не должно быть пустым!`;
		validationMessage.classList.remove('validation-message--green', 'validation-message--yellow');
		validationMessage.classList.add('validation-message--red');
		validationMessage.classList.remove('validation-message__hidden'); */
		return true;
	}

}

function createItemMovie() {


	if (checkInputField()) {
		return;
	} else {

		const currentTitle = getMovieFromUser();


		const newMovie = currentTitle;
		movieArray.push(newMovie);


		//renderPosts();

		render();
		//console.log(movieArray);


		const postFromUser = getPostFromUser222();
		addPost(postFromUser);
		console.log(posts);


		clearInput(inputNode);
		return;
	}


	/* const currentTitle = getMovieFromUser();
	if (!currentTitle) {
		return;
	} */


}

/***/

function getPostFromUser222() {
	let title = inputNode.value;
	console.log(title);
	//title = 'ggg';
	let maxId = 0;
	let id = 0;

	posts.forEach((article) => {
		maxId = article.id > maxId ? article.id : maxId;
		id = ++maxId;
	});
	return {
		title: title,
		id: id
	};
}



/* let maxId = 0;
movieArray.forEach((article) =>{

maxId = article.id > maxId ? article.id : maxId;

}); */



function addPost({
	title,
	id
}) {
	posts.push({

		title: title,
		id: id
	});
}





/***/

function render() {

	movieListNode.innerHTML = '';
	movieArray.forEach((item, index) => {

		const liNode = document.createElement('li');
		const span1check = document.createElement('span');
		const input = document.createElement('input');
		const label = document.createElement('label');
		const span2 = document.createElement('span');
		const span3Btn = document.createElement('span');
		const btn = document.createElement('button');



		liNode.className = 'movie-item eee';
		liNode.setAttribute('data-id', index);

		span1check.className = 'movie-item__radio';

		liNode.append(span1check);
		input.className = 'custom-checkbox';
		input.setAttribute('type', 'checkbox');
		input.setAttribute('id', index);
		span1check.append(input);

		label.setAttribute('for', index);
		span1check.append(label);

		span2.className = 'movie-item__title';
		span2.innerHTML = item;
		liNode.append(span2);

		span3Btn.className = 'movie-item__btn-wrapper';
		liNode.append(span3Btn);
		btn.className = 'movie-item__btn';
		span3Btn.append(btn);


		console.log(liNode);
		movieListNode.prepend(liNode); //

	});
	console.log('после рендера массив:', movieArray);
}

/* Метод Element.append() позволяет вставлять строки с текстом, в то время как Node.appendChild() работает только с узлами. */


addButtonNode.addEventListener('click', createItemMovie);








movieListNode.addEventListener('click', function (e) {

	// function
	if (e.target.classList.contains('custom-checkbox')) {

		const parentNode = e.target.closest('.movie-item');
		//const titleChildNode = parentNode.querySelector('.movie-item__title');

		if (e.target.checked) {
			/* titleChildNode.classList.add('hr'); */
			parentNode.classList.add('viewed');
		} else {
			parentNode.classList.remove('viewed');
		}

	}



	// function
	if (e.target.classList.contains('movie-item__btn')) {

		const parentNode = e.target.closest('.movie-item');
		const input = parentNode.querySelector('.custom-checkbox');
		const inputId = input.id;


		const parentNodeId = parentNode.dataset.id;
		console.log(parentNodeId);

		// console.log('btn1!');
		// console.log(this);
		//parentNode.remove();//
		//toggle_favourite(this);



		console.log('Изначальный массив:', movieArray);
		// Удаляем элемент из массива
		//movieArray.splice(inputId, 1);
		//вар 2
		movieArray.splice(parentNodeId, 1);
		// Удаляем элемент из DOM
		parentNode.remove();
		render();

		console.log('Обновленный массив:', movieArray);
	}


});



/* function plusGoods() {
	// добавляет товар в корзине
	let id000 = $(this).attr('data-id');
	const elemId = elem.id;
	cart[id]++;
	saveCart(); // пересохраняю в localStorage
	showCart(); // перерисовать корзину
}
 */

//*************
/* listItems.forEach((item, index) => {
	item.addEventListener('click', () => {
		// Удаляем элемент из массива
		itemsArray.splice(index, 1);
		// Удаляем элемент из DOM
		item.remove();

		console.log('Обновленный массив:', itemsArray);
	});
}); */

/**/ ///////////////////////////////////////////////////////////// */

/* function clickRadio2() {
	for (var i = 0; i < elems.length; i++) {
		//if (elems[i].checked) radios[i].checked = false;
		if (elems[i].checked) {
			document.querySelector('.t1').classList.add('hr');
		} else {
		}
	}
} */

/* elems.forEach((item) => {

	item.addEventListener('click', function (e) {

		const parentNode = e.target.closest('.movie-item');
		const titleChildNode = parentNode.querySelector('.movie-item__title');

		if (item.checked) {
			titleChildNode.classList.add('hr');
		} else {
			titleChildNode.classList.remove('hr');
		}
	});

}); */