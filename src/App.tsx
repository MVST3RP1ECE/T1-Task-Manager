import TaskList from './components/ReactComponents/Task/TaskList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TaskDetails from './routes/task/TaskDetails';
import ErrorPage from './routes/error/ErrorPage';
import type { TContext, TContextArray } from './types';
import { createContext } from 'react';

const testData: TContextArray = [{
  id: `${Date.now()}_${Math.random()}`,
  header: "Test header",
  description: "Test description",
  priority: "High",
  category: "Bug",
  status: "To Do"
}];

export const Context = createContext<TContextArray>(testData);

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
    <Context.Provider value={testData}>
      <RouterProvider router={router} />
    </Context.Provider>
  )
}

export default App
