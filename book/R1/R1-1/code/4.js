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