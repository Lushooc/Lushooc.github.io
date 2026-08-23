import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import esES from 'antd/locale/es_ES'
import App from './App.jsx'
import './index.css'

const brandTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#6ee7f9',
    colorInfo: '#6ee7f9',
    colorBgBase: '#07111f',
    colorTextBase: '#f8fafc',
    borderRadius: 14,
    fontFamily: "'Manrope', system-ui, sans-serif",
  },
  components: {
    Button: { controlHeight: 46, fontWeight: 700 },
    Modal: { contentBg: '#0b1728', headerBg: '#0b1728' },
    Drawer: { colorBgElevated: '#07111f' },
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider locale={esES} theme={brandTheme}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
