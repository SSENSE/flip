import React, { PropTypes } from 'react';
import styled from 'styled-components';

/**
 * This is an input
 */
export default class Input extends React.Component {
	static propTypes = {
		/** Primary prop type */
		primary: PropTypes.boolean
	};

	render() {
		return <StyledInput {...this.props} />;
	}
}

export const StyledInput = styled.button`
	background: ${props => (props.primary ? 'palevioletred' : 'white')};
	color: ${props => (props.primary ? 'white' : 'palevioletred')};

	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	cursor: pointer;
	border-radius: 0px;
`;
