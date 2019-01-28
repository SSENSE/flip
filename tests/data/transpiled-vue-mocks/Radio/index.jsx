import styled from "vue-styled-components";

/**
 * This is a Radio for bananas
 */
export default {
  render() {
    const h = arguments[0];
    return h(StyledRadio);
  }

};
Radio.propTypes = {
  /** Determines wether the prop is a banana */
  banana: PropTypes.boolean
};
export const StyledRadio = styled.input.attrs({
  type: 'radio'
})`
	font-size: 16px;
`;