// import logo from './logo.svg';
// import './App.css';

// document.body.addEventListener("pointermove", (e)=>{
//   const { currentTarget: el, clientX: x, clientY: y } = e;
//   const { top: t, left: l, width: w, height: h } = el.getBoundingclientRect();
//   el.style.setProperty("--posX", x-l-w/2);
//   el.style.setProperty("--posy", y-l-h/2);
// })

// const elts = {
//     text1: document.getElementById("text1"),
//     text2: document.getElementById("text2")
// };

// const texts = [
//   "olá",
//   "seja",
//   "bem",
//   "vindo",
//   "me chamo",
//   "matheus",
//   "salabert"
// ];

// const morphTime = 1; 
// const cooldownTime = 0.25;

// let textIndex = texts.length -1;
// let time = new Date();
// let morph = 0;
// let cooldown = cooldownTime;

// elts.text1.textContent = texts[textIndex % texts.length];
// elts.text1.textContent = texts [(textIndex + 1) % texts.length];

// function doMorph (){
//   morph -= cooldown;
//   cooldown = 0;

//   let fraction = morph / morphTime;

//   if (fraction > 1 ) {
//       cooldown = cooldownTime;
//       fraction = 1;
//   }

//   setMorph(fraction);
// }

// function setMorph(fraction) {
//   elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100 )}px)`
//   elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`; 

//   fraction = 1 - fraction;
// elts.text1.textContent = texts[textIndex % texts.length];
// elts.text2.textContent = texts[(textIndex + 1) % texts.length];

// }

// function doCooldown () {
//   morph = 0;

//   elts.text2.style.filter = "";
//   elts.text2.style.opacity = "100%";

//   elts.text1.style.filter = "";
//   elts.text1.style.opacity = "0%";
// }

// function animate (){
//   requestAnimationFrame(animate);

//   let newTime = new Date();
//   let shouldIncrementIndex = cooldown > 0;
//   let dt = (newTime - time) / 1000;
//   time - newTime;

//   cooldown -= dt;

//   if (cooldown <= 0){
//      if(shouldIncrementIndex){
//       textIndex++;
//      }
//      doMorph()
//   }
// }

// function App() {
//   return (
//     <body>
//       <nav>
//         <div class="nav_menu">
//           <ul class="nav_list">
//             <li>
//               <a href="#" class="nav_link">Home</a>
//             </li>
//             <li>
//               <a href="#" class="nav_link">Projects</a>
//             </li>
//             <li>
//               <a href="#" class="nav_link">Gallery</a>
//             </li>
//             <li>
//               <a href="#" class="nav_link">About</a>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       <div id="container">
//         <span id="text1"></span>
//         <span id="text2"></span>
//       </div>
//     </body>
//   );
// }

// export default App;

import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';

function App() {
  const [texts, setTexts] = useState([
    "olá",
    "seja",
    "bem",
    "vindo",
    "me chamo",
    "matheus",
    "salabert"
  ]);
  const [textIndex, setTextIndex] = useState(texts.length - 1);
  const [morph, setMorph] = useState(0);
  const [cooldown, setCooldown] = useState(0.25);
  const elts = {
    text1: useRef(null),
    text2: useRef(null)
  };

  function handlePointerMove(e) {
    const { currentTarget: el, clientX: x, clientY: y } = e;
    const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
    el.style.setProperty("--posX", x - l - w / 2);
    el.style.setProperty("--posY", y - t - h / 2);
  }

  function doMorph() {
    setMorph((morph) => {
      let newMorph = morph - cooldown;
      setCooldown(0);

      let fraction = newMorph / 1;

      if (fraction > 1) {
        setCooldown(0.25);
        fraction = 1;
      }

      setMorph(fraction);
      return newMorph;
    });
  }

  function setMorphStyle(fraction) {
    elts.text2.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.current.textContent = texts[textIndex % texts.length];
    elts.text2.current.textContent = texts[(textIndex + 1) % texts.length];
  }

  function doCooldown() {
    setMorph(0);
    setMorphStyle(0);

    elts.text1.current.style.filter = "";
    elts.text1.current.style.opacity = "0%";
  }

  function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time - newTime;

    setCooldown((cooldown) => cooldown - dt);

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        setTextIndex((textIndex) => textIndex + 1);
      }
      doMorph();
    }
  }

  let time = new Date();
  animate();

  return (
    <body onPointerMove={handlePointerMove}>
      <nav>
        <div className="nav_menu">
          <ul className="nav_list">
            <li>
            </li>
          </ul>
        </div>
      </nav>
      <main>
        <h1 className="title">
          <span className="text" ref={elts.text1}></span>
          <span className="text" ref={elts.text2}></span>
        </h1>
      </main>
    </body>
  );
}
export default App;
