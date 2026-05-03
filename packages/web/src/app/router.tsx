import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { App } from './app'

const router = createBrowserRouter([
  { path: '/', element: <App lang="ro" /> },
  { path: '/ru', element: <App lang="ru" /> },
  { path: '/en', element: <App lang="en" /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
