import { 
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider

} from "react-router-dom";

import Home from './Home';
import Blog from './Blog';
import NewPost from './NewPost';
import Post, { postLoader } from './Post';
import NotFound from './NotFound';

//layout
import Root from './layout/Root';
import PostError from './PostError';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="blog" element={<Blog />}
        loader={async () => {
          return fetch(
              `/posts`
          );
        }}
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
