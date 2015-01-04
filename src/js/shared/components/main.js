
const
    html = require('../utilities/react-dom-utils.js').html,
    component = require('../utilities/react-dom-utils.js').component;


var Main = component(function(props) {
    return html([ 'ul' ].concat(props.items.map(function(i) {
        return [ 'li', i ];
    })));
});

exports.Main = Main;