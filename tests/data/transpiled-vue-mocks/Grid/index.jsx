function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import styled from "vue-styled-components";
import atoms from '../../styles/atoms';
const {
  breakPoints
} = atoms;
const utils = {
  setCells(cells) {
    let cssReturn = '';

    for (let i = 0; i < cells; i += 1) {
      cssReturn += `1fr `;
    }

    return cssReturn;
  },

  responsive(props, size, index) {
    if (this.noSizes(props)) {
      return null;
    }

    switch (size) {
      case 'xs':
        return this.check(props, 'xs', index) ? props.xs[index] : this.scaleUp(props, index);

      case 'sm':
        return this.check(props, 'sm', index) || this.scaleDown(props, 'sm', index);

      case 'md':
        return this.check(props, 'md', index) || this.scaleDown(props, 'md', index);

      case 'lg':
        return this.check(props, 'lg', index) || this.scaleDown(props, 'lg', index);

      case 'xl':
        return this.check(props, 'xl', index) || this.scaleDown(props, 'xl', index);

      default:
        return 1;
    }
  },

  noSizes(props) {
    return Object.keys(props).filter(prop => prop === 'xs' || prop === 'sm' || prop === 'md' || prop === 'lg' || prop === 'xl').length === 0;
  },

  scaleUp(props, index) {
    return this.check(props, 'xs', index) || this.check(props, 'sm', index) || this.check(props, 'md', index) || this.check(props, 'lg', index) || this.check(props, 'xl', index);
  },

  scaleDown(props, size, index) {
    switch (size) {
      case 'sm':
        return this.check(props, 'xs', index) || this.scaleUp(props, index);

      case 'md':
        return this.check(props, 'sm', index) || this.check(props, 'xs', index) || this.scaleUp(props, index);

      case 'lg':
        return this.check(props, 'md', index) || this.check(props, 'sm', index) || this.check(props, 'xs', index) || this.scaleUp(props, index);

      case 'xl':
        return this.check(props, 'lg', index) || this.check(props, 'md', index) || this.check(props, 'sm', index) || this.check(props, 'xs', index) || this.scaleUp(props, index);

      default:
        return [1];
    }
  },

  check(props, size, index) {
    return props[size] && props[size][index];
  }

};
const GridDiv = styled.div`
	display: grid;
	@media (max-width: ${breakPoints.xs}) {
		grid-template-columns: ${props => `repeat(${utils.responsive(props, 'xs', 0)}, auto)`};
		grid-template-rows: ${props => `repeat(${utils.responsive(props, 'xs', 1)}, auto)`};
	}
	@media (min-width: ${breakPoints.sm}) {
		grid-template-columns: ${props => `repeat(${utils.responsive(props, 'sm', 0)}, auto)`};
		grid-template-rows: ${props => `repeat(${utils.responsive(props, 'sm', 1)}, auto)`};
	}
	@media (min-width: ${breakPoints.md}) {
		grid-template-columns: ${props => `repeat(${utils.responsive(props, 'md', 0)}, auto)`};
		grid-template-rows: ${props => `repeat(${utils.responsive(props, 'md', 1)}, auto)`};
	}
	@media (min-width: ${breakPoints.lg}) {
		grid-template-columns: ${props => `repeat(${utils.responsive(props, 'lg', 0)}, auto)`};
		grid-template-rows: ${props => `repeat(${utils.responsive(props, 'lg', 1)}, auto)`};
	}
	@media (min-width: ${breakPoints.xl}) {
		grid-template-columns: ${props => `repeat(${utils.responsive(props, 'xl', 0)}, auto)`};
		grid-template-rows: ${props => `repeat(${utils.responsive(props, 'xl', 1)}, auto)`};
	}
`;
const Grid = {
  render() {
    const h = arguments[0];
    return h(GridDiv, this.$attrs, [this.renderChildren()]);
  },

  methods: {
    renderChildren() {
      const children = this.$children;
      return React.Children.map(children, child => React.cloneElement(child, {
        parent: _objectSpread({}, this.$attrs)
      }));
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
export default Grid;