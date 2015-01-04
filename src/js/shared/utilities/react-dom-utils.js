
const
    React         = require('react'),
    u             = require('underscore'),
    DOM           = React.DOM,
    NORMALIZE_REG = /([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?/;

function component(renderDef) {
    return React.createClass({
        render: function () {
            return renderDef.call(this, this.props, this.state);
        }
    });
}

function html(node) {
    var tag = u.first(node),
        args = normalizeArguments(u.rest(node));

    if(typeof tag === 'string') {
        return htmlStringNode(tag, args[0], args[1]);
    } else {
        return componentNode(tag, args[0], args[1]);
    }
}

function htmlClassList() {
    return u.chain(arguments).filter(u.identity).map(function(i) {
        return (typeof i === 'string') ? i.split(' ') : i;
    }).reduce(function(acc, i) {
        acc.push.apply(acc, i);
        return acc;
    }, []).unique().value().join(' ');
}

function htmlStringNode(tag, args, children) {
    var normalizedTag = normalizeNodeString(tag),
        tagString = normalizedTag.tag,
        domFn = DOM[tagString];

    args.className = htmlClassList(normalizedTag.classList.concat(), args.className);
    args.id = normalizedTag.id || args.id;

    if(!domFn) {
        throw new ReferenceError("Constructor for tag [" + tagString + "] does not exist.");
    } else {
        return domFn.apply(DOM, [args].concat(children));
    }
}

function componentNode(tag, args, children) {
    var params = [ tag, args ];
    
    if(children.length) {
        params.push(children);
    }

    return React.createElement.apply(React, params);
}

function isObject(v) {
    return v instanceof Object && !Array.isArray(v)
}

function normalizeArguments(args) {
    var props = isObject(u.first(args)) ? u.first(args) : null,
        children = props ? u.rest(args) : args;

    return [ props || {}, children.reduce(function(acc, child) {
        // todo: calling html here recursively is probably wrong
        if(Array.isArray(child)) {
            acc.push(html(child));
        } else {
            acc.push(child);
        }
        return acc;
    }, [])];
}

function normalizeNodeString(nodeString) {
    var parsed  = NORMALIZE_REG.exec(nodeString),
        tag     = parsed[1],
        id      = parsed[2],
        classes = parsed[3] ? parsed[3].split('.') : null;

    return { tag: tag, id: id, classList: u.unique(classes) };
}

exports.component = component;
exports.html = html;
