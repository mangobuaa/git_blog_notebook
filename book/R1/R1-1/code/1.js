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