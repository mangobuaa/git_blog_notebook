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