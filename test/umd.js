(function (root, factory) {  
    if (typeof define === 'function' && define.amd) {  
        // AMD。Register as an anonymous module.  
        define([], factory);  
    } else if (typeof exports === 'object') {  
        // Node.js 或 CommonJS  
        module.exports = factory();  
    } else {  
        // 浏览器全局变量  
        root.myModule = factory();  
    }  
}(this, function () {  
    // 模块代码  
    var myModule = {};  
  
    myModule.sayHello = function () {  
        console.log('Hello from UMD module!');  
    };  
  
    return myModule;  
}));