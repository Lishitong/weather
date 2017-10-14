var weather = document.querySelector('#weather');
var huifu = document.querySelector('#huifu');
var city = localStorage.city ? localStorage.city : '昌平';

huifu.addEventListener('click', function () {
  localStorage.city = '昌平';
  city = localStorage.city;
  weather.innerHTML = '';
  go();
})

go();

function go() {
  ajaxGet('http://wthrcdn.etouch.cn/weather_mini?city=' + city, function (data) {
    var day = ['今天', '明天', '后天'];
    var dataObj = JSON.parse(data).data,
        forecast = dataObj.forecast;
    var temp = dataObj.wendu,
        city = dataObj.city,
        type = dataObj.forecast[0].type,
        fengxiang = dataObj.forecast[0].fengxiang;

        createWeatherToday(temp, city, type, fengxiang);

        for (var prop in forecast) {
            if (prop < 3) {
              var time = day[prop],
                  low = forecast[prop].low.substr(3),
                  high = forecast[prop].high.substr(3),
                  type = forecast[prop].type;
              createWeatherFuture(time, low, high, type);
            }
        }
  });
}

function createWeatherToday (t, c, ty, f) {
  var today = document.createElement('div');
      today.className = 'today';
  var temp = document.createElement('div');
      temp.className = 'temp';
      temp.innerHTML = '<span>' + t + '°C</span>';
  var city = document.createElement('div');
      city.className = 'city';
      city.innerHTML = '<span>' + c + '(实时)</span>';
  var status = document.createElement('div');
      status.className = 'status';
      status.innerHTML = '<span class="type">' + ty + '</span> <span class="fengxiang">' + f + '</span>';

      today.appendChild(temp);
      today.appendChild(city);
      today.appendChild(status);
      weather.appendChild(today);
}

function createWeatherFuture (d, l, h, t) {
  var future = document.querySelector('.future');
  if (!future) {
        future = document.createElement('div');
        future.className = 'future';
        weather.appendChild(future);
  }
  var div = document.createElement('div');
      div.innerHTML = '<span>' + d + '</span> <span>' + l + '/' + h + '</span> <span>' + t + '</span>';

  future.appendChild(div);
}
