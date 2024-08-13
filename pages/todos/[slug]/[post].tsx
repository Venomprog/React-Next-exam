import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IPost, IPosts } from '@lib/types/types';
import { GetStaticProps, GetStaticPaths } from "next";


export const getStaticPaths: GetStaticPaths = async () =>{
  const paths: any[] = []

  return ({
    paths,
    fallback: 'blocking'
  })
}





export const getStaticProps: GetStaticProps  = (async () => {

  const resPosts = await fetch("https://jsonplaceholder.typicode.com/posts");

  const dataPosts: IPost[] = await resPosts.json()
  // Fetch data from external API

  // Pass data to the page via props
  return { props: { dataPosts}, revalidate: 15 }
}) 



export default function Page({dataPosts}: IPosts) {

  interface IPostRouterQuery {
    title?: string,
    id?: number
  }

  const [post, setPost] = useState<IPost>()

  const router = useRouter()

  const {title, id}: IPostRouterQuery = router.query

  useEffect(() => {
    const newArr = dataPosts.filter(item => item.id == id);
    setPost(newArr[0]);

  }, [dataPosts])

  const content = post?.title ? post.title : title

  return (
    <div className="container">
      <p>Its Post page: {content}</p>
    </div>
  )
}