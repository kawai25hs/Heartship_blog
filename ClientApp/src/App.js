import { 
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider

} from "react-router-dom";

import Home from './Home';
import Blog from './Blog';
import NewPost from './NewPost';
import Post from './Post';
import NotFound from './NotFound';

//layout
import Root from './layout/Root';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="blog" element={<Blog />} />
      <Route path="newPost" element={<NewPost />} />
      <Route
        element={<Post />}
        path="post/:Id"
        loader={async ({ params }) => {
          return fetch(
              `/posts/${params.Id}`
          );
        }}
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
