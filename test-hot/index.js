import component from "./module1";

let element = component(); // 存储 element，以在 print.js 修改时重新渲染
document.body.appendChild(element);