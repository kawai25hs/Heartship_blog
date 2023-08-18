import homepageImg from './img/homepageImg.jpg';
import me from './img/me.jpg';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const featuredPosts = useLoaderData()
    let navigate = useNavigate();

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

                <Grid container className="featuredPosts" spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }} sx={{ alignItems: 'center' }}>
                    {featuredPosts.map((post) => (
                        <Grid item xs={6} md={4} onClick={() => navigate(`/post/${post?.id}`)} sx={{ cursor: 'pointer' }}>
                            <Box
                                component="img"
                                sx={{
                                borderRadius: 0
                                }}
                                src={post?.thumbnail}
                            />
                            <h3>{post?.subject}</h3>
                            <p className='greywords'>
                                {post?.description}
                            </p>                        
                        </Grid>
                    ))}
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
                        <h3>Ka Wai Cheung</h3>
                        <br/>
                        <p>
                            I am no longer a perfectionist. <br /><br />
                            I learn things that interest me and also build things that interest you.
                            After many years of struggling, I still do not give up on software engineering.
                            I hope I can brainstorm ideas in this blog and it is also useful to you.
                        </p>
                    </Grid>
                </Grid>
            </Grid>
        </div>
     );
}

export const homeLoader = async () => {
    const res = await fetch('/posts/GetFeaturedPost')

    if (!res.ok) {
        throw Error('Could not find featured posts.')
    }

    return res.json()
}