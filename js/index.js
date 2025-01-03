const STORAGE_LABEL_MOVIES = 'movies';
const CHECKBOX_UNSELECTED = false;
const CHECKBOX_SELECTED = true;
const inputNode = document.querySelector('.js-movie__input');
const addButtonNode = document.querySelector('.js-movie__btn');
const movieListNode = document.querySelector('.js-movie-list');
const validationMessageNode = document.querySelector('.js-validation-message');

const moviesFromStorageString = localStorage.getItem(STORAGE_LABEL_MOVIES);
const moviesFromStorage = JSON.parse(moviesFromStorageString);
validationMessageNode.innerText = `Введите название фильма!`;

let moviesArray = [];


init();

// инициализация
function init() {
	if (Array.isArray(moviesFromStorage)) {
		moviesArray = moviesFromStorage;
	}
	render();
}

// проверка поля ввода
function checkInputField() {
	if (inputNode.value.trim() === '') {
		showValidationMessage();
		return true;
	}
}

// очистка поля ввода
function clearInput(input) {
	input.value = '';
}

// функция скрытия сообщение валидации
function hideValidationMessage() {
	validationMessageNode.classList.add('validation-message__hidden');
}
// функция показа сообщение валидации
function showValidationMessage() {
	validationMessageNode.classList.remove('validation-message__hidden');
}

// 1) получение заголовка фильма и свойства checked
function getMovieFromUser() {
	let title = inputNode.value;
	let checkboxValue = CHECKBOX_UNSELECTED;
	return {
		title: title,
		checked: checkboxValue
	};
}

// 2) запись в объекта в массив
function addMovie({
	title,
	checked
}) {
	moviesArray.push({
		title: title,
		id: '',
		checked: checked
	});
}

// функция создания элементов и их атрибутов
function createCustomElement(tag, attributes) {
	const element = document.createElement(tag);
	for (let key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
	return element;
}

// 3) функция вывода списка фильмов на страницу
function render() {

	movieListNode.innerHTML = '';
	moviesArray.forEach((item, index) => {

		// вариант 1(только числа): при рендере установка индекса элемента в свойство id
		item.id = index;
		// вариант 2(числа и строки): при рендере установка индекса элемента в свойство id. Удаление вариантом 2 функции removeItemFromList(e)
		//item.id = 'ceck-' + index;
		const itemId = item.id;

		//создание элементов и их атрибутов
		const itemNode = createCustomElement('li', {
			'data-id': itemId,
			class: 'movie-item'
		});
		const checkboxSpan = createCustomElement('span', {
			class: 'movie-item__checkbox'
		});
		const input = createCustomElement('input', {
			id: 'checkbox-' + itemId,
			type: 'checkbox',
			class: 'custom-checkbox'
		});
		const label = createCustomElement('label', {
			for: 'checkbox-' + itemId
		});
		const movieTitle = createCustomElement('span', {
			class: 'movie-item__title'
		});
		const btn = createCustomElement('button', {
			class: 'movie-item__btn'
		});

		// название фильма
		movieTitle.innerHTML = item.title;

		// действия при состоянии чекбокса
		if (item.checked == CHECKBOX_SELECTED) {
			input.checked = true;
			itemNode.classList.add('viewed');
		} else {
			input.checked = false;
			itemNode.classList.remove('viewed');
		}

		itemNode.append(checkboxSpan);
		checkboxSpan.append(input);
		checkboxSpan.append(label);
		itemNode.append(movieTitle);
		itemNode.append(btn);

		movieListNode.prepend(itemNode);
	});
}


// хендлер кнопки "Добавить"(создание элемента списка)
function createItemMovie() {
	// проверка
	if (checkInputField()) {
		return;
	} else {
		hideValidationMessage();
		const movieFromUser = getMovieFromUser();
		addMovie(movieFromUser);
		saveMoviesToStorage();
		render();
		clearInput(inputNode);
		return;
	}
}

// функция записи массива в local storage
function saveMoviesToStorage() {
	const moviesString = JSON.stringify(moviesArray);
	localStorage.setItem(STORAGE_LABEL_MOVIES, moviesString);
}

// функция установки состояния чекбокса
function setCheckboxState(e) {
	// если нажатый элемент является чекбоксом
	if (e.target.classList.contains('custom-checkbox')) {
		const parentNode = e.target.closest('.movie-item');
		const checkboxNode = parentNode.querySelector('.custom-checkbox');
		const parentNodeId = parentNode.getAttribute('data-id');

		// запись состояния чекбокса в элемент массива
		moviesArray.forEach((item, index) => {
			let itemId = item.id;
			if (parentNodeId == itemId) {
				if (checkboxNode.checked) {
					item.checked = CHECKBOX_SELECTED;
				} else {
					item.checked = CHECKBOX_UNSELECTED;
				}
			}
			saveMoviesToStorage();
			render();
		});
	}
}

// функция удаления элемента из списка
function removeItemFromList(e) {

	// если нажатый элемент является кнопкой закрыть
	if (e.target.classList.contains('movie-item__btn')) {
		// родительский элемент li
		const parentNode = e.target.closest('.movie-item');
		// получаем у элемента li значение data-атрибута
		const parentNodeId = parentNode.dataset.id;


		// вариант 1: метод splice (только числа)
		// Находим элемент массива с индексом равным дата-атрибуту li
		// и удаляем его из массива
		/* moviesArray.splice(parentNodeId, 1); */


		// вариант 2: метод splice (числа и строки)
		// При совпадении дата-атрибута li и значения свойства элемента массива,
		//находим индекс этого элемента и удаляем его из массива
		moviesArray.forEach((item, index) => {
			let currentItemIndex = null;
			if (item.id == parentNodeId) {
				currentItemIndex = index;
				moviesArray.splice(currentItemIndex, 1);
			}
		});


		// вариант 3: метод filter 
		// перезапись массива без элемента в котором была нажата кнопка "удалить"
		//moviesArray = moviesArray.filter(item => item.id !== Number(parentNodeId));

		saveMoviesToStorage();
		render();
	}
}

// при нажатии на кнопку добавить
addButtonNode.addEventListener('click', createItemMovie);

// событие клик на блоке со списком фильмов
movieListNode.addEventListener('click', function (e) {
	setCheckboxState(e);
	removeItemFromList(e);
});

// событие клик на body
// скрытие сообщения валидации
document.body.addEventListener('click', function (e) {
	if (e.target != addButtonNode) {
		hideValidationMessage();
	}
});



//для упрощения эта функция не используется
// функция получения значения id из индексов массива для последующей установки в свойство id, следующего создаваемого объекта массива
// id начинается с единицы, а не с нуля.
function getMaxId() {
	let maxId = 0;
	let id = 0;
	moviesArray.forEach((movie) => {
		if (movie.id > maxId) {
			maxId = movie.id;
		} else {
			maxId = maxId;
		}
		id = ++maxId;
		//или так строкой
		//id ='myId-'+ ++maxId;
	});
	return id;
}