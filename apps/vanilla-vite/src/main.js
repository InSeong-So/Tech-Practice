import '../assets/index.css';
import { $, classToggle, debounce } from '@practice/utils';
import { addBookmark, getBookmarkList } from './api';

// (() => {
//   const isLogin = localStorage.getItem('user_token');
//   if (isLogin !== null) return;

//   location.replace('./login.html');
// })();

let globalIndex = 0;

const createPin = () => {
  classToggle('.loading', 'hidden');
  const pin = document.createElement('div');
  const buttonWrapper = document.createElement('div');
  const image = document.createElement('img');
  const random = Math.floor(Math.random() * 123) + 1;
  image.src = `https://randomfox.ca/images/${random}.jpg`;
  buttonWrapper.setAttribute('class', 'button-wrapper');
  buttonWrapper.innerHTML = `
  <div class="anim-icon anim-icon-md heart">
    <input type="checkbox" id="heart${globalIndex}" />
    <label for="heart${globalIndex}" key=${random}></label>
  </div>
  `;
  pin.classList.add('pin');
  pin.appendChild(buttonWrapper);
  pin.appendChild(image);
  classToggle('.loading', 'hidden');
  return pin;
};

const loadMore = debounce(500, () => {
  const container = $('.container');
  const pinList = [];
  for (let i = 10; i > 0; i -= 1) {
    globalIndex += 1;
    pinList.push(createPin(globalIndex));
  }
  container.append(...pinList);
});

loadMore();

window.addEventListener('scroll', () => {
  const loader = $('.loader');
  if (loader === null) return;
  if (loader.getBoundingClientRect().top > window.innerHeight) return;
  loadMore();
});

$('nav').addEventListener('click', async event => {
  event.stopPropagation();
  if (!event.target.matches('input')) return;

  const $main = $('main');
  $main.innerHTML = '';

  if (event.target.matches('#explore')) {
    $main.classList.remove('saved');
    $main.innerHTML = `
      <div class="container"></div>
      <div class="loader"></div>
    `;

    globalIndex = 0;
    loadMore();
  }

  if (event.target.matches('#saved')) {
    $main.classList.add('saved');
    const id = localStorage.getItem('user_token');
    const result = await getBookmarkList('http://localhost:3000/api/user/bookmark', { _id: id });
    const $content = `
    <div class="container">
    ${result
      .map(
        ({ _id, url }, index) => `
      <div class="pin">
        <div class="button-wrapper">
          <div class="anim-icon anim-icon-md heart">
            <input type="checkbox" id="heart${index}" checked>
            <label for="heart${index}" key=${_id}></label>
          </div>
        </div><img src="https://randomfox.ca/images/${url}.jpg">
      </div>`,
      )
      .join('')}
    </div>
    `;

    $main.innerHTML = $content;
  }
});

$('main').addEventListener('click', async event => {
  if (!event.target.matches('label[for^="heart"]')) return;
  const id = localStorage.getItem('user_token');
  await addBookmark(`http://localhost:3000/api/user/bookmark/${event.target.getAttribute('key')}`, { _id: id });
  console.log('???????????? ?????????????????????.');
});
