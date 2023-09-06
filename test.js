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
	input.value = ''; // 기존 입력했던 값 비우기

	// 기존 배열에 할일 객체목록 추가
	// tasks.push(newTask);
	tasks = [newTask, ...tasks];

	// console.log(tasks);
	list.innerHTML = '';
	tasks.map((task) => addListItem(task));
});

// 객체를 파라미터로 받아서 li 목록을 동적으로 생성해주는 함수
function addListItem(task) {
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';

	// 동적으로 생성되는 체크박스 요소에 아예 이벤트 핸들러까지 연결해서 생성
	// 이벤트위임을 하지 않아도 동적인 요소에 이벤트 연결하는 방법
	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked;
		item.style.textDecoration = task.complete ? 'line-through' : 'none';
		console.log(tasks);
	});

	item.append(checkbox, task.title);
	list.append(item);
}
