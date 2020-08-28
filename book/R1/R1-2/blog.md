# this、call、apply

## 1. this
除去不常用的 `with`、`eval`，`this` 的指向大致分为以下4种：
- 作为对象的方法使用
- 作为普通函数调用
- 构造器使用
- `Function.prototype.call` 和 `Function.prototype.apply` 调用

### 1.1 作为对象的方法调用
> 当函数作为对象的方法调用时，`this` 指向该对象。如果对象的方法起了别名，`this` 指向全局对象，具体可见如下代码。

```javascript
const person = {
    userName: 'Mango',
    sayName () {
        console.log(this);
        console.log(this.userName);
    }
}
person.sayName();       // Mango
// 起别名
let sayName = person.sayName;    
sayName();              // undefined 此时 this 指向全局对象
```

### 1.2 普通函数调用
普通函数分为：ES5 函数 和 箭头函数（ES6）。
- ES5中的函数，this 总是指向全局对象；
- ES6的箭头函数，this 与定义时的上下文相关

```html
<body>
<div id="myDiv"> 我是一个DIV </div>

<script>
    const divDom = document.querySelector('#myDiv');

    divDom.addEventListener('click', function () {
        // this 指向 divDom
        console.log('匿名函数的 this: ', this);
        let callback = function () {
            // this 指向 window
            console.log('匿名函数中callback this: ', this);
        }
        let callback2 = () => {
            // this 指向 divDom
            console.log('匿名函数中callback(箭头函数) this: ', this);
        }
        callback();
        callback2();
    })
    divDom.addEventListener('click', () => { // 此时上下文在全局环境中
        // this 指向 window
        console.log('箭头函数的 this: ', this);
        let callback = function () {
            // this 指向 window
            console.log('箭头函数中callback this: ', this);
        }
        callback();
    })

    const obj = {
        addEvent () {
            divDom.addEventListener('click', () => { // 此时上下文在 obj 对象环境中
                // this 指向 obj 对象
                console.log('在对象内部箭头函数的 this: ', this);
                let callback = function () {
                    // this 指向 window
                    console.log('对象内部匿名函数中callback this: ', this);
                }
                callback();
            })
        }
    }
    obj.addEvent();
</script>
</body>
```

### 1.3 构造器调用
当用 `new` 运算符调用函数时，该函数总会返回一个对象，通常情况下，构造器中的 `this` 指向返回的这个对象。

```javascript
const Person = function () {
    this.name = 'Mango';
}

const person = new Person();
console.log('person name: ', person.name);
```

### 1.4 `call` 和 `apply`
`Function.prototype.call` 和 `Function.prototype.apply` 可以动态改变 `this` 指向，两者唯一区别是调用方式不同。

```javascript
const obj1 = {
    name: 'Mango',
    getName () {
        return this.name;
    }
}
const obj2 = {
    name: 'Mango2'
}
console.log(obj1.getName());    // Mango
console.log(obj1.getName.call(obj2));       // Mango2
```

### 1.5 消失的 `this`
在 1.1 节中，对象的方法赋值给一个变量时（类似起别名），`this` 不再指向该对象，而是指向全局对象。如下：
```javascript
const person = {
    userName: 'Mango',
    sayName () {
        console.log(this);
        console.log(this.userName);
    }
}
let sayName = person.sayName;    
sayName();  // undefined
```

这种情况可以使用 `apply` 方法改变 `this` 指向，最简单的是直接改变指向，如下：
```javascript
// 接上面案例
sayName.apply(person);  // Mango
```

为了保证 `sayName` 的 `this` 不丢失，可以再创建的时候就通过`apply`指明 `this`,如下：
```javascript
// 使用了闭包
let sayName = (function (func, target) {
                    return function () {
                        return func.apply(target, arguments);
                    } 
                })(person.sayName, person);

// 也有比较简单的方式
let sayName = function () { 
    return person.sayName();
}
```
可以将起别名抽象为一个函数，可以指定 `this` 指向：
```javascript
function methodAlias (func, target) {
    return function () {
        return func.apply(target, arguments);
    }
}

let sayName3 = methodAlias(person.sayName, person);
sayName3();
```

**同样的例子**还有给 `document.querySelector` 等函数起别名，如下所示：
```javascript
// Error: 该方法内部会使用指向 document 的 this
let queryElem = document.querySelector;
queryElem('#id');   // Error

// 使用自定义的起别名方法，指明 this 指向
let queryElem = methodAlias(document.querySelector, document);
queryElem('#id');
```

#### 使用 bind, 推荐
在大部分浏览器中都实现了 `Function.prototype.bind` 方法，可以如下使用：
```javascript
let sayName4 = person.sayName.bind(person);
sayName4();     // Mango

let queryElem = document.querySelector.bind(document);
queryElem('#id');
```

`bind`方法的实现原理如下:
```javascript
Function.prototype.bind = function (context) {
    let self = this;
    return function () {
        self.apply(context, arguments);
    }
}
```


## 2. call 与 apply
### 2.1 简述
`call` 与 `apply` 只是在形式是不同，如下所示：

```javascript
const func = function (a, b, c) {
    console.log([a, b, c]);
}
// apply 的第二个参数是数组或类数组
func.apply(null, [1, 2, 3]);
// call 会将函数的参数依次往后排，call 是 apply 的一个语法糖
func.call(null, 1, 2, 3);
}
```

当`call` 和 `apply` 的第一个参数为 `null` 时，函数(普通函数与对象方法)体内的 `this` 会指向默认的宿主对象，在浏览器中是 `window`。
```javascript
window.age = 200;
const obj = {
    age: 28,
    func2: function () {
        console.log('func2: ', this.age);
    }
}
const func1 = function () {
    console.log('func1: ', this.age);
}
func1.apply(null);  // 200 this指向window
func1.apply(obj);   // 28 this指向 obj

obj.func2.apply(null);  // 200 this 指向 window
obj.func2.apply(obj);   // 28 this指向obj
```

### 2.2 call 和 apply 的其他用途
#### 借用其他对象的方法
最典型的就是类数组借用 `Array.prototype` 中的方法。
比如函数的参数列表 `arguments` 是一个类数组对象，虽然它也有“下标”，但它不是真正的数组，所以不能像数组一样使用数组的方法。
这种情况就可以使用 `Array.prototype` 中的方法。
**一般情况下，对象有“下标”和`length`属性即可使用数组的原型方法。**

常用方法如下所示：
```javascript
// 将类数组转为数组
Array.prototype.slice.apply(arguments);

// 往类数组中添加元素
Array.prototype.push.apply(arguments, ['one']);

//...
```
