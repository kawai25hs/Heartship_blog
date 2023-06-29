import Grid from '@mui/material/Grid';
import img1 from './img/img1.jpg';
import img2 from './img/img2.jpg';
import img3 from './img/img3.jpg';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';

const Posts = () => {
    return (
        <div className="blogWrapper">
            <Grid container className="pageHeader">
                <h1>Posts</h1>
            </Grid>
            <Grid container className="pageContainer">
                <Grid
                    container
                    spacing={{ xs: 2, md: 4, lg: 6 }}
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <Box
                            component="img"
                            sx={{
                            borderRadius: 0
                            }}
                            alt="me"
                            src={img1}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <h4>Inspirational Ideas</h4>
                        <h2>To me and everyone</h2>
                        <p className='greywords'>
                            Right off the bat, when people land on your site, 
                            you want them to understand who you are, what you do, 
                            and what you’re looking for.
                        </p>
                        <br/>
                        <h5>
                            Written by Elvis
                        </h5>
                    </Grid>
                    <Grid item xs={6}>                        
                        <h4>Inspirational Ideas</h4>
                        <h2>To me and everyone</h2>
                        <p className='greywords'>
                            Right off the bat, when people land on your site, 
                            you want them to understand who you are, what you do, 
                            and what you’re looking for.
                        </p>
                        <br/>
                        <h5>
                            Written by Elvis
                        </h5>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            component="img"
                            sx={{
                            borderRadius: 0
                            }}
                            alt="me"
                            src={img2}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            component="img"
                            sx={{
                            borderRadius: 0
                            }}
                            alt="me"
                            src={img3}
                        />
                    </Grid>
                    <Grid item xs={6}>                        
                        <h4>Inspirational Ideas</h4>
                        <h2>To me and everyone</h2>
                        <p className='greywords'>
                            Right off the bat, when people land on your site, 
                            you want them to understand who you are, what you do, 
                            and what you’re looking for.
                        </p>
                        <br/>
                        <h5>
                            Written by Elvis
                        </h5>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2} className='postsPagination'>
                            <Pagination
                                count={5}
                                color="primary"
                                renderItem={(item)=>
                                <PaginationItem {...item} 
                                    sx={{color: '#fff'}} 
                                />}
                            />
                        </Stack>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    );
}

export default Posts;