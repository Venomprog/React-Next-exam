import type { InferGetServerSidePropsType, GetServerSideProps, GetStaticProps, GetStaticPaths } from 'next'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IUser } from '@lib/types/types';

import { useRouter } from 'next/router';




export const getStaticPaths: GetStaticPaths = async () =>{
  const paths: any[] = []

  return ({
    paths,
    fallback: 'blocking'
  })
}

export const getStaticProps: GetStaticProps   = (async (ctx : any) => {

  // const res = await fetch("https://jsonplaceholder.typicode.com/users/" + userId);
  const resPosts = await fetch("https://jsonplaceholder.typicode.com/posts");

  // const data = await res.json()
  const dataPosts = await resPosts.json()
  // Fetch data from external API

  // Pass data to the page via props
  return { props: { dataPosts}, revalidate: 15 }
}) 




const Page = ({dataPosts}) => {  

  const router = useRouter()

  interface IUserRouterQuery {
    id?: number,
    userId?: number,
    title?: string
  }

  const {id, userId, title}: IUserRouterQuery = router.query

  const [user, setUser] = useState<IUser>()

  useEffect( () => {

    const fetchUser = async () => {


      const res = await fetch("https://jsonplaceholder.typicode.com/users/" + userId);
      const data = await res.json();

      setUser(data)
    }

    fetchUser();
  }, [])


  const todosId = id
  function renderPosts (arr) {

    const filterUserArr = arr.filter(item => item.userId == userId);

  const newArr = filterUserArr.slice(0, 5);

    return newArr.map(({title, id}) => {
      return (
        <Link key={id}  href={{
          pathname: `/todos/todos-${todosId}/post-${id}`,
          query: {
            title,
            id
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
              User name: {user?.name}
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