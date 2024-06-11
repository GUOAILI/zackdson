import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import HomePage from './pages/Home';
import Nav from './pages/Nav';
import SubjectLayout from "./pages/Subject";
import EmptyLayout from "./pages/EmptyPage";
// import Review,{ loader as reviewLoader, action as reviewAction, } from "./lmj_admin/Review";
// import Contact,{ loader as contactLoader} from "./lmj_admin/Contact";
// import EditContact,{action as editAction} from "./lmj_admin/edit";

const router = createBrowserRouter([
  {
    path: '/',
      element: <HomePage />,
      // errorElement: <ErrorPage />,
      id: 'home',
    },
    {
      path: '/导航',
      element: <Nav />,
      id: 'navigation',
      children: [
      { path: '/导航/分学科', element: <SubjectLayout /> },
      { path: '/导航/空', element: <EmptyLayout /> },
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
