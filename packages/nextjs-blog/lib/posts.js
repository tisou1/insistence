import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import html from 'remark-html'
import { remark } from 'remark'


//process.cwd() 返回node.js进程的当前工作目录
const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  //获取posts文件夹中的md文件名称

  //同步读取
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    //去除.md后缀
    const id = fileName.replace(/\.md$/,'')

    //读取md文件
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    //使用gray-matter读取md文件的元数据
    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data
    }
  })

  return allPostsData.sort(({date: a}, { date: b}) => {
    if(a < b) {
      return 1
    } else if(a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContext = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContext)

  //使用remark解析md文件
  const processedContent = await remark()
      .use(html)
      .process(matterResult.content)

  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}