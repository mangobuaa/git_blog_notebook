# Scopes 和 Digest

Angular scopes 就是普通的 JavaScript 对象，只是这个对象包含一些方法和属性，能够监测数据的变化。这个监测变化的机制有两个部分组成：
- 脏检查机制（dirty-checking）
- Digest 循环（Digest Cycle）,Digest 有“消化”的意义，可以理解为把已经“脏”了数据净化，使数据变的“不脏”。

## 1. Scope 对象
Scope 对象通过构造函数创建。创建第一个测试用例，使 Scope 具有基本的对象特征。

```javascript
//  位置：test/scope_spec.js
describe("Scope", function () {
    it("can be constructed and used as an object", function () {
        const scope = new Scope();
        scope.aProperty = 1;    // scope 对象可以添加属性

        expect(scope.aProperty).toBe(1);
    });
}
```

为了使测试通过，只需要创建一个 `Scope` 类即可，如下所示：

```javascript
// 位置： src/scope.js

function Scope () {
}
```

## 2. `$watch` 和 `$digest`，监听对象属性
`$watch` 和 `$digest` 共同组成了 Digest 循环的核心，对数据的变化做出响应。

通过 `$watch` 可以给 `Scope` 对象添加 `watcher`（当有变化发生时，会被通知），`watcher` 有两个函数组成：

```Typescript
interface Watcher {
    watchFn: () => void;
    listenFn: () => void
}
```