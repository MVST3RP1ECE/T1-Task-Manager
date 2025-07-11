import { createContext } from 'react'
import TaskList from './components/ReactComponents/Task/TaskList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Button } from './components/ui/button'
import TaskDetails from './routes/task/TaskDetails';
import ErrorPage from './routes/error/ErrorPage';


export const Context = createContext("");
const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/task/:id",
    element: <TaskDetails />,
    errorElement: <ErrorPage />,
  },
]);

function App() {

  return (
    <Context.Provider value='123'>
      <RouterProvider router={router} />

      {/*  Переход на React Router */}

      {/* <div className="h-screen w-screen flex flex-col box-border items-center justify-end bg-neutral-200 overflow-auto">
        <TaskList />
        <Button className='hover:cursor-pointer' variant={'outline'}> click me</Button>
      </div> */}
    </Context.Provider >
  )
}

export default App
