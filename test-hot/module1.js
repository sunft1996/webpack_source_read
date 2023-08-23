import _ from "lodash";
import printMe from "./print.js";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  element.innerHTML = _.join(["Hello", "webpack"], " ");

  btn.innerHTML = "Click me and check the console1112!";
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}


// 如果当前模块没对接热更新api，那会向上冒泡直到有模块对接了热更新api，如果一直没有模块对接HMR api则刷新应用
if (module.hot) {
  // 接收到热更新变化时触发，会在模块更新前触发
  module.hot.accept("./print.js", function() {
    // 定义行为，如：子模块更新时，父模块如何处理
    console.log("Accepting the updated printMe module!");
    printMe();

    // document.body.removeChild(element);
    // element = component(); // 重新生成dom
    // document.body.appendChild(element);

  });
}

export default component


// 修改print.js时，浏览器打印：

// [WDS] App hot update...
// [HMR] Checking for updates on the server...

    // 执行accept回调
// Accepting the updated printMe module!
// Updating print.js...1112333

    // 更新模块
// [HMR] Updated modules:
// [HMR]  - 670
// [HMR] App is up to date.
