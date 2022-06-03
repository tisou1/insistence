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
      <section className='grid gap-3 grid-cols-3 text-center'>
        <Link to="/props" className='btn underline-transparent'>props</Link>
        <Link to="/state" className='btn underline-transparent'>state</Link>
        <Link to="/event" className='btn underline-transparent'>event</Link>
        <Link to="/condition" className='btn underline-transparent'>condition</Link>
        <Link to="/list" className='btn underline-transparent'>list</Link>
        <Link to="/form" className='btn underline-transparent'>form</Link>
        <Link to="/lifting" className='btn underline-transparent'>Lifting</Link>
        <Link to="/composition" className='btn underline-transparent'>composition</Link>
        <Link to="/thinking" className='btn underline-transparent'>thinking</Link>
        <Link to="/graphql" className='btn underline-transparent'>graphql</Link>


      </section>
  )
}

export default Index