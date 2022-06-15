

export default function myPlugin(){
  return {
    name: 'myPlugin',
    enforce: 'pre',
    transform: (src: any, id: any) => {
      if(id.includes('basic/main.ts')) {
        console.log(typeof src)
        // return src.replace(pat, '')
      }
      console.log( id)
    }
  }
}