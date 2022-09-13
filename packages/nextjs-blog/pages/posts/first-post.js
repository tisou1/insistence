import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script'

import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <Layout>

      <Head>
        <title>Next.js Blog Example with React</title>
      </Head>

      <Script
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy="lazyOnload"
          onLoad={() =>
            console.log(`script loaded correctly, window.FB has been populated`)
          }
        />

      <h2>
        {/* <Link href="/"> back to Home</Link> */}

        {/* 想要添加类名 */}
        <Link href="/">
          <a className="foo" rel="noopener noreferrer">
            Hello World
          </a>
        </Link>

        <Image src='/images/facebook.jpeg' alt='谢霆锋' width={200} height={180} />
      </h2>
    </Layout>
  )
}
