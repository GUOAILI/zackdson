
import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import HomePage from './pages/Home';
import Nav,{loader as NavLoader} from './pages/Nav';
import SubjectLayout from "./pages/SubjectBook";
import EmptyLayout from "./pages/EmptyPage";
// import SubjectManagement,{loader as subjectLoader} from "./pages/SubjectManagement";
import SubjectManagement,{loader as subjectLoader, action as subjectAction} from "./pages/SubjectManagement";
import SubjectTestLayout from "./pages/SubjectTest";
import SubjectBookLayout from "./pages/SubjectBook";
import SubjectExtLayout from "./pages/SubjectExt";
import SubjectWritingLayout,{action as SubWritingAction} from "./pages/SubjectWriting";
import SubjectWrongLayout from "./pages/SubjectWrong";
import SubjectReviewLayout from "./pages/SubjectReview";
import DemoLayout from "./FileOrImage/Demo";
import DemoLayout002 from "./FileOrImage/Demo_002";
import DemoLayout003 from "./FileOrImage/Demo_003";

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
      loader: NavLoader,
      children: [
        // 临时测试用
        { path: '/nav/demo', element: <DemoLayout /> },
        { path: '/nav/demo2', element: <DemoLayout002 /> },
        { path: '/nav/demo3', element: <DemoLayout003 /> },
        // 
        { path: '/nav/branch1', element: <SubjectBookLayout /> },
      { path: '/nav/branch2', element: <SubjectExtLayout /> },
      { path: '/nav/branch3', 
        element: <SubjectWritingLayout />,
        action: SubWritingAction,
      },
      { path: '/nav/branch4', element: <SubjectWrongLayout /> },
      { path: '/nav/branch5', element: <SubjectReviewLayout /> },
      { path: '/nav/branch6', element: <SubjectTestLayout /> },
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
