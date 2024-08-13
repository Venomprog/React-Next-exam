import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {

  console.log('from Doc')
  return (
    <Html lang="en">
      <Head />
      <body>
        <div>From Doc</div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}