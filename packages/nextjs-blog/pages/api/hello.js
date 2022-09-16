
//req接收请求信息, res返回信息
export default (req, res) => {
  res.status(200).json({ test: 'hello' })
}