const form = document.querySelector('#form');
const input = document.querySelector('#title');
const list = document.querySelector('#list');
//할일 목록이 저장될 배열 생성
let tasks = [];

//폼요소에 submit이벤트 연결
form.addEventListener('submit', (e) => {
	e.preventDefault();

	if (input.value.trim() === '') {
		return alert('할일을 입력하세요');
	}

	const newTask = {
		id: performance.now(), // 글입력한 순간
		title: input.value,
		createAt: new Date(),
	};
	input.value = '';

	// console.log(newTask);
	tasks.push(newTask);
	console.log(tasks);
	list.innerHTML = '';
	tasks.map((task) => addListItem(task));
});

// 객체를 파라미터로 받아서 li 목록을 동적으로 생성해주는 함수
function addListItem(task) {
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	item.append(checkbox, task.title);
	list.append(item);
}
