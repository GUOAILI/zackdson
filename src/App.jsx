import React from "react";
import {
  createBrowserRouter,
  // createHashRouter,
  RouterProvider
} from 'react-router-dom';
import HomePage,{loader as HomeLoader} from './pages/Home';
import Nav,{loader as NavLoader} from './pages/Nav';
import EmptyLayout from "./pages/EmptyPage";
import SubjectManagement,{ action as subjectAction} from "./pages/SubjectManagement";
// import SubjectManagement,{loader as subjectLoader, action as subjectAction} from "./pages/SubjectManagement";
// import SubjectExtLayout from "./pages/SubjectExt";
import WritingForm from "./form/WritingForm";
import WritingList from "./form/WritingList";
import WritingShow from "./form/WritingShow";
import NotebookForm from "./form/NotebookForm";
import NotebookShow from "./form/NotebookShow";
import NotebookList from "./form/NotebookList";
import ExamForm from "./form/ExamForm";
import ExamList from "./form/ExamList";
import ExamShow from "./form/ExamShow";
import ReviewForm from "./form/ReviewForm";
import ReviewList from "./form/ReviewList";
import ReviewShow from "./form/ReviewShow";
import WrongForm from "./form/WrongForm";
import WrongShow from "./form/WrongShow";
import WrongList from "./form/WrongList";
import LoginForm from "./pages/Login";
import { tokenLoader } from "./util/authentication";
import LogoutPage,{loader as logoutLoader} from "./pages/Logout";
import ExtensionForm from "./form/ExtensionForm";
import ExtensionShow from "./form/ExtensionShow";
import ExtensionList from "./form/ExtensionList";
import WritingEdit from "./edit_page/WritingEdit";
import NotebookEdit from "./edit_page/NotebookEdit";
import ReviewEdit from "./edit_page/ReviewEdit";
import WrongEdit from "./edit_page/WrongEdit";
import ExamEdit from "./edit_page/ExamEdit";
import ExtensionEdit from "./edit_page/ExtensionEdit";
import SubjectEdit from "./pages/SubjectEdit";
import SerializePage from "./pages/SerializePage";
import DeserializePage from "./pages/DeserializePage";
import RichText from "./component/RichText";
// import GradeManagement,{loader as gradeLoader,action as gradeAction} from "./pages/GradeManagement";

const router = createBrowserRouter([
  {
    path: '/',
      element: <LoginForm />,
      // errorElement: <ErrorPage />,
      id: 'login',
      // loader: HomeLoader,
    },
  {
    path: '/home',
      element: <HomePage />,
      // errorElement: <ErrorPage />,
      id: 'home',
      loader: HomeLoader,
  },
  {
    path: '/logout',
      element: <LogoutPage />,
      // errorElement: <ErrorPage />,
      id: 'logout',
      loader: logoutLoader,
  },
  {
      path: '/nav',
      element: <Nav />,
      id: 'navigation',
      loader: NavLoader,
      children: [
        { path: '/nav/manage', 
          element: <SubjectManagement />,
          // loader: subjectLoader,
          action: subjectAction
        },
            // 临时测试用
      // { path: '/nav/branch2', element: <SubjectExtLayout /> },
      { path: '/nav/empty', 
        element: <EmptyLayout />,
        // loader: tokenLoader,
       },
      { path: '/nav/writing/list', 
        element: <WritingList />,
      },
      { path: '/nav/writing/input', 
        element: <WritingForm />,
      },
      { path: '/nav/writing/detail', 
        element: <WritingShow />,
      },
      // 2024/6/21 to implement the notebook part
      { path: '/nav/notebook/list', 
        element: <NotebookList />,
      },
      { path: '/nav/notebook/input', 
        element: <NotebookForm />,
      },
      { path: '/nav/notebook/detail', 
        element: <NotebookShow />,
      },
      // 2024/6/25 to implement the exam part
      { path: '/nav/exam/list', 
        element: <ExamList />,
      },
      { path: '/nav/exam/input', 
        element: <ExamForm />,
      },
      { path: '/nav/exam/detail', 
        element: <ExamShow />,
      },
      // 2024/6/26 add
      { path: '/nav/review/list', 
        element: <ReviewList />,
      },
      { path: '/nav/review/input', 
        element: <ReviewForm />,
      },
      { path: '/nav/review/detail', 
        element: <ReviewShow />,
      },
      // 2024/6/29 add
      { path: '/nav/wrong/list', 
        element: <WrongList />,
      },
      { path: '/nav/wrong/input', 
        element: <WrongForm />,
      },
      { path: '/nav/wrong/detail', 
        element: <WrongShow />,
      },
      { path: '/nav/extension/list', 
        element: <ExtensionList />,
      },
      { path: '/nav/extension/input', 
        element: <ExtensionForm />,
      },
      { path: '/nav/extension/detail', 
        element: <ExtensionShow />,
      },
      // 2024/7/1 add edit implementation
      { path: '/nav/writing/edit', 
        element: <WritingEdit />,
      },
      { path: '/nav/notebook/edit', 
        element: <NotebookEdit />,
      },
      { path: '/nav/extension/edit', 
        element: <ExtensionEdit />,
      },
      { path: '/nav/review/edit', 
        element: <ReviewEdit />,
      },
      { path: '/nav/wrong/edit', 
        element: <WrongEdit />,
      },
      { path: '/nav/exam/edit', 
        element: <ExamEdit />,
      },
      // 2024/7/2 add
      { path: '/nav/subject', 
        element: <SubjectEdit />,
      },
      { path: '/nav/serialize', 
        element: <SerializePage />,
      },
      { path: '/nav/deserialize', 
        element: <DeserializePage />,
      },
      { path: '/nav/richtext', 
        element: <RichText />,
      },
     ],
}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
