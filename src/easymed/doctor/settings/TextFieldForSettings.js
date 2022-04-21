import TextField from '@mui/material/TextField';

const TextFieldForSettings = ({value, title, handleChange}) => {
    return ( 
            <TextField sx={{mb:3}}
                    defaultValue={value}
                    id={value}
                    helperText={title}
                    variant="standard"
                    onChange={handleChange}
                />
     );
}
 
export default TextFieldForSettings;