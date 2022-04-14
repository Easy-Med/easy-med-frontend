import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextFieldForSettings from "./TextFieldForSettings";

const Settings = () => {
    // const baseURL = 'http://localhost:8000/';
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [telNum, setTelNum] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [isPending, setIsPending] = useState(false);

    const BootstrapButton = styled(Button)({
        background: '#009B9B',
        color: '#fff',
        border: 0,
        padding: '8px',
        borderRadius: '8px',
        cursor: 'default',
        fontFamily: [
            'Arial',
          ].join(','),
        '&:hover': {
        backgroundColor: '#009B9B',
        borderColor: '#0062cc',
        boxShadow: 'none',
        },  
    })


    useEffect(() =>{
        const doctor = {name: "Jaroslaw", lastName: "Wilk", email: "jaroslaw.wilk@ktos.cos", telNum: "696969696", description: "Jestem super profesorem", location: "Warszawka", specialization: "komputery"};
        let name = doctor.name;
        setName(name);
        let lastName = doctor.lastName;
        setLastName(lastName);
        let email = doctor.email;
        setEmail(email);
        let telNum = doctor.telNum;
        setTelNum(telNum);
        let description = doctor.description;
        setDescription(description);
        let location = doctor.location;
        setLocation(location);
        let specialization = doctor.specialization;
        setSpecialization(specialization);
    },[]);



    const handleSubmit = (e) =>{
        e.preventDefault();
        // const doctor = {name,lastName,email,telNum,description,location,specialization}
        setIsPending(true);
        
        console.log(name);
        setIsPending(false);
    }

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleLastName = (e) => {
        setLastName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleTelNum = (e) => {
        setTelNum(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const handleLocation = (e) => {
        setLocation(e.target.value);
    }
    const handleSpecialization = (e) => {
        setSpecialization(e.target.value);
    }


    return ( 
        <div className="settings">
            <h2>Account data</h2>
            <form>
            <Box sx={{width: '25%', mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                
                <TextFieldForSettings value = {name} title = "First name" data = {handleName}/>
                <TextFieldForSettings value = {lastName} title = "Last name" data = {handleLastName}/>
                <TextFieldForSettings value = {email} title = "Email" data = {handleEmail}/>
                <TextFieldForSettings value = {telNum} title = "Telephone" data = {handleTelNum}/>
                <TextFieldForSettings value = {description} title = "Description" data = {handleDescription}/>
                <TextFieldForSettings value = {location} title = "Office location" data = {handleLocation}/>
                <TextFieldForSettings value = {specialization} title = "Medical Specialization" data = {handleSpecialization}/>
                
                </Box>
                
                {!isPending && <BootstrapButton onClick={handleSubmit}>Save changes</BootstrapButton>}
                {isPending && <BootstrapButton disabled>Updateing settings...</BootstrapButton>}
            </form>
        </div>
     );
}
 
export default Settings;