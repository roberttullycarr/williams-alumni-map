// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: trade-gothic-next, sans-serif;
    font-weight: 400;
    font-style: normal;
    padding: 0;
    margin: 0;
  }
  
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
  
  #__next {
    height: 100vh;
  }
  

`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
