import TaskList from './components/ReactComponents/Task/TaskList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TaskDetails from './routes/task/TaskDetails';
import ErrorPage from './routes/error/ErrorPage';
import type { TAction, TContextArray, TState } from './types';
import React, { createContext, useReducer } from 'react';
import generateTaskName from './utils/generateTaskName.ts';
import { taskReducer } from './utils/taskReducer.tsx';
import TaskEdit from './routes/edit/TaskEdit.tsx';

const { taskName, number } = generateTaskName();

const testData: TContextArray = [
  {
    id: `${number}`,
    header: `${taskName}`,
    description: "Срочно чиним баги. jghbfkgskbghnjsfdghbsfdcgbnhcfdsgbnhcfdsbgnhjcfdsjghnbfdcsgkcfsl;kdjfvhbsdkjhgfvdskfjgh",
    priority: "High",
    category: "Bug",
    status: "To Do"
  },
  {
    id: `${number}`,
    header: `${taskName}`,
    description: "Дописал документацию. hgkjghksdfnghnscgfhenghfcsdgnfhcsdkgfhncds",
    priority: "Medium",
    category: "Documentation",
    status: "In Progress"
  },
  {
    id: `${number}`,
    header: `${taskName}`,
    description: "Срочно чиним баги. jghbfkgskbghnjsfdghbsfdcgbnhcfdsgbnhcfdsbgnhjcfdsjghnbfdcsgkcfsl;kdjfvhbsdkjhgfvdskfjgh",
    priority: "High",
    category: "Bug",
    status: "To Do"
  },
  {
    id: `${number}`,
    header: `${taskName}`,
    description: "Дописал документацию. hgkjghksdfnghnscgfhenghfcsdgnfhcsdkgfhncds",
    priority: "Medium",
    category: "Documentation",
    status: "In Progress"
  },
  {
    id: `${number}`,
    header: `${taskName}`,
    description: "Начал делать тесты",
    priority: "Low",
    category: "Test",
    status: "In Progress"
  },
  {
    id: `${number}`,
    header: `${taskName}`,
    description: "Доделал фичу.gbfcdhbgjcdfhsjbhkcfgdsbjkghcfdbjghcfdjgbhncjghbncjhgcngbfcdhbgjcdfhsjbhkcfgdsbjkghcfdbjghcfdjgbhncjghbncjhgcngbfcdhbgjcdfhsjbhkcfgdsbjkghcfdbjghcfdjgbhncjghbncjhgcngbfcdhbgjcdfhsjbhkcfgdsbjkghcfdbjghcfdjgbhncjghbncjhgcn12345678901234567",
    priority: "Medium",
    category: "Feature",
    status: "Done"
  },
];

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
  }, {
    path: "/task/:id/edit",
    element: <TaskEdit />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const [state, dispatch] = useReducer(taskReducer, [])

  return (

    // Просмотр с мок-данными ->
    <Context.Provider value={{ state: testData, dispatch }}>
      <RouterProvider router={router} />
    </Context.Provider>




    // <Context.Provider value={{ state, dispatch }}>
    //   <RouterProvider router={router} />
    // </Context.Provider>
  )
}

export default App
