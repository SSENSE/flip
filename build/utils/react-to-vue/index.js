"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var eventRE = /^on/;

var isSpecialMethod = function () {
  var specialMethods = new Set(['render', 'componentDidMount', 'componentWillMount', 'componentWillUnmount', 'constructor']);
  return function (methodName) {
    return specialMethods.has(methodName);
  };
}();

var mapMethodName = function () {
  var map = null;
  return function (t, key) {
    if (!map) {
      map = {
        componentDidMount: t.identifier('mounted'),
        componentWillMount: t.identifier('beforeMount'),
        componentWillUnmount: t.identifier('beforeDestroy'),
        constructor: t.identifier('data')
      };
    }

    return map[key.name] || key;
  };
}();

var removeImports = function removeImports(t, path) {
  path.traverse({
    ImportDeclaration: function ImportDeclaration(path) {
      var source = path.get('source');

      if (!t.isStringLiteral(source)) {
        return;
      }

      var name = source.node.value;

      if (name === 'react-dom') {
        path.replaceWith(t.importDeclaration([t.importDefaultSpecifier(t.identifier('Vue'))], t.stringLiteral('vue')));
      } else if (name === 'react' || name === 'prop-types') {
        path.remove();
      } else if (name === "styled-components") {
        path.replaceWith(t.importDeclaration([t.importDefaultSpecifier(t.identifier("styled"))], t.stringLiteral("vue-styled-components")));
      }
    }
  });
};

var getImportIdentifier = function getImportIdentifier(t, path, moduleName, identifier) {
  var result = null;
  path.traverse({
    ImportDeclaration: function ImportDeclaration(path) {
      var specifiers = path.get('specifiers');
      var source = path.get('source');

      if (!t.isStringLiteral(source) || source.node.value !== moduleName) {
        return;
      }

      specifiers.forEach(function (specifier) {
        if (t.isImportDefaultSpecifier(specifier)) {
          result = identifier;
          return;
        }

        var imported = specifier.get('imported');
        var local = specifier.get('local');

        if (t.isIdentifier(imported) && imported.node.name === identifier && t.isIdentifier(local)) {
          result = local.node.name;
        }
      });
    }
  });
  return result;
};

var convertReactBody = function convertReactBody(t, path) {
  var dataIdentifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '$data';
  path.traverse({
    // this.state.*, this.props.* => this.$attrs.*, this.props.children
    MemberExpression: function MemberExpression(path) {
      var object = path.get('object');
      var property = path.get('property');

      if (t.isMemberExpression(object) && t.isThisExpression(object.get('object')) && t.isIdentifier(object.get('property')) && (object.get('property').node.name === 'props' || object.get('property').node.name === '$attrs') && t.isIdentifier(property) && property.node.name === 'children') {
        path.replaceWith(t.memberExpression(t.thisExpression(), t.identifier('$children')));
      } else if (t.isThisExpression(object) && t.isIdentifier(property) && property.node.name === 'state') {
        property.replaceWith(t.identifier(dataIdentifier));
      } else if (t.isThisExpression(object) && t.isIdentifier(property) && property.node.name === 'props') {
        property.replaceWith(t.identifier('$attrs'));
      }
    },
    // children
    VariableDeclaration: function VariableDeclaration(path) {
      var declarators = path.get('declarations');
      declarators.forEach(function (declaratorPath) {
        var id = declaratorPath.get('id');
        var init = declaratorPath.get('init');

        if (!t.isObjectPattern(id) || !t.isMemberExpression(init) || !t.isThisExpression(init.get('object')) || !t.isIdentifier(init.get('property')) || init.get('property').node.name !== 'props') {
          return;
        }

        var properties = id.get('properties');
        properties.forEach(function (propertyPath) {
          if (!t.isObjectProperty(propertyPath)) {
            return;
          }

          var key = propertyPath.get('key');

          if (!t.isIdentifier(key) || key.node.name !== 'children') {
            return;
          }

          var childrenIdentifier = propertyPath.get('value').node;
          var declarator = t.variableDeclarator(childrenIdentifier, t.memberExpression(t.thisExpression(), t.identifier('$children')));

          if (properties.length === 1) {
            declaratorPath.replaceWith(declarator);
          } else {
            propertyPath.remove();
            declaratorPath.insertAfter(declarator);
          }
        });
      });
    },
    // className => class
    JSXAttribute: function JSXAttribute(path) {
      var name = path.get('name');

      if (t.isJSXIdentifier(name) && name.node.name === 'className') {
        path.replaceWith(t.jSXAttribute(t.jSXIdentifier('class'), path.get('value').node));
      }
    },
    // this.setState({...this.state, newProps: newVals})
    CallExpression: function CallExpression(path) {
      var callee = path.get('callee');
      var args = path.get('arguments');

      if (callee.node.type === 'Super') {
        path.remove();
        return;
      }

      if (t.isMemberExpression(callee) && t.isThisExpression(callee.get('object')) && t.isIdentifier(callee.get('property')) && callee.get('property').node.name === 'setState' && args.length === 1 && t.isObjectExpression(args[0])) {
        var statePatch = args[0].get('properties');
        var toPatch = [];
        statePatch.forEach(function (property) {
          if (t.isSpreadElement(property)) {
            return;
          }

          var key = property.get('key');
          toPatch.push({
            key: key,
            value: property.get('value')
          });
        });
        var assignments = toPatch.map(function (_ref) {
          var key = _ref.key,
              value = _ref.value;
          return t.expressionStatement(t.assignmentExpression('=', t.memberExpression(t.thisExpression(), key.node, !t.isIdentifier(key.node)), value.node));
        });
        path.replaceWith(t.blockStatement(assignments));
      }
    }
  });
};

var convertReactComponent = function convertReactComponent(t, path, isDefaultExport) {
  var id = path.get('id');
  var vueBody = [];
  var reactBody = path.get('body');
  var methods = []; // events

  path.traverse({
    BlockStatement: function BlockStatement(path) {
      var body = path.get('body');
      var eventMap = {};
      body.forEach(function (statementPath) {
        if (!t.isVariableDeclaration(statementPath)) {
          return;
        }

        var declarations = statementPath.get('declarations');
        declarations.forEach(function (declarationPath) {
          var id = declarationPath.get('id');
          var init = declarationPath.get('init');

          if (!t.isObjectPattern(id) || !t.isMemberExpression(init) || !t.isThisExpression(init.get('object')) || !t.isIdentifier(init.get('property')) || init.get('property').node.name !== 'props') {
            return;
          }

          var properties = id.get('properties');
          properties.forEach(function (propertyPath) {
            if (!t.isObjectProperty(propertyPath)) {
              return;
            }

            var key = propertyPath.get('key');
            var value = propertyPath.get('value');

            if (!eventRE.test(key.node.name)) {
              return;
            }

            eventMap[value.node.name] = key.node.name;
            propertyPath.remove();
          });

          if (id.get('properties').length === 0) {
            declarationPath.remove();
          }
        });
      });
      path.traverse({
        CallExpression: function CallExpression(path) {
          var callee = path.get('callee');

          if (!t.isIdentifier(callee) || eventMap[callee.node.name] === undefined) {
            return;
          }

          callee.replaceWith(t.memberExpression(t.memberExpression(t.thisExpression(), t.identifier('props')), t.identifier(eventMap[callee.node.name])));
        }
      });
      path.traverse({
        CallExpression: function CallExpression(path) {
          var callee = path.get('callee');

          if (!t.isMemberExpression(callee) || !t.isMemberExpression(callee.get('object')) || !t.isThisExpression(callee.get('object').get('object')) || !t.isIdentifier(callee.get('object').get('property')) || callee.get('object').get('property').node.name !== 'props' || !t.isIdentifier(callee.get('property')) || !eventRE.test(callee.get('property').node.name)) {
            return;
          }

          var eventNameUppercased = callee.get('property').node.name.replace(eventRE, '');
          var eventName = "".concat(eventNameUppercased[0].toLowerCase()).concat(eventNameUppercased.slice(1));
          var args = path.get('arguments').map(function (path) {
            return path.node;
          });
          path.replaceWith(t.callExpression(t.memberExpression(t.thisExpression(), t.identifier('$emit')), [t.stringLiteral(eventName)].concat(_toConsumableArray(args))));
        }
      });
    }
  });
  reactBody.get('body').forEach(function (reactProperty) {
    var key = reactProperty.get('key');

    if ( // normal methods
    t.isClassMethod(reactProperty) && (reactProperty.node.kind === 'method' || reactProperty.node.kind === 'constructor') && t.isIdentifier(key)) {
      var body = reactProperty.get('body');
      var params;

      if (reactProperty.node.kind === 'constructor') {
        params = [];
        var firstParam = reactProperty.node.params[0];

        if (t.isIdentifier(firstParam)) {
          body.node.body.unshift(t.variableDeclaration('var', [t.variableDeclarator(t.identifier(firstParam.name), t.memberExpression(t.thisExpression(), t.identifier('$props')))]));
        }

        body.node.body.push(t.returnStatement(t.memberExpression(t.thisExpression(), t.identifier('__state'))));
        convertReactBody(t, reactProperty.get('body'), '__state');
      } else {
        params = reactProperty.node.params;
        convertReactBody(t, reactProperty.get('body'));
      }

      var newMethod = t.objectMethod('method', mapMethodName(t, key.node), params, body.node);
      newMethod.async = reactProperty.node.async;
      newMethod.generator = reactProperty.node.generator;

      if (isSpecialMethod(key.node.name)) {
        vueBody.push(newMethod);
      } else {
        methods.push(newMethod);
      }
    } else if ( // bound-to-class methods
    t.isClassProperty(reactProperty) && !reactProperty.node.static && !reactProperty.node.computed && t.isArrowFunctionExpression(reactProperty.get('value'))) {
      var arrowFn = reactProperty.get('value');
      var _body = arrowFn.get('body').node;

      if (!t.isBlockStatement(_body)) {
        arrowFn.get('body').replaceWith(t.blockStatement([t.returnStatement(_body)]));
        _body = arrowFn.get('body').node;
      }

      var _params = arrowFn.node.params;
      convertReactBody(t, arrowFn.get('body'));

      var _newMethod = t.objectMethod('method', mapMethodName(t, key.node), _params, _body);

      _newMethod.async = arrowFn.node.async;
      _newMethod.generator = arrowFn.node.generator;

      if (isSpecialMethod(key.node.name)) {
        vueBody.push(_newMethod);
      } else {
        methods.push(_newMethod);
      }
    } else if ( // state
    t.isClassProperty(reactProperty) && !reactProperty.node.static && !reactProperty.node.computed && t.isIdentifier(key) && key.node.name === 'state') {
      vueBody.push(t.objectProperty(t.identifier('data'), t.arrowFunctionExpression([], reactProperty.get('value').node)));
    }
  });

  if (methods.length > 0) {
    vueBody.push(t.objectProperty(t.identifier('methods'), t.objectExpression(methods)));
  }

  if (isDefaultExport) {
    path.replaceWith(t.objectExpression(vueBody));
  } else {
    path.replaceWith(t.variableDeclaration('const', [t.variableDeclarator(id.node, t.objectExpression(vueBody))]));
  }
};

module.exports = function (_ref2) {
  var t = _ref2.types;
  return {
    visitor: {
      Program: function Program(path) {
        var componentIdentifier = getImportIdentifier(t, path, 'react', 'Component');
        var renderIdentifier = getImportIdentifier(t, path, 'react-dom', 'render');
        var defaultExport = null;
        path.traverse({
          ExportDefaultDeclaration: function ExportDefaultDeclaration(path) {
            defaultExport = path.get('declaration');
          },
          ClassDeclaration: function ClassDeclaration(path) {
            var superClass = path.get('superClass');

            if (superClass) {
              var isReactDotComponent = t.isMemberExpression(superClass) && superClass.node.object.name === 'React' && superClass.node.property.name === componentIdentifier;
              var isComponent = t.isIdentifier(superClass) && superClass.node.name === componentIdentifier;

              if (isReactDotComponent || isComponent) {
                convertReactComponent(t, path, path === defaultExport);
              }
            }
          },
          CallExpression: function CallExpression(path) {
            var callee = path.get('callee');
            var isReactDOMRender;

            if (t.isMemberExpression(callee)) {
              var object = callee.get('object');
              var property = callee.get('property');
              var computed = callee.node.computed;
              isReactDOMRender = !computed && t.isIdentifier(object) && t.isIdentifier(property) && object.node.name === 'ReactDOM' && property.node.name === renderIdentifier;
            } else if (t.isIdentifier(callee)) {
              isReactDOMRender = callee.node.name === renderIdentifier;
            }

            if (isReactDOMRender) {
              var _path$get = path.get('arguments'),
                  _path$get2 = _slicedToArray(_path$get, 2),
                  jsx = _path$get2[0],
                  el = _path$get2[1];

              path.replaceWith(t.newExpression(t.identifier('Vue'), [t.objectExpression([t.objectProperty(t.identifier('el'), el.node), t.objectMethod('method', t.identifier('render'), [], t.blockStatement([t.returnStatement(jsx.node)]))])]));
            }
          }
        });
        removeImports(t, path);
      }
    }
  };
};