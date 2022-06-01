import React,{ useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDark } from '../hooks'

function Index() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const { isDark, toggleDark } = useDark()
  const go = () => {
    if(value)
      navigate(`/hello/${encodeURIComponent(value)}`)
  }
  return (
    <div className='text-center'>
      <div className='text-center py-6 flex justify-center'>
        <div onClick={toggleDark}>
          {
            isDark 
            ?  <span className='i-carbon-moon text-gray-200' ></span>
            :  <span className='i-carbon-sun' ></span>
          }
        </div>
        <a href='https://github.com/tisou1/react-lite' target='_blank'>
          <span className='i-carbon-logo-github ml-3'></span>
        </a>
      </div>


      <section className='flex gap-3'>
        <Link to="/props" className='btn underline-transparent'>props</Link>
        <Link to="/state" className='btn underline-transparent'>state</Link>
      </section>
    </div>
  )
}

export default Index