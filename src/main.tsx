import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { App as AntApp, ConfigProvider } from 'antd'

import { Provider } from 'react-redux'
import store from './store/index.ts'

import 'normalize.css'
import '@/assets/css/index.less'
import '@/assets/css/common.less'
import '@/assets/icon/iconFont.less'
import antTheme from './assets/theme/ant-theme.ts'
import theme from './assets/theme/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>

  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ConfigProvider theme={antTheme}>
          <AntApp>
            <App />
          </AntApp>
        </ConfigProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>

  // </React.StrictMode>
)
