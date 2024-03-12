import styled from 'styled-components'

export const CommentWrapper = styled.div`
  margin: 20px 0;
  padding: 0 10px;

  .title {
    margin-left: 10px;
    padding: 10px 0;

    font-size: 18px;
    font-weight: 700;

    span {
      &:nth-child(2) {
        margin-left: 10px;
      }
    }

    &::before {
      content: ' ';
      width: 10px;
      height: 22px;
      display: inline-block;
      position: relative;
      top: 4px;
      right: 12px;

      background-color: ${(props) => props.theme.color.colorPrimary};
      border-radius: 10px;
    }
  }

  .com {
    display: flex;
    margin: 20px 0;
    .author {
    }
    .reply-input {
      flex: 1;
      margin-left: 10px;
    }
  }

  .list {
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  }

  .default {
    padding: 40px 0 100px;
    /* border-top: 1px solid #ebebeb; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    span {
      margin-top: 10px;
      color: #ccc;
    }
  }
`
