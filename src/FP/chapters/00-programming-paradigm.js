// --------------------------------------------------------------------------
// 📌 [프로그래밍 패러다임]
// --------------------------------------------------------------------------
// - 명령형, 선언형 프로그래밍 비교
// - 함수, 객체 지향 프로그래밍 비교
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// 명령형 프로그래밍

const courses = [
  {
    id: 1,
    name: ' imperative programming',
  },
  {
    id: 2,
    name: 'declarative programming ',
  },
];

const updateCourses = [...courses];

// for (let i of updateCourses) {
//   const course = { ...i };
//   console.log(i);
//   course.name = course.name.trim().toUpperCase();

//   i = course;
// }

for (let i = 0; i < updateCourses.length; i++) {
  const course = { ...updateCourses[i] };
  course.name = course.name.trim().toUpperCase();

  updateCourses[i] = course;
}

// console.log('원본 데이터\n', courses);
// console.log('변형 데이터\n', updateCourses);
// console.assert(!Object.is(courses, updateCourses), '두 객체는 동일합니다.');

// 1. 과정 배열을 순환하여 각 과정 이름의 좌우 공백 제거
// 2. 과정 배열을 순환하여 각 과정 이름 대문자화
// 3. 배열 원소의 name 속성의 공백을 밑줄로 변경하는 기능 추가
for (let i = 0; i < updateCourses.length; i++) {
  const course = { ...updateCourses[i] };
  course.name = updateCourses[i].name.replace(/\s+/g, '_');

  updateCourses[i] = course;
}
// console.log(updateCourses);

// --------------------------------------------------------------------------
// 선언형 프로그래밍

const subjects = [
  {
    id: 1,
    name: ' imperative programming',
  },
  {
    id: 2,
    name: 'declarative programming ',
  },
];

// console.log(subjects[0]);
// console.log(subjects[1]);

// 1. 객체 이름(name) 속성 좌우 공백 제거 함수 선언
function toTrim(object) {
  const newObject = { ...object };

  newObject.name = newObject.name.trim();
  return newObject;
}

// console.log(toTrim(subjects[0]));
// console.log(toTrim(subjects[1]));

// 2. 객체 이름(name) 속성 대문자화 함수 선언
function toUpperCase(object) {
  const o = { ...object };
  o.name = o.name.toUpperCase();
  return o;
}

// console.log(toUpperCase(subjects[0]));
// console.log(toUpperCase(subjects[1]));

// 3. 배열 원소의 name 속성의 공백을 밑줄로 변경하는 기능 추가
function convertSpaceToUnderscore(object) {
  const o = { ...object };
  o.name = o.name.replace(/\s+/g, '_');
  return o;
}

// 4. 과목 이름 "좌우 공백 제거" → "대문자화" 후, 새로운 과목 배열 생성
const updateSubjects = subjects
  .map(toTrim)
  .map(toUpperCase)
  .map(convertSpaceToUnderscore);

// const updateSubjects = subjects
//   .map(item => {
//     const copySubject = toTrim(item);
//     return copySubject;
//   })
//   .map(item => {
//     const copySubject = toUpperCase(item);
//     return copySubject;
//   });

// console.log(subjects);
// console.log(updateSubjects);

// --------------------------------------------------------------------------
// JavaScript 프로그래밍 패러다임
// → 함수(function)를 사용해 구현합니다.
const box = document.querySelector('#demo');

function createCountUpButton(
  container,
  { count: initialCount = 0, step = 1, max } = {}
) {
  if (!container || container.nodeType !== document.ELEMENT_NODE) {
    throw new Error('container는 문서의 요소가 아닙니다.');
  }

  const countUpButton = document.createElement('button');
  let count = initialCount;

  const render = newCount => {
    countUpButton.textContent = String(newCount);
  };

  const handleCountUp = () => {
    // count += step;

    count >= max ? (count = count) : (count += step);
    render(count);
  };

  countUpButton.setAttribute('type', 'button');
  countUpButton.classList.add('countUpButton');
  countUpButton.addEventListener('click', handleCountUp);
  render(count);

  container.append(countUpButton);

  // box.insertAdjacentHTML(
  //   'beforeend',
  //   /* html */ `
  // <button type="button" class="countUp"></button>
  // `
  // );
  // const button = box.querySelector('.countUp');

  // const renderCount = (node, count) => {
  //   node.textContent = count;
  // };

  // let count = 0;
  // renderCount(button, count);

  // button.style.width = '140px';
  // button.style.height = '140px';
  // button.style.border = 'solid 2px blue';

  // function handleCountUp() {
  //   count++;

  //   renderCount(button, count);
  // }

  // button.addEventListener('click', handleCountUp);
}

// max에 도달하면 더이상 증가하지 않게 하기
// createCountUpButton(box, { max: 8 });
// createCountUpButton(box, { count: 2 });
// createCountUpButton(box, { count: 3, step: 2 });

// --------------------------------------------------------------------------
// JavaScript 프로그래밍 패러다임
// → 클래스(class)를 사용해 구현합니다. (참고: https://mzl.la/3QrTKlF)

class CountUpButton {
  // static field
  static version = '0.0.1-alpha';

  // 기본 Props
  static defaultProps = {
    count: 0,
    step: 1,
    max: 10,
  };

  // private field
  // must be declared
  #count;
  #props = {};
  #button = null;

  // 라이프 사이클 메서드
  // 생성 시점(constructor)
  constructor(props) {
    console.log('생성 시점');
    this.#count = props.count ?? 0;
    this.#props = { ...CountUpButton.defaultProps, ...props }; // 사용자가 전달한 데이터와 기본 데이터가 병합
  }

  // render
  render() {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.textContent = String(this.#count);
    this.#button = button;

    this.bindEvents();

    return button;
  }

  renderHTML() {
    const template = /* html */ `
    <button>${this.#count}</button>
    `;

    return template;
  }

  bindEvents() {
    this.#button.addEventListener('click', e => {});
  }

  // mount
  mount(container) {
    console.log(this.#props);
    container?.append?.(this.render());
    // container?.insertAdjacentHTML?.('beforeend', this.renderHTML());
  }

  // 성장 시점(update)
  // 소멸 시점(unmount)
  unmount() {
    console.log('소멸 시점');
  }
}

// 새로운 객체 생성
const firstCountUp = new CountUpButton({
  count: 1,
});
const secondCountUp = new CountUpButton({
  count: 2,
  step: 6,
});
const thirdCountUp = new CountUpButton({
  count: 3,
  max: 100,
});

globalThis.firstCountUp = firstCountUp;

console.log(firstCountUp);

const demoContainer = document.getElementById('demo');

// firstCountUp.mount(demoContainer);
// secondCountUp.mount(demoContainer);
// thirdCountUp.mount(demoContainer);

// --------------------------------------------------------------------------
// 웹 컴포넌트(Web Components) API
// → 웹 컴포넌트를 사용해 구현합니다. (참고: https://mzl.la/3YjFdu9)

class TestHeader extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
    <header>이게 되나요</header>
    `;
  }
}

customElements.define('test-header', TestHeader);
