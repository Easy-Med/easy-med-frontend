import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Rating } from '@mui/material';
import React from 'react';
import '../opinions.css';


function OpinionCard(props) {
 
  return (
    <Grid  className="App" sx={{ bgcolor: 'grey'}}>
      <Card  >
       
      <CardContent>
      <div className='author' style={{marginTop: '10px'}}>
        <Typography className='name' variant="h7" >
          {props.name} <Typography variant="h7" style={{fontWeight: "bold"}}   > {props.surname}</Typography>
        </Typography>
          <br /><br /> <br />  <br />
        <Rating name="read-only" value={props.stars} precision={0.5} className='star'/>
        
        <Typography color="text.secondary" style={{position:'absolute'}}>
        {props.date}
        </Typography>
      </div>

      <div className="opinion" >
      <br />
          <br />
     < Typography  variant="h7"  >
     {props.title}
      </Typography>
      </div>
      </CardContent>
    </Card>
    <br />
    </Grid>
  );
}

export default OpinionCard;