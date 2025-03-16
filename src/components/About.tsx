import React, { type ReactElement } from 'react'

export default function About (): ReactElement {
  return (
        <aside className='mw7 lb-snow center w-100 lh-copy pa2 e2e-section-about'>
          <h1 className='pa0 f3 ma0 mb4 teal tc'>关于IPFS网关和Service Worker</h1>
          <p>本页面在<a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API" target="_blank">Service Worker</a>中运行一个 IPFS 网关。它使用<a href="https://github.com/ipfs/helia" target="_blank">Helia</a>（JS 中的 IPFS 实现）和<a href="https://github.com/ipfs/helia-verified-fetch" target="_blank">@helia/verified-fetch</a>库（用于 IPFS 的<a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" target="_blank">Fetch API</a>）来简化直接验证检索<a href="https://docs.ipfs.tech/concepts/content-addressing/" target="_blank">内容寻址</a>数据的过程。</p>
          <p><strong>为什么？</strong>在初始页面加载时注册一个 Service Worker，然后拦截存储在IPFS 路径（如（不可变）和（可变））上的 HTTP 请求，负责 IPFS 检索、验证、UnixFS 反序列化，并将响应对象返回给浏览器。/ipfs/*/ipns/*</p>
          <p><strong>这是生产就绪吗？</strong>这个项目正在大力开发中，尚未完全符合<a href="https://specs.ipfs.tech/http-gateways/" target="_blank">IPFS 网关规范</a>. 在此<a href="https://github.com/ipfs/service-worker-gateway/milestones" target="_blank">跟踪我们的努力</a>.</p>
          <p><strong>发现了一个bug?</strong> 欢迎您通过<a href="https://github.com/ipfs/service-worker-gateway/issues/new" target="_blank">提交issue</a>的方式报告，请提供详细信息，如地址和截图。</p>
        </aside>
  )
}
