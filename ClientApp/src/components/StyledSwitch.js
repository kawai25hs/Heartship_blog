import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const CssSwitch = styled(Switch)({
    '& .MuiSwitch-track': {
        backgroundColor: '#9c9c9c'
    },

  });

  export default function StyledSwitch(props) {
      return <CssSwitch onChange={props.handleChange}/>;
  }