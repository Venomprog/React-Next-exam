import '../styles/globals.css'
import '../styles/todosList.scss'
import type { AppProps } from 'next/app'
import { StoreProvider } from './StoreProvider'
import AppHeader from '@components/appHeader/appHeader'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router';
import NProgress from 'nprogress'

Router.onRouteChangeStart = () => {
  console.log('change start')
  NProgress.start();
}

Router.onRouteChangeComplete = () => {
  console.log('change complete')
  NProgress.done();
}

function MyApp({ Component, pageProps }: AppProps) {

  console.log('from app')

  const router = useRouter();

  useEffect(() => {
    if(router.asPath == '/todos/1/1' ){
      router.push('/')
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
