import styled from 'styled-components'

export const ArticleWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`

export const ArticleLeft = styled.div`
  max-width: 680px;
  overflow: hidden;

  .createAt {
    margin-top: 3px;
    font-size: 12px;
  }
`

export const ArticleRight = styled.div`
  margin-left: 20px;
  width: 390px;

  .recommend {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    .title {
      padding: 16px 0;
      margin: 0 20px;
      font-size: 16px;
      font-weight: 500;
      border-bottom: 1px solid #e0e0e0;
    }
    .content {
      margin: 0 20px;
      padding: 10px 0;
    }
  }
`

export const MoreContentWrapper = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;

  p {
    padding: 10px;

    &:hover {
      background-color: #f3f4f6;
    }
  }
`

export const TagWrapper = styled.div`
  margin: 15px 0;
  .tag-title {
    margin-right: 8px;
    font-size: 14px;
    color: #515767;
  }
  .ant-tag {
    padding: 4px 8px;
  }
`
export const ContentWrapper = styled.div`
  overflow: hidden;
`
