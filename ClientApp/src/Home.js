import homepageImg from './img/homepageImg.jpg';
import me from './img/me.jpg';
import img1 from './img/img1.jpg';
import img2 from './img/img2.jpg';
import img3 from './img/img3.jpg';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const Home = () => {
    return ( 
        <div className="home">
            <Grid container className="homepageHeader">
                <img src={homepageImg} alt="Background" />
                <Grid container item xs={12} className="headerContent">
                    <Grid item xs={12}>
                        <p>Everyday is a new start.</p>
                    </Grid>
                    <Grid item xs={12} className="homepageHeaderBtnContainer" >
                        <Link to="/blog" className="homepageHeaderBtn">Read posts</Link>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container className="container">
                <Grid item xs={12}> 
                    <h1 className="featuredPostsHDR">Featured posts</h1>
                </Grid>

                <Grid container className="featuredPosts" spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Box
                            component="img"
                            sx={{
                            borderRadius: 0
                            }}
                            alt="me"
                            src={img1}
                        />
                        <h3>To me and everyone</h3>
                        <p className='greywords'>
                            Right off the bat, when people land on your site, 
                            you want them to understand who you are, what you do, 
                            and what you’re looking for.
                        </p>                        
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Box
                            component="img"
                            sx={{
                            borderRadius: 0
                            }}
                            alt="me"
                            src={img2}
                        />
                        <h3>To me and everyone</h3>
                        <p className='greywords'>
                            Right off the bat, when people land on your site, 
                            you want them to understand who you are, what you do, 
                            and what you’re looking for.
                        </p>                        
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Box
                            component="img"
                            sx={{
                            borderRadius: 0
                            }}
                            alt="me"
                            src={img3}
                        />
                        <h3>To me and everyone</h3>
                        <p className='greywords'>
                            Right off the bat, when people land on your site, 
                            you want them to understand who you are, what you do, 
                            and what you’re looking for.
                        </p>                        
                    </Grid>
                </Grid>

                <Grid item xs={12}> 
                    <h1 className="aboutMeHDR">About Me</h1>
                </Grid>

                <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }} className='aboutMeContent'>
                    <Grid item xs={6} sm={5} md={3}>
                        <Box
                            component="img"
                            sx={{
                            borderRadius: 3
                            }}
                            alt="me"
                            src={me}
                        />
                    </Grid>
                    <Grid item xs={6} sm={7} md={6}>
                        <h3>Elvis Cheung</h3>
                        <br/>
                        <p>
                            I am a developer and perfectionist. <br/>
                            I learn things that interest me and also build things that interest you. 
                        </p>
                    </Grid>
                </Grid>
            </Grid>
        </div>
     );
}
 
export default Home;