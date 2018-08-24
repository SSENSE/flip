import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components'

class Button extends Component {
    constructor() {
        super()
    }

    doSomething() {
        console.log('whatever')
    };

    render() {
        return (
            <div>
                <StyledButton {...this.props}/>
            </div>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string,
    banana: PropTypes.bool
};

export default Button;

export const StyledButton = styled.button`
	background: ${props => (props.primary ? 'palevioletred' : 'white')};
	color: ${props => (props.primary ? 'white' : 'palevioletred')};

	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	cursor: pointer;
	border-radius: 0px;
`;
