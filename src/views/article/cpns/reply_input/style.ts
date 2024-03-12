import styled from 'styled-components'

export const ReplyInputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: end;

  .btn {
    margin-top: 20px;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 60px;
  }

  .ant-input-textarea-show-count > .ant-input {
    height: 40px;
    line-height: 28px;
    font-size: 16px;
    background-color: #f2f3f5;

    &:focus {
      /* height: 120px; */
      background-color: #fafafa;
    }
  }
`
