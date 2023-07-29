import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import Blog from './Blog';
import NewPost from './NewPost';
import Post from './Post';
import Footer from './Footer';
import NotFound from './NotFound';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
        <Footer/>
      </div>         
    </div>
  );
}

export default App;
