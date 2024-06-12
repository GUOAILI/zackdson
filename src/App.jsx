import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import HomePage from './pages/Home';
import Nav from './pages/Nav';
import SubjectLayout from "./pages/Subject";
import EmptyLayout from "./pages/EmptyPage";
// import SubjectManagement,{loader as subjectLoader} from "./pages/SubjectManagement";
import SubjectManagement,{loader as subjectLoader, action as subjectAction} from "./pages/SubjectManagement";

const router = createBrowserRouter([
  {
    path: '/',
      element: <HomePage />,
      // errorElement: <ErrorPage />,
      id: 'home',
    },
    {
      path: '/nav',
      element: <Nav />,
      id: 'navigation',
      children: [
      { path: '/nav/branch', element: <SubjectLayout /> },
      { path: '/nav/empty', element: <EmptyLayout /> },
      { path: '/nav/manage', 
        element: <SubjectManagement />,
        loader: subjectLoader,
        action: subjectAction
      },
      // { path: '/review', 
      //     element: <Review />,
      //     loader:reviewLoader,
      //     action:reviewAction,
      //     children:[
      //   {
      //     path: "contacts/:contactId",
      //     element: <Contact />,
      //     loader: contactLoader,
      //   },
      //   {
      //     path: "contacts/:contactId/edit",
      //     element: <EditContact/>,
      //     action: editAction,
      //     loader: contactLoader,
      //   },
      //   {
      //     path: "contacts/:contactId/destroy",
      //     action: delAction,
      //     // loader: contactLoader,
      //   },
      // ] },
      // {
      //   path: 'logout',
      //   // element: <Logout />,
      //   action: logoutAction,
      // },
     ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;