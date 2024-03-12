import styled from 'styled-components'

export const MainHeaderWarpper = styled.div`
  height: 64px;
  font-size: 14px;
  background-color: #fff;
`

export const HeaderContent = styled.div`
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    &:hover {
      color: ${(props) => props.theme.color.colorPrimary};
    }
  }

  .classify {
    color: #666;
    border: 1px solid #cdcdcd;
    border-radius: 44px;
    margin-left: 22px;

    cursor: pointer;
  }

  .search {
    margin-left: 52px;
    border-radius: 20px;
    position: relative;
  }

  .ant-input {
    border: 1px solid ${(props) => props.theme.color.colorPrimary};
    border-radius: 20px;
  }
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;

  .notification {
    box-sizing: border-box;
    width: 70px;
    line-height: 64px;
    text-align: center;
    color: #777;

    margin: 10px;

    &:hover {
      background-color: #f3f3f3;
    }
  }

  .account {
    display: flex;
    align-items: center;

    .name {
      margin-left: 10px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .login {
    padding: 16px 20px;
    font-size: 16px;
    color: #777;

    &:hover {
      color: ${(props) => props.theme.color.colorPrimary};
    }
  }
`

export const HeaderBtm = styled.div`
  height: 1px;
  background-color: #000;
  opacity: 0.12;
  z-index: 990;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
`
