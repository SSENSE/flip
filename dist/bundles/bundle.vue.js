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
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  color: ", ";\n\n  font-size: 1em;\n  margin: 1em;\n  padding: 0.25em 1em;\n  border: 2px solid palevioletred;\n  cursor: pointer;\n  border-radius: 0px;\n"]);

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
      console.log("whatever");
    }
  }
};
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

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty$1(target, key, source[key]);
    });
  }

  return target;
}

function _defineProperty$1(obj, key, value) {
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
var Grid = {
  render: function render() {
    var h = arguments[0];
    return h(GridDiv, this.$attrs, [this.renderChildren()]);
  },
  methods: {
    renderChildren: function renderChildren() {
      var _this = this;

      var children = this.$children;
      return React.Children.map(children, function (child) {
        return React.cloneElement(child, {
          parent: _objectSpread$1({}, _this.$attrs)
        });
      });
    }
  }
};
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
      console.log("whatever");
    }
  }
};
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
