import type { NextPage } from 'next'
import TodosList from '../components/TodosList/TodosList'
import FiltersList from '../components/FilterList/FiltersList'

const Home: NextPage = () => {
  return (
    <div className="main-container">
      <FiltersList></FiltersList>
      <TodosList></TodosList>
    </div>
  )
}

export default Home
