import styled from "vue-styled-components";
const Button = {
  data() {
    return this.__state;
  },

  render() {
    const h = arguments[0];
    return h("div", [h(StyledButton, this.$attrs)]);
  },

  methods: {
    doSomething() {
      console.log("whatever");
    }

  }
};
Button.propTypes = {
  text: PropTypes.string,
  banana: PropTypes.bool
};
export default Button;
export const StyledButton = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  cursor: pointer;
  border-radius: 0px;
`;