import logo from './img/logo.svg';
import { Link } from "react-router-dom";
import { cyan } from '@mui/material/colors';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <img src={logo} alt="logo" width="40"/>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/newPost">New Post</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;