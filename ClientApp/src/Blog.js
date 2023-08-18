import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import usePagination from "./components/Pagination";
import Stack from '@mui/material/Stack';
import { useLoaderData } from 'react-router-dom';
import React, {useState} from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from "react-router-dom";

export default function Blog() {
    const posts = useLoaderData()
    let navigate = useNavigate();

    let [page, setPage] = useState(1);
    const PER_PAGE = 5;
  
    const count = Math.ceil(posts.length / PER_PAGE);
    const _DATA = usePagination(posts, PER_PAGE);
  
    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };

    return (
        <div className="blogWrapper">
            <Grid container className="pageHeader">
                <h1>Posts</h1>
            </Grid>
            <Grid container className="pageContainer">
                <Grid
                    container
                >
                    {_DATA.currentData().map((post, index) => (
                        index % 2 == 0 ?
                        <Grid container style={{alignItems:'center'}} >
                            <Grid item xs={6} style={{padding: '10px'}}>
                                <ButtonBase>
                                    <Box
                                        component="img"
                                        sx={{
                                        borderRadius: 0
                                        }}
                                        src={post?.thumbnail}
                                        onClick={() => navigate(`/post/${post?.id}`)}
                                    />
                                </ButtonBase>

                            </Grid>
                            <Grid item xs={6} style={{padding: '10px'}} sx={{ cursor: 'pointer' }} onClick={() => navigate(`/post/${post?.id}`)}>
                                    <h4>{post?.category}</h4>
                                    <h2>{post?.subject}</h2>
                                    <p className='greywords'>
                                        {post?.description}
                                    </p>
                                    <h5>
                                        Written by {post?.createdBy}
                                    </h5>
                            </Grid>
                        </Grid>
                        :
                        <Grid container style={{alignItems:'center'}} >
                            <Grid item xs={6} style={{padding: '10px'}} sx={{ cursor: 'pointer' }} onClick={() => navigate(`/post/${post?.id}`)}>
                                <h4>{post?.category}</h4>
                                <h2>{post?.subject}</h2>
                                <p className='greywords'>
                                    {post?.description}
                                </p>
                                <h5>
                                    Written by {post?.createdBy}
                                </h5>
                            </Grid>
                            <Grid item xs={6} style={{padding: '10px'}}>
                                <ButtonBase>
                                    <Box
                                        component="img"
                                        sx={{
                                        borderRadius: 0
                                        }}
                                        src={post?.thumbnail}
                                        onClick={() => navigate(`/post/${post?.id}`)}
                                    />   
                                </ButtonBase>
                            </Grid>  
                        </Grid>
                    ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={2} className='postsPagination'>
                            <Pagination
                                count={count}
                                page={page}
                                color="primary"
                                onChange={handleChange}
                                renderItem={(item)=>
                                <PaginationItem {...item} 
                                    sx={{color: '#fff'}} 
                                />}
                            />
                        </Stack>
                    </Grid>
                </Grid>
        </div>
    );
}

export const blogLoader = async () => {
    const res = await fetch('/posts')

    if (!res.ok) {
        throw Error('Could not find posts.')
    }

    return res.json()
}