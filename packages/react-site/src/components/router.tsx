import React, { useEffect, useState } from "react";

export interface RouterOptions  {
  path: string
  component: React.ReactNode
}


export default function Router({ routes }:{routes: RouterOptions[]}) {
  //存储当前 url path
    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    useEffect(() => {
      const locationChange = () => {

        setCurrentPath(window.location.pathname)
      }

      window.addEventListener('popstate', locationChange)

      return () => window.removeEventListener('popstate', locationChange)
    },[])

    //返回匹配的路径
    return routes.find(({ path }: RouterOptions ) => path === currentPath)?.component
}


export function navigate(href: string) {
  //用pushState直接刷新url,而不触发真正的浏览器跳转
  window.history.pushState({}, "", href)

  //手动触发一次popstatee,让Router组件监听并触发locationChange回调
  const navEvent = new PopStateEvent('popstate')
  window.dispatchEvent(navEvent)
}

export interface LinkOptions {
  className?: string
  href: string
  children: React.ReactNode
}


export function Link ({ className, href, children }: LinkOptions) {
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    // mac 的 meta or windows 的 ctrl 都会打开新 tab
    // 所以此时不做定制处理，直接 return 用原生行为即可
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    // 否则禁用原生跳转
    event.preventDefault();

    // 做一次单页跳转
    navigate(href)
  };

  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  );
};
