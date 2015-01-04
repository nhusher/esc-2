
var React = require('react'),
    Main = require('../shared/components/main').Main;

function json(url) {
    return new Promise(function(resolve) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(JSON.parse(this.responseText));
        };
        xhr.open('get', url, true);
        xhr.send();
    });
}

json('/api/ship/categories').then(function(c) {
    React.render(React.createElement(Main, {
        categories: c
    }), document.body);
});
