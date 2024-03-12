import styled from 'styled-components'

export const CategoryWrapper = styled.div`
  padding: 20px 0;
  .head {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 20px 0;
    padding: 18px;
    border: 1px solid #e0e0e0;

    .title {
      display: block;
      margin-bottom: 18px;
      line-height: 30px;
      text-align: center;
      font-size: 22px;
      font-weight: 700;
      color: #444;
    }
    .totail {
      font-size: 12px;
      color: #666;
      span {
        &:nth-child(2) {
          margin-left: 3px;
        }
      }
    }
  }

  .options {
    display: flex;
    justify-content: right;
    margin: 10px 0;
    color: #909090;
    font-size: 14px;
    span {
      padding: 0 10px;
      &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.color.colorPrimary};
      }
    }

    .active {
      color: ${(props) => props.theme.color.colorPrimary};
    }
  }

  .content {
    .list {
      .item {
        margin-bottom: 20px;
      }

      .not-article {
        text-align: center;
        font-size: 18px;
        color: #666;
      }
    }
  }
  .pagination {
    text-align: center;
  }
`
