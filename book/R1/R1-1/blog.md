# 面向对象的 JavaScript

## 1. 鸭子类型
> 鸭子类型的通俗说法是：“如果它走起来是鸭子，叫起来是鸭子，那么它就是鸭子。”
> 鸭子类型的语言关注的是 `has-a`, 而不是 `is-a`。

举例来说：
如果有一个鸭子合唱团，要求每个成员都能像鸭子一样唱歌。鸭子对象肯定可以加入，如果鸡要加入，就要像鸭子一样唱歌。换句话说，无论什么对象，只要能像鸭子一样唱歌，就可以加入合唱团。

```javascript
const duck = {    // duck 对象有 duckSing 方法
    duckSing: function () {
        console.log('gagaga');
    }
}
const chicken = {    // chicken 对象也有 duckSing 方法
    duckSing: function () {
        console.log('gagaga');
    }
}

const choir = [];           // 合唱团，都能像鸭子一样唱歌

function joinChoir (animal) {
    if (animal && typeof animal.duckSing === 'function') {
        choir.push(animal);
        console.log('亲成员加入');
        console.log('当前合唱团的数量：', choir.length);
    }
}

joinChoir(duck);
joinChoir(chicken);
```

> 利用鸭子类型的思想，不必借助超类型的帮助，就可以轻松在动态语言中实现一个原则：“面向接口编程，而不是面向实现编程。”

## 2. 多态
> 多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句。

例子：编写一个地图应用，可能是Google、百度等地图，每家都提供一个 show 方法显示地图。
- 不使用多态的情况如下所示。如果有添加一个高德地图，还需要添加if分支，违背了开放-封闭原则。

```javascript
// 不使用多态
const googleMap = {
    show: function () {
        console.log('google map start to render.');
    }
}
const baiduMap = {
    show: function () {
        console.log('baidu map start to render.');
    }
}

// 自定义函数，调用地图API的 show 方法
function renderMap (type) {
    if (type === 'google') {
        googleMap.show();
    } else if (type === 'baidu') {
        baiduMap.show();
    }
}

// 调用
renderMap('google');
renderMap('baidu');
```

- 使用多态如下所示，添加一个新的地图，不需要修改原来的代码，只需要添加一个有 `show` 方法的对象即可。

```javascript
const googleMap = {
    show: function () {
        console.log('google map start to render.');
    }
}
const baiduMap = {
    show: function () {
        console.log('baidu map start to render.');
    }
}

// 自定义函数，传入 map 对象
function renderMap (map) {
    if (map && typeof map.show === 'function') {
        map.show();
    }
}

// 调用
renderMap(googleMap);
renderMap(baiduMap);

// 如果此时添加一个高德地图，只需要添加一个高德地图对象即可，不需要修改原来代码
const gaodeMap = {
    show: function () {
        console.log('gaode map start to render.')
    }
}
renderMap(gaodeMap);
```

## 3. 基于原型的继承
原型继承在其他书籍中讲很多，比如红皮书《JavaScript 高级程序设计》，此处不做过多笔记，只记录部分新的收获。

#### 理解 `new` 运算符过程
自定义 `objectFactory` 方法，模拟 `new` 的运算符过程。

```javascript
// 定义一个 Person 类
function Person (name) {
    this.name = name;
}
Person.prototype.getName = function () {
    return this.name;
}

// objectFactory 对象工厂方法，模拟 new 运算符
const objectFactory = function () {
    let obj = new Object();
    // 获取第一个参数，也就是外部传入的构造器
    let Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    // ret 只有构造器显示返回数据时不为 undefined
    let ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
}

const person = objectFactory(Person, 'Mango');
console.log(person.getName());
```