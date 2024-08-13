import type { NextPage } from 'next'
import FiltersList from '@components/FilterList/FiltersList'
import TodosList from '@components/TodosList/TodosList'

const Home: NextPage = () => {
  return (
    <div className="main-container">
      <FiltersList></FiltersList>
      <TodosList></TodosList>
    </div>
  )
}

export default Home
