import { RouterProvider } from 'react-router-dom'
import { router } from './router'

/**
 * Основной компонент приложения
 * @returns 
 */
function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
