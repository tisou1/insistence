import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { ClickToComponent } from 'click-to-react-component'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import './index.css'
import 'uno.css'
import Footer from './components/footer'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

//init client
const client = new ApolloClient({
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

// client
// .query({
//   query: gql`
//   query GetRates {
//     hello
//   }
//   `
// }).then(res => console.log(res))

const root = ReactDOM.createRoot(document.querySelector('#root')!)

const App = () => {
  return (
    <Suspense fallback={<div style={{color: 'red'}}>Loading...</div>}>
      {useRoutes(routes)}
      <Footer />
    </Suspense>
  )
}

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
        {/* <ClickToComponent /> */}
      </Router>
    </ApolloProvider>
  </React.StrictMode>
)