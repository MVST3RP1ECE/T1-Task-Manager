import TaskList from '@/entities/task/ui/TaskList'
import ErrorPage from '@/pages/error/ErrorPage'
import TaskDetails from '@/pages/task-details/TaskDetails'
import TaskEdit from '@/pages/task-edit/TaskEdit'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TaskList />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/task/:id',
    element: <TaskDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/task/:id/edit',
    element: <TaskEdit />,
    errorElement: <ErrorPage />,
  },
])
