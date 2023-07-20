import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import StyledTextfield from './components/StyledTextfield';
import StyledSelect from './components/StyledSelect';
import StyledSwitch from './components/StyledSwitch';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, {useState, useEffect, useCallback} from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import date from 'date-and-time';

const NewPost = () => {
    const [subject, setSubject] = useState([]);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);
    const [feature, setFeature] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [uploadedImages, setUploadedImages] = useState([]);

    const switchItem = [
      {
        value: '',
        name: 'None'
      },
      {
        value: 'Inspirational Ideas',
        name: 'Inspirational Ideas'
      },
      {
        value: 'Game design',
        name: 'Game design'
      },
      {
        value: 'Diary',
        name: 'Diary'
      }
    ]

    const updateEditorState = (e) => {
        setEditorState(e.target.value);
    };

    const uploadImageCallBack = async (file) => {
        console.log('file: ', file);
        let now = new Date();
        now = date.format(now, 'YYYYMMDD_HH_mm_ss');
        const formData = new FormData();
        const fileName = file?.name.slice(0, file?.name.lastIndexOf(".")) + "_" + now + file?.name.slice(file?.name.lastIndexOf("."));
        formData.append("formFile", file);
        formData.append("fileName", fileName);

        await axios.post('file/upload', formData);
        // long story short, every time we upload an image, we
        // need to save it to the state so we can get it's data
        // later when we decide what to do with it.
    
        // Make sure you have a uploadImages: [] as your default state
        let images = uploadedImages;
        
        const imageObject = {
          file: file,
          localSrc: URL.createObjectURL(file), //'img/'+fileName,
          fileName: fileName
        }
        console.log('imageObject', imageObject);
        images.push(imageObject);
    
        setUploadedImages(images);
    
        // We need to return a promise with the image src
        // the img src we will use here will be what's needed
        // to preview it in the browser. This will be different than what
        // we will see in the index.md file we generate.
        return new Promise(
          (resolve, reject) => {
            resolve({ data: { link: imageObject.localSrc } });
          }
        );
    // return new Promise(
    //     (resolve, reject) => {
    //       const xhr = new XMLHttpRequest();
    //       xhr.open('POST', 'https://api.imgur.com/3/image');
    //       xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
    //       const data = new FormData();
    //       data.append('image', file);
    //       xhr.send(data);
    //       xhr.addEventListener('load', () => {
    //         const response = JSON.parse(xhr.responseText);
    //         resolve(response);
    //       });
    //       xhr.addEventListener('error', () => {
    //         const error = JSON.parse(xhr.responseText);
    //         reject(error);
    //       });
    //     }
    //   );

    };

    const onEditorStateChange = useCallback((state) => {
        setEditorState(state);
    }, [editorState]);

    useEffect(() => {
        console.log('editorState', draftToHtml(convertToRaw(editorState?.getCurrentContent())));
    }, [editorState]);

    useEffect(() => {
        console.log('uploadedImages', uploadedImages);
    }, [uploadedImages]);

    useEffect(() => {
        console.log('subject', subject);
    }, [subject]);

    // const onEditorStateChange2 = useEffect(() => {

    //     console.log('editorState', editorState);
    // }, [editorState]);
    
    useEffect(() => {
        console.log('thumbnail', thumbnail);
    }, [thumbnail]);

    return (
        <div className="newPostWrapper">
            <div className="newPostWrapperChild">
                <Grid container className="pageHeader">
                    <h1>New Post</h1>
                </Grid>
                <Grid container className="newPostContainer">
                    <Grid
                        container
                        spacing={{ xs: 2 }}
                    >
                        <Grid item xs={12}>
                            <StyledTextfield
                                label="Subject"
                                value={subject}
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledSelect
                                item={switchItem}
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextfield
                                label="Description"
                                multiline
                                maxRows={2}
                                fullWidth
                                inputProps={{ maxLength: 50 }}
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} style={{marginTop: '5px'}}>
                            Content
                        </Grid>
                        <Grid item xs={12}>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                // onBlur={updateEditorState}
                                onEditorStateChange={onEditorStateChange}
                                toolbar={{
                                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
                                    blockType: {
                                        dropdownClassName: "editorBlockTypeClassName",
                                      },
                                      fontSize: {
                                        dropdownClassName: "editorFontSizeClassName",
                                      },
                                    fontFamily: {
                                        dropdownClassName: "editorFontFamilyClassName",
                                    },                                      
                                    image: { previewImage: true, uploadCallback: uploadImageCallBack, alt: { present: true } },
                                  }}                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextfield
                                label="Thumbnail"
                                type="file"
                                value={thumbnail}
                                onChange={(e) => {
                                    setThumbnail(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<StyledSwitch />}
                                label="Featured"
                                labelPlacement="start"
                                value={feature}
                                onChange={(e) => {
                                    setFeature(e.target.value);
                                }}
                            />
                        </Grid>                          
                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', margin: '25px 0'}}>
                            <Button variant="contained" size="large" sx={{color: 'white', fontWeight: 'bold', width: '50%'}}>Submit</Button>
                        </Grid>                        
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default NewPost;