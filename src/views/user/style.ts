import styled from 'styled-components'

export const UserWrapper = styled.div``

export const UserTop = styled.div`
  margin: 20px 0;
  .background {
    width: 100%;
    height: 220px;
  }

  .userInfo {
    margin-top: -50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .avatar {
      position: relative;
      /* top: -50px; */
      border: 3px solid #fff;
      border-radius: 50%;
    }

    .name {
      margin-top: 5px;
      font-size: 24px;
      font-weight: 600;
      line-height: 1.5;
      text-align: center;
      color: #444;
    }

    .fun {
      span {
        padding: 0 5px;
      }
      a:nth-child(1) {
        padding-right: 16px;
        border-right: 1px solid #cdcdcd;
      }

      a:nth-child(2) {
        margin-left: 16px;
      }
    }

    .desc {
      padding: 0 40px;
      margin-top: 10px;
      line-height: 1.7;
      color: #aaa;
    }

    .btn {
      margin-top: 5px;
    }

    .edit {
      opacity: 0;

      &:hover {
        opacity: unset;
      }
    }

    .ant-btn.ant-btn-sm {
    }
  }
`

export const UserContent = styled.div`
  margin-bottom: 40px;

  .ant-tabs-nav {
    width: 210px;
  }

  .ant-tabs-content-holder {
    border-right: none;
  }
  .ant-tabs-tab:hover {
    background-color: #fafafa;
  }
  .ant-tabs-tab-active {
    background-color: #fafafa;
  }
`

export const ContentList = styled.div``
