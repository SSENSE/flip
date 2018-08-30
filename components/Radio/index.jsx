import styled from 'styled-components';
import React, { PropTypes } from 'react';

/**
 * This is a Radio for bananas
 */
export default class Radio extends React.Component {
	render() {
		return <StyledRadio />;
	}
}

Radio.propTypes = {
	/** Determines wether the prop is a banana */
	banana: PropTypes.boolean
};

export const StyledRadio = styled.input.attrs({ type: 'radio' })`
	font-size: 16px;
`;
