
const
    html = require('../utilities/react-dom-utils.js').html,
    component = require('../utilities/react-dom-utils.js').component;


var Main = component(function(props) {
    return html([
        'div',
        [ Categories, props ]
    ]);
});

var Categories = component(function(props) {
    return html([
        'div.ship-categories',
        [ 'h3.ship-category-label', 'Ship Categories' ],
        [ 'ul' ].concat(props.categories.map(function(c) {
            return [
                'li.ship-category',
                [ 'span.ship-category-name', c.name ],
                [ 'ul.ship-members' ].concat(c.ships.map(function(s) {
                    return [ ShipMenuItem, s ];
                }))];
        }))
    ]);
});

var ShipMenuItem = component(function(props) {
    return html([ 'div', props.name ]);
});

exports.Main = Main;