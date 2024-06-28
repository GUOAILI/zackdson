import React from "react";
import {
  createBrowserRouter,
  // createHashRouter,
  RouterProvider
} from 'react-router-dom';
import HomePage,{loader as HomeLoader} from './pages/Home';
import Nav,{loader as NavLoader} from './pages/Nav';
import SubjectLayout from "./pages/SubjectBook";
import EmptyLayout from "./pages/EmptyPage";
import SubjectManagement,{ action as subjectAction} from "./pages/SubjectManagement";
// import SubjectManagement,{loader as subjectLoader, action as subjectAction} from "./pages/SubjectManagement";
import SubjectTestLayout from "./pages/SubjectTest";
import SubjectBookLayout from "./pages/SubjectBook";
import SubjectExtLayout from "./pages/SubjectExt";
import SubjectWritingLayout,{action as SubWritingAction} from "./pages/SubjectWriting";
import SubjectWrongLayout from "./pages/SubjectWrong";
import SubjectReviewLayout from "./pages/SubjectReview";
import DemoLayout from "./FileOrImage/Demo";
import DemoLayout002 from "./FileOrImage/Demo_002";
import DemoLayout003 from "./FileOrImage/Demo_003";
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
// import GradeManagement,{loader as gradeLoader,action as gradeAction} from "./pages/GradeManagement";

const router = createBrowserRouter([
  {
    path: '/',
      element: <HomePage />,
      // errorElement: <ErrorPage />,
      id: 'home',
      loader: HomeLoader,
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
     ],
}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
