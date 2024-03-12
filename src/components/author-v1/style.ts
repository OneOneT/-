import styled from 'styled-components'

export const AuthorV1Wrapper = styled.div`
  .author-container {
    display: flex;
    align-items: center;
    .left {
      img {
        border-radius: 50%;
      }
    }

    .mid {
      flex: 1;
      margin-left: 10px;
      height: 100%;
      .name {
        display: inline-block;
        font-size: 18px;
        color: #444;
        line-height: 25px;
      }

      .mid-order {
      }
    }
  }
`
