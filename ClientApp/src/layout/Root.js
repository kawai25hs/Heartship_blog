import logo from '../img/logo.svg';
import Footer from '../Footer';
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";

export default function Root() {
    return (
        <div className="Root">
            <header>
                <nav>
                    <NavLink to="/"><img src={logo} alt="logo" width="40" /></NavLink>
                    <div className="links">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/blog">Blog</NavLink>
                        <NavLink to="/newPost">New Post</NavLink>
                    </div>
                </nav>
            </header>

            <main>
                <Outlet/>
                <Footer/>
            </main>
            <ScrollRestoration />
        </div>
    )
}

