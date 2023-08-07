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
createCountUpButton(box, { max: 8 });
createCountUpButton(box, { count: 2 });
createCountUpButton(box, { count: 3, step: 2 });

// --------------------------------------------------------------------------
// JavaScript 프로그래밍 패러다임
// → 클래스(class)를 사용해 구현합니다. (참고: https://mzl.la/3QrTKlF)

class CountUpButton {
  #config;

  constructor(userOptions) {
    this.#config = { ...CountUpButton.defaultProps, ...userOptions };
    this.init();
  }

  init() {
    console.log(this.#config);
  }

  static defaultProps = {
    count: 0,
    step: 1,
  };
}

globalThis.CountUpButton = CountUpButton;

const firstCountUp = new CountUpButton({
  count: 2,
  step: 7,
});

const demoContainer = document.getElementById('demo');

// demoContainer.append(firstCountUp.render())

// --------------------------------------------------------------------------
// 웹 컴포넌트(Web Components) API
// → 웹 컴포넌트를 사용해 구현합니다. (참고: https://mzl.la/3YjFdu9)
