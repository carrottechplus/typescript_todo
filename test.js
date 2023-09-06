const form = document.querySelector('#form');
const input = document.querySelector('#title');
const list = document.querySelector('#list');
// 처음 페이지 로딩시 로컬저장소에서 TASKS에 대한 데이터 호출
// let data = localStorage.getItem('TASKS');
// 해당 데이터가 있으면 parsing해서 tasks배열에 저장, 없으면 빈배열
// let tasks = data ? JSON.parse(data) : [];

let tasks = JSON.parse(localStorage.getItem('TASKS')) || [];

//tasks에 배열값을 반복출력 (만약 저장소에 값이 없으면 출력안됨)
tasks.map((task) => addListItem(task));

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
	list.innerHTML = '';

	// 기존 배열에 할일 객체목록 추가
	// tasks.push(newTask);
	tasks = [newTask, ...tasks];

	// 새로운 객체가 만들어지면 저장소에 데이터를 집어넣고
	localStorage.setItem('TASKS', JSON.stringify(tasks));
	// tasks에 있는 배열값을 반복돌면서 목록 생성
	tasks.map((task) => addListItem(task));
});

// 객체를 파라미터로 받아서 li 목록을 동적으로 생성해주는 함수
function addListItem(task) {
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';

	// 동적으로 추가된 상태에서 새로고침해도 취소선과 체크상태를 유지
	checkbox.checked = task.complete ? true : false;
	item.style.textDecoration = task.complete ? 'line-through' : 'none';

	// 동적으로 생성되는 체크박스 요소에 아예 이벤트 핸들러까지 연결해서 생성
	// 이벤트위임을 하지 않아도 동적인 요소에 이벤트 연결하는 방법
	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked;
		item.style.textDecoration = task.complete ? 'line-through' : 'none';

		// 동적으로 생긴 체크박스 요소에 change이벤트가 발생할 때 마다 다시 변경점을 로컬저장소에 저장
		localStorage.setItem('TASKS', JSON.stringify(tasks));
	});

	item.append(checkbox, task.title);
	list.append(item);
}
