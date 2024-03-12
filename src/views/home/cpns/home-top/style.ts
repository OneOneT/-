import styled from 'styled-components'

export const HomeTopWrapper = styled.div`
  margin-top: 20px;
  height: 380px;

  display: flex;

  .carousel {
    flex: 1;
    width: 714px;
  }

  .hot {
    width: 240px;
    padding-left: 16px;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
    border-left: none;

    .title {
      height: 22px;
      padding: 10px 0;
      font-size: 16px;
      font-weight: 600;
      color: #444;
      border-bottom: 1px solid #e0e0e0;
    }

    .tag {
      max-height: 130px;
      overflow: hidden;

      padding: 14px 0 0 0;
      display: flex;
      flex-wrap: wrap;
      .tag-item {
        margin-bottom: 12px;
        margin-right: 10px;
      }

      &:hover {
        max-height: 180px;
      }
    }

    .order {
      padding: 14px 0;
      max-height: 66px;
      overflow: hidden;
      border-top: 1px dashed #e0e0e0;
      border-bottom: 1px dashed #e0e0e0;
    }
  }
`
