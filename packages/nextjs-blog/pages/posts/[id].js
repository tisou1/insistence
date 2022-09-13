import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
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
  }
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

