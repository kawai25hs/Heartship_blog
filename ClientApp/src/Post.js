import Grid from '@mui/material/Grid';
import { useLoaderData } from 'react-router-dom';

export default function Post() {
    const post = useLoaderData()

//     const contentBlock = htmlToDraft("<p>12345</p>");
// const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

// const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));

    return (
        <div className="postWrapper">
            <Grid container className="pageHeader" xs>
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
                        <br/>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='content' dangerouslySetInnerHTML={{__html:post?.content}} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export const postLoader = async ({ params }) => {
    const { Id } = params

    const res = await fetch('/posts/' + Id)

    if (!res.ok) {
        throw Error('Could not find the post.')
    }

    return res.json()
}