import type { InferGetServerSidePropsType, GetServerSideProps, GetStaticProps } from 'next'
import { useEffect } from 'react';
import Link from 'next/link';

 
export const getServerSideProps = (async (ctx : any) => {
  var userId = ctx.query.userId;
  const title = ctx.query.title;
  const id = ctx.query.id

  const res = await fetch("https://jsonplaceholder.typicode.com/users/" + userId);
  const resPosts = await fetch("https://jsonplaceholder.typicode.com/posts");

  const data = await res.json()
  const dataPosts = await resPosts.json()
  // Fetch data from external API

  // Pass data to the page via props
  return { props: { data, title, dataPosts, id } }
}) 




const Page = ({data, title, dataPosts, id}) => {  

  const todosId = id
  function renderPosts (arr) {

  const newArr = arr.slice(0, 5);

    return newArr.map(({title, id}) => {
      return (
        <Link key={id}  href={{
          pathname: `/todos/todos-${todosId}/post-${id}`,
          query: {
            title
          }
        }}>
          <div  className='detail-page__posts-item'>
            {title}
          </div>
        </Link>

      )
    })
  }

  const posts = renderPosts(dataPosts)


  return (
    <main>
      <div className='main-container'>
        <div className='detail-page'>
          <div className='detail-page__user'>
            <div className='detail-page__user-name'>
              User name: {data.name}
            </div>
            <div className='detail-page__user-task'>
              Task name: {title}
            </div>
          </div>
          <div className='detail-page__posts'>
            <h3 className='detail-page__posts-title'>Posts:</h3>
            <div className='detail-page__posts-list'>
              {posts}
            </div>
          </div>
        </div>
      </div>
    </main>
  )

} 

export default Page