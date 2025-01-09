import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import store from "./app/store.js";
import { Provider } from "react-redux";

import ErrorPage from "./components/ui-components/ErrorPage.jsx";
import MainView from "./components/mainview/MainView.jsx";
import Overview from "./routes/Overview.jsx";
import Notes from "./routes/notes/Notes.jsx";
import ListView from "./routes/listview/ListView.jsx";
import AllProjects from "./routes/AllProjects.jsx";
import AllMembers from "./routes/AllMembers.jsx";
import Board from "./components/mainview/board/Board.jsx";
import EditCard from "./components/mainview/board/list/card/EditCard.jsx";
import Analytics from "./routes/Analytics.jsx";
import Faq from "./routes/faqs/Faq.jsx";
import Chat from "./routes/Chat.jsx";
import Time from "./routes/Time.jsx";
import DndBoard from "./routes/dndTest/DndBoard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainView />,
        children: [
          {
            path: "/",
            element: <Navigate to="/project/1/tasks" replace />,
          },
          {
            path: "project/:boardId/overview",
            element: <Overview />,
          },
          {
            path: "project/:boardId/tasks",
            element: <Board />,
          },
          {
            path: "project/:boardId/notes",
            element: <Notes />,
          },
          {
            path: "project/:boardId/tasks/listview",
            element: <ListView />,
          },
          {
            path: "/projects",
            element: <AllProjects />,
          },
          {
            path: "/time",
            element: <Time />,
          },
          {
            path: "/members",
            element: <AllMembers />,
          },
          {
            path: "/chat",
            element: <Chat />,
          },
          {
            path: "/faq",
            element: <Faq />,
          },
          {
            path: "/stats",
            element: <Analytics />,
          },
          {
            path: "/dnd/:boardId",
            element: <DndBoard />,
          },
          {
            path: "project/:boardId/tasks/:cardId",
            element: <EditCard />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);