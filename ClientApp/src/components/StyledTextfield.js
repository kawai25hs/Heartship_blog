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
    }

  });

  export default function StyledTextfield(props) {
    return <CssTextField variant='standard' sx={{ minWidth: 250}} {...props}/>;
  }