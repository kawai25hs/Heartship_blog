import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import Posts from './Posts';
import NewPost from './NewPost';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blog" element={<Posts />} />
          <Route path="newPost" element={<NewPost />} />
        </Routes>
        <Footer/>
      </div>         
    </div>
  );
}

export default App;