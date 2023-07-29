import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CssTextField = styled(TextField)({
    '& .MuiInput-underline:before': {
      borderBottomColor: 'grey'
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: '#adadad !important'
    },
    '& .MuiInput-root': {
      color: '#fff'
    },
    '& .MuiInputLabel-root': {
      color: '#fff'
    },
    input: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px black inset",
        WebkitTextFillColor: '#fff',
        fontSize: "16px",
        caretColor: '#fff'
      }
    },
    input2: {
      WebkitBoxShadow: "0 0 0 1000px black inset",
      WebkitTextFillColor: '#fff'
    },

  });

  export default function StyledTextfield(props) {
    return <CssTextField variant='standard' sx={{ minWidth: 250}} {...props}/>;
  }