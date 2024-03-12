import styled from 'styled-components'

export const EditorHeadWrapper = styled.div`
  .head {
    padding: 0 27px;
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;

    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      flex: 1;

      .ant-input {
        border: none;
        font-size: 24px;

        &:focus {
          border-color: #fff;
          box-shadow: none;
        }
      }
    }

    .options {
      display: flex;
      align-items: center;

      .changeType {
        margin-right: 20px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`
