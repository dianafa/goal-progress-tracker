document.addEventListener('DOMContentLoaded', function() {
document.getElementById('add').addEventListener("click", onAddClick);

  getCurrentProgress(function(data) {
    prepareView(data);
  });
});

function getCurrentProgress(callback) {
  var searchUrl = 'http://public.diana.wikia-dev.com/api.php?getQ2';
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  x.responseType = 'json';
  x.onload = function() {
    var data = x.response;
    if (!data) {
      console.log('No response from API :(');
      return;
    }

    callback(data);
  };
  x.onerror = function() {
    console.log('Network error.');
  };
  x.send();
}

function onAddClick() {
  var searchUrl = 'http://public.diana.wikia-dev.com/api.php';
  var x = new XMLHttpRequest();
  var params = "setQ2=true";
  x.open('POST', searchUrl, true);

  x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  x.responseType = 'json';
  x.onload = function() {
    var response = x.response;
    if (!response) {
      console.log('No response from API :(');
      return;
    }

    debugger
  };
  x.onerror = function() {
    console.log('Network error.');
  };
  x.send(params);
}

function onPlusClick(target) {
  console.log("target", target)
}

function prepareView(data) {
    if (!data) {
      return;
    }

    var source   = document.getElementById("entry-template").innerHTML,
      template = Handlebars.compile(source),
      context = {data: data},
      html    = template(context);

    document.getElementById("template").innerHTML = html;

    [].forEach.call(document.getElementsByClassName('plus'), function( plus ){
      plus.addEventListener("click", onPlusClick);
    });
}

// for testing when no internet :D
function getCurrentProgress2(callback) {
  var data = [
    {
      name: "Remarks regarding code sloppiness:",
      count: 1
    },
    {
      name: "Useful comments during CRs:",
      count: 1
    },
    {
      name: "Write 50% of methods in TDD:",
      elements: [
        {
          name: "Count of methods written:",
          count: 3
        },
        {
          name: "Count of methods written in TDD:",
          count: 1
        },
        {
          name: "%of methods written in TDD:",
          count: 50
        }
      ]
    }
  ];

  callback(data);
}