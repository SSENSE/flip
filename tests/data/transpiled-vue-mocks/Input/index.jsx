import styled from "vue-styled-components";
/**
 * This is an input
 */

export default {
  render() {
    const h = arguments[0];
    return h(StyledInput, this.$attrs);
  }

};
export const StyledInput = styled.button`
	background: ${props => props.primary ? 'palevioletred' : 'white'};
	color: ${props => props.primary ? 'white' : 'palevioletred'};

	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	cursor: pointer;
	border-radius: 0px;
`;