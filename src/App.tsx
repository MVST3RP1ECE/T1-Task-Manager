import TaskList from './components/ReactComponents/Task/TaskList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TaskDetails from './routes/task/TaskDetails';
import ErrorPage from './routes/error/ErrorPage';
import type { TAction, TContext, TContextArray, TState } from './types';
import React, { createContext } from 'react';
import generateTaskName from './utils/generateTaskName.ts';

const { taskName, number } = generateTaskName();

const testData: TContextArray = [{
  id: `${number}`,
  header: `${taskName}`,
  description: "Test description",
  priority: "High",
  category: "Bug",
  status: "To Do"
}];

// export const Context = createContext<TContextArray>(testData);
export const Context = createContext<{
  state: TState;
  dispatch: React.Dispatch<TAction>;
}>({ state: testData, dispatch: () => { } })

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
    <Context.Provider value={{ state: testData, dispatch: () => { } }}>
      <RouterProvider router={router} />
    </Context.Provider>
  )
}

export default App
