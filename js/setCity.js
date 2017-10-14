var city = document.querySelector('#city');
var btn = document.querySelector('#sub');


btn.addEventListener('click', function () {
  var cityName = city.value ? city.value : '昌平';
  ajaxGet('http://wthrcdn.etouch.cn/weather_mini?city=' + cityName, function (data) {
    var dataObj = JSON.parse(data);
    if (dataObj.status == 1000) {
      localStorage.city = cityName;
      alert('保存成功');
    }else {
      alert('该城市未收录，请重新检查');
    }
  });
})
