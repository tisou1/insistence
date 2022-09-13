// `pages/_app.js`
import '../styles/global.css';

// 只能在这里导入全局样式.

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}