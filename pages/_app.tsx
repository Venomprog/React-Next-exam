import '../styles/globals.css'
import '../styles/todosList.scss'
import type { AppProps } from 'next/app'
import { StoreProvider } from './StoreProvider'
import AppHeader from '../components/appHeader/appHeader'
import Router from 'next/router'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {

  console.log('from app')

  const router = useRouter();

  

  useEffect(() => {
    const {pathname} = Router
    console.log(pathname)
    if(router.asPath == '/todos/1/1' ){
        Router.push('/')
    }
  });

  return (
    <StoreProvider>
      <AppHeader/>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
