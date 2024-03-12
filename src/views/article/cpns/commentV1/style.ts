import styled from 'styled-components'

export const CommentV1Wrapper = styled.div`
  .comment {
    .author {
      display: flex;
      align-items: center;

      .name {
        margin-left: 10px;
        /* font-size: 16px; */
      }

      .reply {
        display: flex;
        align-items: center;
        span {
          padding: 0 10px;
        }

        .content {
          margin-left: 5px;
          font-size: 16px;

          &::before {
            content: ':';
            position: relative;
            right: 3px;
          }
        }
      }
    }

    .contentWrapper {
      padding-left: 50px;

      .content {
        font-size: 16px;
        font-weight: 400;
        line-height: 28px;
      }

      .options {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-top: 8px;
        display: flex;
        align-items: center;
        color: #8a919f;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        .left {
          display: flex;

          .reply {
            margin-left: 10px;
            cursor: pointer;
            span {
              margin-left: 5px;
            }
          }
        }
      }
      .replyInput {
        margin: 5px 0;
      }

      .children {
        margin: 0px;
      }
    }
  }
`

export const PopoverWrapper = styled.div`
  display: flex;
  width: 120px;
  i {
    padding: 0 10px;
  }

  &:hover {
    background-color: #f2f3f5;
  }
`
