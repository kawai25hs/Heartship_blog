import Grid from '@mui/material/Grid';
import { useLoaderData } from 'react-router-dom';

const Post = () => {
    const post = useLoaderData()

    return (
        <div className="blogWrapper">
            <Grid container className="pageHeader">
                <h1>{post?.subject}</h1>
            </Grid>
            <Grid container className="pageContainer">
                <Grid
                    container
                    spacing={{ xs: 2 }}
                    className="wrap"
                >
                    <Grid item xs={12}>
                        <h3>{post?.category}</h3>
                    </Grid>                    
                    <Grid item xs={12}>
                        <h5>Written by {post?.createdBy}&nbsp;&nbsp;{post?.createDate}</h5>
                        <br/>
                    </Grid>
                    <Grid item xs={12}>
                        <div dangerouslySetInnerHTML={{__html:post?.content}} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Post;