function ajaxGet (url,callBack) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest () : new ActiveXObject('Microsoft.XMLHTTP');

  xhr.open('get', url, true);
  xhr.send(null);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callBack(xhr.responseText);
    };
  };
}
