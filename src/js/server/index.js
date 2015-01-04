var http = require('http'),
    express = require('express'),
    serveStatic = require('serve-static'),
    app = express(),
    React = require('react'),
    Main = require('../shared/components/main').Main;

function wrapHTML(styles, scripts, body) {
    return [
        '<!doctype html5>',
        '<html>',
            '<head>',
                '<title>Eve Online Ship Comparator</title>',
                styles.join('\n'),
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
        [],
        [ '/js/client.js' ],
        React.renderToString(React.createFactory(Main)({
            items: [ "Server Data" ]
        }))));
});

app.use(serveStatic('public'));

var server = app.listen(8080, function() {});