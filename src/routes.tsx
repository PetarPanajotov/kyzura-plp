import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './Layout';
import { ProductPage } from './pages/ProductPage';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        // This handles the "First category loaded by default" requirement
        index: true, 
        element: <Navigate to="/bags" replace />, 
      },
      {
        path: ":category", 
        element: <ProductPage />,
      },
    ],
  },
]);