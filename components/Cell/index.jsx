import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import atoms from '../../styles/atoms';

const { breakPoints } = atoms;

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
		return (
			props.xs || props.sm || props.md || props.lg || props.xl || [1, 1, 1, 1]
		);
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
		grid-column: ${({ ...props }) =>
			utils.setCells(utils.getSize(props, 'xs'), 'col')};
		grid-row: ${({ ...props }) =>
			utils.setCells(utils.getSize(props, 'xs'), 'row')};
	}
	@media (min-width: ${breakPoints.sm}) {
		grid-column: ${({ ...props }) =>
			utils.setCells(utils.getSize(props, 'sm'), 'col')};
		grid-row: ${({ ...props }) =>
			utils.setCells(utils.getSize(props, 'sm'), 'row')};
	}
	@media (min-width: ${breakPoints.md}) {
		grid-column: ${({ ...props }) =>
			utils.setCells(utils.getSize(props, 'md'), 'col')};
		grid-row: ${({ ...props }) =>
			utils.setCells(utils.getSize(props, 'md'), 'row')};
	}
	@media (min-width: ${breakPoints.lg}) {
		grid-column: ${({ ...props }) =>
			utils.setCells(utils.getSize(props, 'lg'), 'col')};
		grid-row: ${({ ...props }) =>
			utils.setCells(utils.getSize(props, 'lg'), 'row')};
	}
	@media (min-width: ${breakPoints.xl}) {
		grid-column: ${({ ...props }) =>
			utils.setCells(utils.getSize(props, 'xl'), 'col')};
		grid-row: ${({ ...props }) =>
			utils.setCells(utils.getSize(props, 'xl'), 'row')};
	}
`;

function Cell(props) {
	return <CellDiv {...props}>{props.children}</CellDiv>;
}

Cell.propTypes = {
	xs: PropTypes.arrayOf(PropTypes.number),
	sm: PropTypes.arrayOf(PropTypes.number),
	md: PropTypes.arrayOf(PropTypes.number),
	lg: PropTypes.arrayOf(PropTypes.number),
	xl: PropTypes.arrayOf(PropTypes.number)
};

export default Cell;
