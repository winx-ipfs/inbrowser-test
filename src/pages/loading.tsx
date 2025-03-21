/**
 * Loading page to display after clicking "Load content" button
 */

import React, { type ReactElement } from 'react'
import Header from '../components/Header.jsx'
import './loading.css'

export default function LoadingPage (): ReactElement {
  return (
    <>
    <Header />
    <div className="loading-page pa4-l mw7 mv5 center pa4">
      <h1 className="pa0 f3 ma0 teal tc">正在装载…</h1>
      <p className="mb5">Worker已初始化，正在尝试从IPFS检索内容，请稍候。</p>
      <div className="loading-animation"></div>
    </div>
    </>
  )
}
