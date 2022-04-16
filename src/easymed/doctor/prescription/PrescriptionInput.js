import {Grid, TextField} from "@mui/material";

const PrescriptionInput = ({
    name,
    label,
    autoFocus,
    error,
    onChange,
    helperText,
    value,
}) => {
    return (
        <Grid item xs={12} sm={12}>
            <TextField
                name={name}
                required
                onChange={onChange}
                value={value}
                fullWidth
                label={label}
                autoFocus={autoFocus}
                error={error}
                helperText={helperText}
                variant="standard"
            />
        </Grid>
    );
};

export default PrescriptionInput;