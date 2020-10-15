// import file
import imgCute from '@assets/cute.jpg';

// import scss
import './styles/index.scss';

// dynamic import wasm module
import('../pkg/index')
  .then(wasm => {
    console.log('wasm loaded...', wasm);
    console.log('call compute', wasm.compute());
  })
  .catch(console.error);

// your code.
const appDOM = document.querySelector('#app');
const imgDOM = new Image();
imgDOM.src = imgCute;
appDOM.append(imgDOM);

const helloDOM = document.createElement('h1');
helloDOM.innerText = 'Rust with webpack';
appDOM.append(helloDOM);

// es6 parser
async function foo({ bar }) {
  await bar();
}

console.log('App running');
