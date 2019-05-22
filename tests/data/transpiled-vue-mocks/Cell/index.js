function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import styled from "vue-styled-components";
import atoms from '../../styles/atoms';
const {
  breakPoints
} = atoms;
const utils = {
  getSize(props, size) {
    const breakProvided = Object.keys(props).includes(size);
    return breakProvided ? props[size] : this.scaleDown(props, size);
  },

  scaleDown(props, size) {
    switch (size) {
      case 'sm':
        return props.xs || this.scaleUp(props);

      case 'md':
        return props.sm || props.xs || this.scaleUp(props);

      case 'lg':
        return props.md || props.sm || props.xs || this.scaleUp(props);

      case 'xl':
        return props.lg || props.md || props.sm || props.xs || this.scaleUp(props);

      default:
        return [1, 1, 1, 1];
    }
  },

  scaleUp(props) {
    return props.xs || props.sm || props.md || props.lg || props.xl || [1, 1, 1, 1];
  },

  setCells(props, type) {
    if (type === 'col') {
      if (props[0] === '*') return `1 / -1`;
      return `${props[0]} / ${props[1]}`;
    }

    if (type === 'row') {
      if (props[0] === '*') return ``;
      return `${props[2]} / ${props[3]}`;
    }
  }

};
const CellDiv = styled.div`
	@media (max-width: ${breakPoints.xs}) {
		grid-column: ${(_ref) => {
  let props = _extends({}, _ref);

  return utils.setCells(utils.getSize(props, 'xs'), 'col');
}};
		grid-row: ${(_ref2) => {
  let props = _extends({}, _ref2);

  return utils.setCells(utils.getSize(props, 'xs'), 'row');
}};
	}
	@media (min-width: ${breakPoints.sm}) {
		grid-column: ${(_ref3) => {
  let props = _extends({}, _ref3);

  return utils.setCells(utils.getSize(props, 'sm'), 'col');
}};
		grid-row: ${(_ref4) => {
  let props = _extends({}, _ref4);

  return utils.setCells(utils.getSize(props, 'sm'), 'row');
}};
	}
	@media (min-width: ${breakPoints.md}) {
		grid-column: ${(_ref5) => {
  let props = _extends({}, _ref5);

  return utils.setCells(utils.getSize(props, 'md'), 'col');
}};
		grid-row: ${(_ref6) => {
  let props = _extends({}, _ref6);

  return utils.setCells(utils.getSize(props, 'md'), 'row');
}};
	}
	@media (min-width: ${breakPoints.lg}) {
		grid-column: ${(_ref7) => {
  let props = _extends({}, _ref7);

  return utils.setCells(utils.getSize(props, 'lg'), 'col');
}};
		grid-row: ${(_ref8) => {
  let props = _extends({}, _ref8);

  return utils.setCells(utils.getSize(props, 'lg'), 'row');
}};
	}
	@media (min-width: ${breakPoints.xl}) {
		grid-column: ${(_ref9) => {
  let props = _extends({}, _ref9);

  return utils.setCells(utils.getSize(props, 'xl'), 'col');
}};
		grid-row: ${(_ref10) => {
  let props = _extends({}, _ref10);

  return utils.setCells(utils.getSize(props, 'xl'), 'row');
}};
	}
`;

function Cell(props) {
  return h(CellDiv, props, [props.children]);
}

Cell.propTypes = {
  xs: PropTypes.arrayOf(PropTypes.number),
  sm: PropTypes.arrayOf(PropTypes.number),
  md: PropTypes.arrayOf(PropTypes.number),
  lg: PropTypes.arrayOf(PropTypes.number),
  xl: PropTypes.arrayOf(PropTypes.number)
};
export default Cell;