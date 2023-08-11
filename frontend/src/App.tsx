import GitHubUsers from '../components/GitHubUsers';
import UserDetail from '../components/UserDetail';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: GitHubUsers,
  },
  {
    path:"/user/:username",
    Component: UserDetail,
  },
])

function App() {
  return (
    <div className="w-full h-max dark:bg-slate-800 text-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
