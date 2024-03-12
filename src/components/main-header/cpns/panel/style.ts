import styled from 'styled-components'

export const PanelWrapper = styled.div`
  width: 290px;
  .list {
    padding: 8px;
    display: flex;
    flex-wrap: wrap;

    .list-item {
      margin-bottom: 4px;
      display: inline-block;
      width: 64px;
      height: 29px;
      border-radius: 4px;
      font-size: 12px;
      text-decoration: none;
      color: #444;
      line-height: 29px;
      text-align: center;

      &:hover {
        background: #f5f5f5;
        text-decoration: none;
      }
    }
  }
`
