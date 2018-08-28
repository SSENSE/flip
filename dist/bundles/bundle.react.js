'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var styled = _interopDefault(require('styled-components'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

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
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  color: ", ";\n\n  font-size: 1em;\n  margin: 1em;\n  padding: 0.25em 1em;\n  border: 2px solid palevioletred;\n  cursor: pointer;\n  border-radius: 0px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Button =
/*#__PURE__*/
function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    var _this;

    _classCallCheck(this, Button);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "propTypes", {
      text: PropTypes.string,
      banana: PropTypes.bool
    });

    return _this;
  }

  _createClass(Button, [{
    key: "doSomething",
    value: function doSomething() {
      console.log("whatever");
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("div", null, React__default.createElement(StyledButton, this.props));
    }
  }]);

  return Button;
}(React.Component);

Button.propTypes = {
  text: PropTypes.string,
  banana: PropTypes.bool
};
var StyledButton = styled.button(_templateObject(), function (props) {
  return props.primary ? "palevioletred" : "white";
}, function (props) {
  return props.primary ? "white" : "palevioletred";
});

var atoms = {
  typefaces: {
    favorit_SSENSE: {
      fontFamily: "sans-serif",
      fontSize: "15.5px",
      letterSpacing: "-0.05px",
      lineHeight: "20px",
      textTransform: "uppercase"
    }
  },
  colors: {
    black: "#222222",
    backgroundWhite: "#FFFFFF",
    textWhite: "#F9F9F9"
  },
  borders: {
    widths: {
      small: "1px",
      large: "2px"
    },
    radius: {
      small: "2px",
      large: "2px"
    }
  },
  spacing: function spacing(num) {
    return "".concat(num * 0.25, "rem");
  },
  breakPoints: {
    xs: "599px",
    sm: "600px",
    md: "900px",
    lg: "1200px",
    xl: "1800px"
  }
};

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  display: grid;\n  @media (max-width: ", ") {\n    grid-template-columns: ", ";\n    grid-template-rows: ", ";\n  }\n  @media (min-width: ", ") {\n    grid-template-columns: ", ";\n    grid-template-rows: ", ";\n  }\n  @media (min-width: ", ") {\n    grid-template-columns: ", ";\n    grid-template-rows: ", ";\n  }\n  @media (min-width: ", ") {\n    grid-template-columns: ", ";\n    grid-template-rows: ", ";\n  }\n  @media (min-width: ", ") {\n    grid-template-columns: ", ";\n    grid-template-rows: ", ";\n  }\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var breakPoints = atoms.breakPoints;
var utils = {
  setCells: function setCells(cells) {
    var cssReturn = "";

    for (var i = 0; i < cells; i += 1) {
      cssReturn += "1fr ";
    }

    return cssReturn;
  },
  responsive: function responsive(props, size, index) {
    if (this.noSizes(props)) {
      return null;
    }

    switch (size) {
      case "xs":
        return this.check(props, "xs", index) ? props.xs[index] : this.scaleUp(props, index);

      case "sm":
        return this.check(props, "sm", index) || this.scaleDown(props, "sm", index);

      case "md":
        return this.check(props, "md", index) || this.scaleDown(props, "md", index);

      case "lg":
        return this.check(props, "lg", index) || this.scaleDown(props, "lg", index);

      case "xl":
        return this.check(props, "xl", index) || this.scaleDown(props, "xl", index);

      default:
        return 1;
    }
  },
  noSizes: function noSizes(props) {
    return Object.keys(props).filter(function (prop) {
      return prop === "xs" || prop === "sm" || prop === "md" || prop === "lg" || prop === "xl";
    }).length === 0;
  },
  scaleUp: function scaleUp(props, index) {
    return this.check(props, "xs", index) || this.check(props, "sm", index) || this.check(props, "md", index) || this.check(props, "lg", index) || this.check(props, "xl", index);
  },
  scaleDown: function scaleDown(props, size, index) {
    switch (size) {
      case "sm":
        return this.check(props, "xs", index) || this.scaleUp(props, index);

      case "md":
        return this.check(props, "sm", index) || this.check(props, "xs", index) || this.scaleUp(props, index);

      case "lg":
        return this.check(props, "md", index) || this.check(props, "sm", index) || this.check(props, "xs", index) || this.scaleUp(props, index);

      case "xl":
        return this.check(props, "lg", index) || this.check(props, "md", index) || this.check(props, "sm", index) || this.check(props, "xs", index) || this.scaleUp(props, index);

      default:
        return [1];
    }
  },
  check: function check(props, size, index) {
    return props[size] && props[size][index];
  }
};
var GridDiv = styled.div(_templateObject$1(), breakPoints.xs, function (props) {
  return "repeat(".concat(utils.responsive(props, "xs", 0), ", auto)");
}, function (props) {
  return "repeat(".concat(utils.responsive(props, "xs", 1), ", auto)");
}, breakPoints.sm, function (props) {
  return "repeat(".concat(utils.responsive(props, "sm", 0), ", auto)");
}, function (props) {
  return "repeat(".concat(utils.responsive(props, "sm", 1), ", auto)");
}, breakPoints.md, function (props) {
  return "repeat(".concat(utils.responsive(props, "md", 0), ", auto)");
}, function (props) {
  return "repeat(".concat(utils.responsive(props, "md", 1), ", auto)");
}, breakPoints.lg, function (props) {
  return "repeat(".concat(utils.responsive(props, "lg", 0), ", auto)");
}, function (props) {
  return "repeat(".concat(utils.responsive(props, "lg", 1), ", auto)");
}, breakPoints.xl, function (props) {
  return "repeat(".concat(utils.responsive(props, "xl", 0), ", auto)");
}, function (props) {
  return "repeat(".concat(utils.responsive(props, "xl", 1), ", auto)");
});

var Grid =
/*#__PURE__*/
function (_Component) {
  _inherits(Grid, _Component);

  function Grid() {
    _classCallCheck(this, Grid);

    return _possibleConstructorReturn(this, _getPrototypeOf(Grid).apply(this, arguments));
  }

  _createClass(Grid, [{
    key: "renderChildren",
    value: function renderChildren() {
      var _this = this;

      var children = this.props.children;
      return React__default.Children.map(children, function (child) {
        return React__default.cloneElement(child, {
          parent: _objectSpread({}, _this.props)
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement(GridDiv, this.props, this.renderChildren());
    }
  }]);

  return Grid;
}(React.Component);

Grid.propTypes = {
  xs: PropTypes.arrayOf(PropTypes.number),
  sm: PropTypes.arrayOf(PropTypes.number),
  md: PropTypes.arrayOf(PropTypes.number),
  lg: PropTypes.arrayOf(PropTypes.number),
  xl: PropTypes.arrayOf(PropTypes.number)
};

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  color: ", ";\n\n  font-size: 1em;\n  margin: 1em;\n  padding: 0.25em 1em;\n  border: 2px solid palevioletred;\n  cursor: pointer;\n  border-radius: 0px;\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}

var Button$1 =
/*#__PURE__*/
function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this));
  }

  _createClass(Button, [{
    key: "doSomething",
    value: function doSomething() {
      console.log("whatever");
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("div", null, React__default.createElement(StyledButton$1, this.props));
    }
  }]);

  return Button;
}(React.Component);

Button$1.propTypes = {
  text: PropTypes.string,
  banana: PropTypes.bool
};
var StyledButton$1 = styled.button(_templateObject$2(), function (props) {
  return props.primary ? "palevioletred" : "white";
}, function (props) {
  return props.primary ? "white" : "palevioletred";
});

exports.button = Button;
exports.grid = Grid;
exports.input = Button$1;
