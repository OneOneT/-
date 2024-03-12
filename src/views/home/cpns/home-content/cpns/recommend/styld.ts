import styled from 'styled-components'

export const RecommendWrapper = styled.div`
  margin-bottom: 20px;
  position: relative;
  width: 218px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  color: #444;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name {
      padding: 10px 14px;
      font-size: 16px;
      font-weight: 600;
    }

    .change {
      position: absolute;
      top: 14px;
      right: 14px;
      font-size: 12px;
      color: #ff7e7e;
      cursor: pointer;
    }
  }
`

export const UserList = styled.div`
  padding: 14px;
  border-top: 1px solid #e0e0e0;

  .item {
    display: flex;
    align-items: center;
    .price {
      margin-right: 6px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
      }
    }

    .des {
      flex: 2;
      .name {
        color: #444;
        font-size: 12px;
        font-weight: 700;
      }
      .expertise {
        margin-top: 2px;
        font-size: 10px;
        color: #777;
      }
    }

    .follow {
      padding: 0;
      width: 40px;
      height: 20px;

      color: #fff;
      font-size: 12px;
      text-align: center;
      line-height: 18px;
      border-radius: 0;
    }
  }
`

export const RecommendMore = styled.div`
  padding: 10px 0;
  text-align: center;
  font-size: 12px;
  color: #ff7e7e;
  border-top: 1px solid #e0e0e0;
`
