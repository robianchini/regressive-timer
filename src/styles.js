import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${(props) =>
    props.theme === "light" ? "#F8F8FC" : "#121214"};
  color: ${(props) => (props.theme === "light" ? "#121214" : "#F8F8FC")};

  h1 {
    font-size: 50px;
  }

  .controls {
    background-color: #242424;
    padding: 10px 20px;
    border-radius: 50px;
  }

  button {
    background: none;
    border: none;
    color: #f8f8fc;
    &:disabled {
      opacity: 0.2;
    }
  }

  .theme-button {
    position: absolute;
    top: 20px;
    right: 20px;
    color: ${(props) => (props.theme === "light" ? "#121214" : "#F8F8FC")};
  }
`;
