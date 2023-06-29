import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import StyledTextfield from './components/StyledTextfield';
import StyledSelect from './components/StyledSelect';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, {useState, useEffect, useCallback} from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import date from 'date-and-time';

const NewPost = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [uploadedImages, setUploadedImages] = useState([]);

    const updateEditorState = (e) => {
        setEditorState(e.target.value);
    };

    const uploadImageCallBack = (file) => {
        console.log('file: ', file);
        const now = new Date();
        const formData = new FormData();
        const fileName = file?.name.slice(0, file?.name.lastIndexOf(".")) + "_" + now + file?.name.slice(file?.name.lastIndexOf("."));
        formData.append("formFile", file);
        formData.append("fileName", fileName);
        // long story short, every time we upload an image, we
        // need to save it to the state so we can get it's data
        // later when we decide what to do with it.
    
        // Make sure you have a uploadImages: [] as your default state
        let images = uploadedImages;
    
        const imageObject = {
          file: file,
            localSrc: fetch('api/file/getTen')//axios.post('api/file', formData), //URL.createObjectURL(file),
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
    // const onEditorStateChange2 = useEffect(() => {

    //     console.log('editorState', editorState);
    // }, [editorState]);

    useEffect(() => {
        axios.get('file/getTen')
            .then(function (response) {
                // handle success
                console.log('getTen', response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

        //console.log('getTen', axios('api/file/getTen'));
    }, []);

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
                            <StyledTextfield label="Subject"/>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledSelect/>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextfield label="Description" multiline maxRows={2} fullWidth/>
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
                            <StyledTextfield label="Thumbnail" type="file"/>
                        </Grid>                        
                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant="contained" size="large" sx={{color: 'white', fontWeight: 'bold', width: '50%'}}>Submit</Button>
                        </Grid>                        
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default NewPost;