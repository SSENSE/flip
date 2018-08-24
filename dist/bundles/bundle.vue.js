'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var styled = _interopDefault(require('vue-styled-components'));

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\tbackground: ", ";\n\tcolor: ", ";\n\n\tfont-size: 1em;\n\tmargin: 1em;\n\tpadding: 0.25em 1em;\n\tborder: 2px solid palevioletred;\n\tcursor: pointer;\n\tborder-radius: 0px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var Button = {
  data: function data() {
    return this.__state;
  },
  render: function render() {
    var h = arguments[0];
    return h("div", [h(StyledButton, this.$attrs)]);
  },
  methods: {
    doSomething: function doSomething() {
      console.log('whatever');
    }
  }
};
Button.propTypes = {
  text: PropTypes.string,
  banana: PropTypes.bool
};
var StyledButton = styled.button(_templateObject(), function (props) {
  return props.primary ? 'palevioletred' : 'white';
}, function (props) {
  return props.primary ? 'white' : 'palevioletred';
});

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n\tbackground: ", ";\n\tcolor: ", ";\n\n\tfont-size: 1em;\n\tmargin: 1em;\n\tpadding: 0.25em 1em;\n\tborder: 2px solid palevioletred;\n\tcursor: pointer;\n\tborder-radius: 0px;\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var Button$1 = {
  data: function data() {
    return this.__state;
  },
  render: function render() {
    var h = arguments[0];
    return h("div", [h(StyledButton$1, this.$attrs)]);
  },
  methods: {
    doSomething: function doSomething() {
      console.log('whatever');
    }
  }
};
Button$1.propTypes = {
  text: PropTypes.string,
  banana: PropTypes.bool
};
var StyledButton$1 = styled.button(_templateObject$1(), function (props) {
  return props.primary ? 'palevioletred' : 'white';
}, function (props) {
  return props.primary ? 'white' : 'palevioletred';
});

exports.button = Button;
exports.input = Button$1;
