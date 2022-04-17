import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import { Rating } from '@mui/material';
import React from 'react';


function DoctorReviewCard(props) {

    return (
        <Grid sx={{ bgcolor: 'grey' }}>
            <Card sx={{ display: 'flex' }}>
                <CardContent>
                    <Box sx={{
                        float: {
                            sm: "none",
                            lg: "left",
                        },
                        borderBottom:
                        {
                            xs: "1px solid lightgrey",
                            lg: "none",
                        },
                        width:
                        {
                            sm: "100%",
                            lg: "15%",
                        },
                        maxWidth: {
                            sm: "100%",
                            lg: "15%",
                        },
                        height: {
                            lg: "100%"
                        },
                        borderRight:
                        {
                            sm: "none",
                            lg: "1px solid lightgrey",
                        },
                        flexDirection: "column",
                        alignItems: "left",
                        justifyContent: "left"
                    }} >
                        <Typography variant="h6" >
                            {props.name}
                        </Typography>
                        <Typography variant="h6" style={{ fontWeight: "bold" }}   >{props.surname}</Typography>
                        <Rating value={props.stars} precision={0.5} sx={{
                            justifyContent: "left",
                            color: "orange",
                            width: "5%",
                        }} readOnly />

                        <Typography color="text.secondary" >
                            {props.date}
                        </Typography>
                    </Box>
                    <Box sx={{
                        width:
                        {
                            sm: "100%",
                            lg: "85%"
                        },
                        display: "flex",
                    }}>
                        < Typography sx={{
                            textAlign: "left",
                            marginLeft:
                            {
                                sm: "0px",
                                lg: "20px",
                            }
                        }} variant="h6"  >
                            {props.title}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            <br />
        </Grid>
    );
}

export default DoctorReviewCard;