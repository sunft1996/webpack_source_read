import './index.css'
const root = document.createElement('div')
const body = document.getElementsByTagName('body')[0]
const img = require('../test-vue/me.jpeg')

console.log(img);

root.setAttribute('id', 'root')
body.append(root)