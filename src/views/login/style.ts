import styled from 'styled-components'

export const LoginWrapper = styled.div`
  height: 100vh;
  background-color: #f1f1f1;

  display: flex;
  align-items: center;

  .panel {
    box-sizing: border-box;
    display: inline-block;
    width: 400px;
    margin: 0 auto;
    padding: 50px 50px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }

  .ant-tabs-nav::before {
    border-bottom: none;
  }
`
