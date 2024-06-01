export const getServerSideProps = (async (ctx : any) => {
  const title = ctx.query.title? ctx.query.title : null;

  // Fetch data from external API

  // Pass data to the page via props
  return { props: { title} }
}) 


export default function Page({title}) {
  return (
    <div>
      <p>Its Post page: {title}</p>
    </div>
  )
}