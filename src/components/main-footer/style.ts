import styled from 'styled-components'

export const MainFooterWrapper = styled.div`
  /* margin-top: 20px; */
  padding: 24px 0 24px 20px;

  /* height: 168px; */
  background-color: #f3f5f8;
  color: #fff;

  .links {
    color: #666;

    ul {
      display: flex;
      align-items: center;

      li {
        padding: 0 5px;
        &::after {
          content: '/';
          position: relative;
          left: 3px;
          bottom: 1px;
          display: inline-block;
          padding: 0 3px;
        }

        &:last-child {
          &::after {
            content: '';
          }
        }
      }
    }
  }

  .copyright {
    font-size: 14px;
    color: #9ca4a9;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`
