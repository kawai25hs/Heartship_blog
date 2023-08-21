import { 
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";

import Home, {homeLoader} from './Home';
import Blog, { blogLoader } from './Blog';
import NewPost from './NewPost';
import Post, { postLoader } from './Post';
import PostError from './PostError';
import Login from "./Login";
// import Register from "./Register";
import NotFound from './NotFound';
import RequireAuth from './components/RequireAuth';

//layout
import Root from './layout/Root';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route
          index
          element={<Home />}
          loader={homeLoader}
        />
        <Route path="blog" element={<Blog />}
          loader={blogLoader}
        />
        <Route path="newPost" element={<RequireAuth><NewPost /></RequireAuth>} />
        <Route
          element={<Post />}
          path="post/:Id"
          loader={postLoader}
          errorElement={<PostError/>}
        />
        <Route path="Login" element={<Login />} />
        {/* <Route path="Register" element={<Register />} /> */}
        <Route path='*' element={<NotFound />} />
      </Route>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
