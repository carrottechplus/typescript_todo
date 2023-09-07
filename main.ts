interface Task {
	id: number;
	title: string;
	createAt: Date;
	complete?: boolean;
}

const form = document.querySelector<HTMLFormElement>('#form');
const input = document.querySelector<HTMLInputElement>('#title');
const list = document.querySelector<HTMLUListElement>('#list');

let tasks: Task[] = JSON.parse(localStorage.getItem('TASKS') || '[]');
// 로컬스토리지 비어있을때 null인뎅 문자만 들어갈 수 있다고 함
// JSON.parse 메서드는 무조건 파라미터값으로 문작랎만 들어올 수 있도록 강제되어 있음.
// generic으로 타입을 지정할 수 없기 때문에 무조건 문자를 넣어야하는데, 처음에 로컬저장소가 비어있기 떄문에 undefined나 null이 들어가게됨,
// 로컬저장소에 null 값이 반환되는 순간 무조건 배열을 문자화해서 대신 들어가도록 하면 오류 피할 수 있음.

// map으로 반복도는 배열자체에 Task타입으로 배열로 지정해놨기 때문에 굳이 map 파라미터에 타입 지정 불필요
tasks.map((task) => addListItem(task));

//'form' is possibly 'null'.
// 해당 변수는 처음 스크립트가 로드될 때 아직 돔이 담기지 않았기 때문에 초기에 undefined가 들어감
// form 타입을 HTML노드 형태로 지정했기 때문에 해당 값이 없을때에는 무시하고 넘어가도록 optional chaining처리
form?.addEventListener('submit', (e) => {
	e.preventDefault();

	if (input?.value.trim() === '') {
		return alert('할일을 입력하세요');
	}

	const newTask: Task = {
		id: performance.now(),
		title: input?.value || '',
		createAt: new Date(),
	};

	//input?.value = ''; 으로 불가능 한 이유 : 옵셔널체이닝과 대입연산자를 하나의 표현식으로 처리 불가능함.
	input && (input.value = '');
	list && (list.innerHTML = '');

	tasks = [newTask, ...tasks];
	localStorage.setItem('TASKS', JSON.stringify(tasks));
	tasks.map((task) => addListItem(task));
});

function addListItem(task: Task) {
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';

	checkbox.checked = task.complete ? true : false;
	item.style.textDecoration = task.complete ? 'line-through' : 'none';

	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked;
		item.style.textDecoration = task.complete ? 'line-through' : 'none';

		localStorage.setItem('TASKS', JSON.stringify(tasks));
	});

	item.append(checkbox, task.title);
	list?.append(item);
}
