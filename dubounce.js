function onChange(e) {
  console.log(e.target.value);
}
// function debounce(fn, ms) {
//   let timeout;
//   return function () {
//     const fnCall = () => {
//       fn.apply(this, arguments);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(fnCall, ms);
//   };
// }

// function getPost() {
//   console.log('asd');
//   // return fetch(`https://api.github.com/search/repositories?q=${value}`).then(
//   //   (response) => {
//   //     console.log(response);
//   //   }

//   //   // (response) => {
//   //   //   return response.json();
//   //   // }
//   // );
// }

// document
//   .getElementById("search")
//   .addEventListener("keyup", debounce(onChange, 1000));
