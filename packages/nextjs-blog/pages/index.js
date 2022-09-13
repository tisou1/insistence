import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Alert from '../components/alert';

import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  console.log(allPostsData)
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {
            allPostsData.map(({ id, date, title }) => (
              <li key={id} className={utilStyles.listItem}>
                {title}
                <br />
                {id}
                <br />
                {date}
              </li>
            ))
          }
        </ul>
      </section>

    </Layout>
  );
}

/**
 * 
 * 在生产环境下, getStaticProps只会在打包时运行一次
 * 在开发环境下, 每次请求这个页面getStaticProps都会运行一次
 */
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData
    }
  }
}