import styled from 'styled-components'

export const PublicWrapper = styled.div`
  .ant-modal-body {
    padding: 20px;
  }

  .container {
    margin: 20px 24px 20px 5px;

    .form-button {
      margin-top: 20px;
    }
  }
`

export const CatItemWrapper = styled.div`
  /* display: flex; */

  .cat-item {
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 10px;
    padding: 0 0.7rem;
    font-size: 14px;
    line-height: 28px;
    width: 40px;
    height: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    border-radius: 2px;
    cursor: pointer;
    color: #86909c;
    background-color: #f4f5f5;
  }

  .active {
    color: #1d7dfa;
    background-color: #e8f3ff;
  }
`
