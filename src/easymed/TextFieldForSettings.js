import TextField from '@mui/material/TextField';

const TextFieldForSettings = ({value, title, data}) => {
    return ( 
            <TextField sx={{mb:3}}
                    defaultValue={value}
                    id={value}
                    helperText={title}
                    variant="standard"
                    onChange={(e) => data(e)}
                />
     );
}
 
export default TextFieldForSettings;