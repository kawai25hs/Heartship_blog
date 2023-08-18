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
import NotFound from './NotFound';

//layout
import Root from './layout/Root';
import PostError from './PostError';

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
        <Route path="newPost" element={<NewPost />} />
        <Route
          element={<Post />}
          path="post/:Id"
          loader={postLoader}
          errorElement={<PostError/>}
        />
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
