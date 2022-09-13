import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  console.log(postData.title)
  return (
    <Layout>

      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date}/>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

/**
 * 返回id的可能值数组
 * 如果一个页面使用ssg渲染, 并且使用了动态路由, 这里返回可能用到的路由参数数组
 * 会根据这个列表定义一个静态生成的路径列表。
 * 
 * 放在这里 也就是会静态生成posts下的所有id的html文件
 */
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
    //如果访问不在预渲染中的路径 直接返回404
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

