import React,{ useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDark } from '../hooks'


const CORE_LINKS = [
  { to:'/core/props', title: 'props'},
  { to:'/core/state', title: 'state'},
  { to:'/core/event', title: 'event'},
  { to:'/core/condition', title: 'condition'},
  { to:'/core/list', title: 'list'},
  { to:'/core/form', title: 'form'},
  { to:'/core/lifting', title: 'lifting'},
  { to:'/core/composition', title: 'composition'},
  { to:'/core/thinking', title: 'thinking'},
]

const GRAPHQL_LINKS = [
  { to:'/graphql/query', title: 'query'},
]

function Index() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const { isDark, toggleDark } = useDark()
  const go = () => {
    if(value)
      navigate(`/hello/${encodeURIComponent(value)}`)
  }
  return (
      <main className=''>
        <WrapContainer title='Core'>
          {
            CORE_LINKS.map(({ to, title }) => (
              <Link key={to} to={to} className='btn underline-transparent'>{title}</Link>
            ))
          }
        </WrapContainer>

        <WrapContainer title='Graphql'>
         {
            GRAPHQL_LINKS.map(({ to, title }) => (
              <Link key={to} to={to} className='btn underline-transparent'>{title}</Link>
            ))
         }
        </WrapContainer>

      </main>
  )
}

type WrapProps = {
  className?: string
  title?: string
  children?: React.ReactNode
}

function WrapContainer(props: WrapProps) {
  const { 
      className, 
      title = '这人很懒,标题都不设置(*￣rǒ￣)',
      children } = props
  return (
    <section className={`wrapContainer ${className}`}>
      <h2>{title}</h2>
      <div className='my-6 grid gap-3 grid-cols-3 text-center'>
        { children }
      </div>
    </section>
  )
}


export default Index