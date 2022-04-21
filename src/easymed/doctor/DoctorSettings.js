import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextFieldForSettings from "./settings/TextFieldForSettings";

const initialState = {
  name: "Jaroslaw",
  lastName: "Wilk",
  email: "jaroslaw.wilk@ktos.cos",
  telNum: "696969696",
  description: "Jestem super profesorem",
  location: "Warszawka",
  specialization: "komputery",
};

const DoctorSettings = () => {
    const [formData, setFormData] = useState(initialState);
    const loading = false;

    const styles = {
      submitButton: {
        mt: 8,
        mb: 15,
        width: 1/5,
      },
      };

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };


    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(formData.name);
    }

    return ( 
        <div className="settings">
          <Box sx={{minWidth: 800, p:3}}>
            <h2>Account data</h2>
            <form onSubmit={handleSubmit}>
            <Box sx={{width: '50%', mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'left'}}>

                <TextFieldForSettings value = {formData.name} title = "First name" handleChange = {handleChange}/>
                <TextFieldForSettings value = {formData.lastName} title = "Last name" handleChange = {handleChange}/>
                <TextFieldForSettings value = {formData.email} title = "Email" handleChange = {handleChange}/>
                <TextFieldForSettings value = {formData.telNum} title = "Telephone" handleChange = {handleChange}/>
                <TextFieldForSettings value = {formData.description} title = "Description" handleChange = {handleChange}/>
                <TextFieldForSettings value = {formData.location} title = "Office location" handleChange = {handleChange}/>
                <TextFieldForSettings value = {formData.specialization} title = "Medical Specialization" handleChange = {handleChange}/>
                </Box> 
                <Button type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={styles.submitButton}
                  disabled={loading} 
                >Save changes</Button> 
            </form>
            </Box>
        </div>
     );
}
 
export default DoctorSettings;