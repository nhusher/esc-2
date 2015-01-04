var http = require('http'),
    express = require('express'),
    serveStatic = require('serve-static'),
    app = express(),

    React = require('react'),
    Main = require('../shared/components/main').Main,

    getShipCategories = require('./db').getShipCategories;



function wrapHTML(styles, scripts, body) {
    return [
        '<!doctype html5>',
        '<html>',
            '<head>',
                '<title>Eve Online Ship Comparator</title>',
                styles.map(function(s) {
                    return '<link rel="stylesheet" href="' + s + '">';
                }).join('\n'),
            '</head>',
            '<body>',
                '<div id="application">',
                body,
                '</div>',
                scripts.map(function(s) {
                    return '<script src="' + s + '"></script>';
                }).join('\n'),
            '</body>',
        '</html>'
    ].join('\n');
}

app.get('/', function (req, res) {
    res.send(wrapHTML(
        [ 
            'http://yui.yahooapis.com/pure/0.5.0/pure-min.css',
            '/css/styles.css'
        ],
        [ '/js/client.js' ],
        React.renderToString(React.createFactory(Main)({
            categories: getShipCategories()
        }))));
});

app.get('/api/ship/categories', function (req, res) {
    res.json(getShipCategories());
});

app.get('/api/ship/:shipId', function (req, res) {

});

app.use(serveStatic('public'));

var server = app.listen(8080, function() {});