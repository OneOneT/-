import styled from 'styled-components'

export const ContentV1Wrapper = styled.div`
  .container {
    border: 1px solid #e0e0e0;
    padding: 22px 22px 10px 22px;
  }
`

export const ConetentWrapper = styled.div`
  .title {
    max-width: 558px;
    font-size: 18px;
    line-height: 24px;
    color: #444;
    margin-top: 16px;
    margin-bottom: 10px;
  }

  .tags {
    margin-top: 5px;
    display: flex;
    justify-content: right;
  }
`

export const OptionsWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-top: none;

  display: flex;
  justify-content: center;

  .box {
    flex: 1;
    margin: 10px 0;
    height: 44px;
    border-right: 1px solid #e0e0e0;

    display: flex;
    justify-content: center;
    align-items: center;

    &:last-of-type {
      border-right: none;
    }
  }

  .icon {
    font-size: 24px;
    color: #666;
    display: block;
    margin-right: 12px;
  }
`
