const console = require("console");
const { render } = require("less");

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