import { CID } from 'multiformats/cid'
import React, { type ReactElement } from 'react'
import { nativeProtocolRegex, pathRegex, subdomainRegex, type IpfsUriParts } from '../lib/regex.js'

function FormatHelp (): ReactElement {
  return (
    <>
      <p>无效的地址，更正后再试一次。可供参考的格式有：</p>
      <table>
        <tbody>
          <tr>
            <td>类unix内容路径</td>
            <td><pre className="di pl3">/ipfs/cid/..</pre></td>
          </tr>
          <tr>
            <td>HTTP在线网关</td>
            <td><pre className="di pl3">https://ipfs.io/ipfs/cid..</pre></td>
          </tr>
          <tr>
            <td>本地地址</td>
            <td><pre className="di pl3">ipfs://cid/..</pre></td>
          </tr>
        </tbody>
      </table>
      <p>欲知详情，请浏览<a target="_blank" href="https://docs.ipfs.tech/how-to/address-ipfs-on-web">在Web上IPFS的</a></p>
    </>
  )
}

function ValidationMessage ({ cidOrPeerIdOrDnslink, requestPath, protocol, children }): ReactElement {
  let errorElement: ReactElement | null = null
  if (requestPath == null || requestPath === '') {
    errorElement = <span><big className="f3">↑</big>请输入有效的IPFS/IPNS内容路径。</span>
  } else if (protocol !== 'ipfs' && protocol !== 'ipns') {
    errorElement = <FormatHelp />
  } else if (cidOrPeerIdOrDnslink == null || cidOrPeerIdOrDnslink === '') {
    const contentType = protocol === 'ipfs' ? 'CID' : 'PeerID or DNSLink'
    errorElement = <span>缺少内容标识符。添加一个{contentType} 到你的路径上</span>
  } else if (protocol === 'ipfs') {
    try {
      CID.parse(cidOrPeerIdOrDnslink)
    } catch {
      errorElement = <span>无效的CID</span>
    }
  }

  if (errorElement == null) {
    return <>{ children }</>
  }

  return <>
    <span className="pb3 pa3 db bg-light-yellow">
      { errorElement }
    </span>
  </>
}

const parseInput = (uri: string): Partial<IpfsUriParts> => {
  const uriMatch = uri.match(pathRegex) ?? uri.match(subdomainRegex) ?? uri.match(nativeProtocolRegex)
  if (uriMatch?.groups != null) {
    const { protocol, cidOrPeerIdOrDnslink, path } = uriMatch.groups as unknown as IpfsUriParts
    return { protocol, cidOrPeerIdOrDnslink, path: path?.trim() ?? undefined }
  }

  // it may be just a CID
  try {
    CID.parse(uri)
    return { protocol: 'ipfs', cidOrPeerIdOrDnslink: uri }
  } catch (_) {
    // ignore.
  }

  return {}
}

export default function InputValidator ({ requestPath }: { requestPath: string }): ReactElement {
  const { protocol, cidOrPeerIdOrDnslink, path } = parseInput(requestPath)
  const swPath = `/${protocol}/${cidOrPeerIdOrDnslink}${path ?? ''}`

  return (
    <div>
      <ValidationMessage protocol={protocol} cidOrPeerIdOrDnslink={cidOrPeerIdOrDnslink} requestPath={requestPath}>
        <a className="db" href={swPath}>
          <button id="load-directly" className='button-reset pv3 tc bn bg-animate bg-teal-muted hover-bg-navy-muted white pointer f4 w-100'>是时候了,现在开始！</button>
        </a>
      </ValidationMessage>
    </div>
  )
}
