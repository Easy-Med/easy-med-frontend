import React from "react";
import DoctorReviewCard from "../../doctor/reviews/DoctorReviewCard";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import { Rating } from "@mui/material";
import { CardContent } from "@mui/material";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useQuery } from "react-query";
import useAuth from "../../../app/auth/UseAuth";
import ReviewsService from '../../../app/api/ReviewsService';

export default function PatientReviews() {
    const auth = useAuth();
    const { role, id } = auth.authData;

    const reviewsQuery = useQuery(`${role}Reviews`, () =>
        ReviewsService.getReviews(role, id)
    );

    /*const reviews = [{ content: "Doktor Wioletta Rzeszotarska – bardzo profesjonalna i miła Pani doktor, trafna diagnoza, przepisane leczenie szybko przyniosło ulgę. Dziękuje !", name: "Zuzanna", surname: "Rzeszotarska", date: "2 weeks ago", stars: 4.5 }
        , { content: "Jako rodzic 2 letniej Basi, mogę z pełnym przekonaniem polecić p. doktor Bożenę. Jej podejście do mojego dziecka było profesjonalne, wiedza pomogła szybko zdiagnozować zwykłe zapalenie gardła, choć byłem mocno wystraszony, bo Basia bardzo mocno kaszlała. Obiecałem sobie napisać tą pochwałę, zaraz po wizycie pani doktor, więc to czynię ;).", name: "Magdalena", surname: "Mordecka", date: "month ago", stars: 3 }
        , { content: "Z czystym sumieniem polecam dr. Tomka. Pełen profesjonalizm, wiedza i siła spokoju i umiejętność wytłumaczenia mi przebiegu choroby, spowodowały, że po 30 minutach rozmowy z p. doktorem jestem spokojny o zdrowie moje mamy.", name: "Szymon", surname: "Derebecki", date: "2 weeks ago", stars: 2.5 }];*/

    const doctorsName = "Gabriela"
    const doctorsSurname = "Konopka"
    const dateOfVisit = "04.03.2022"
    const medicalSpecialization = "Alergolog"

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [comment, setComment] = React.useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };
    const handlePost = () => {
      //  reviews.push(comment, doctorsName, doctorsSurname, dateOfVisit, value);
        setOpen(false);
    }

    return (
        <div>
            <Box sx={{ margin: "30px" }} >
                <Typography sx={{ marginBottom: "30px" }} variant="h5">Post Review</Typography>
                <Card sx={{ marginBottom: "50px" }}>
                    <CardContent>
                        <Box sx={{
                            float: {
                                sm: "none",
                                lg: "left",
                            },
                            height: {
                                lg: "100%"
                            },
                        }} >
                            <Typography variant="h5" >
                                {doctorsName} {doctorsSurname}
                            </Typography>
                            <Typography variant="h6" >{medicalSpecialization}</Typography>
                            <br></br>

                            <Typography color="text.secondary" >
                                Date of visit: {dateOfVisit}
                            </Typography>
                        </Box>
                        <Button sx={{
                            float: "right",
                            marginBottom: "10px"
                        }} variant="outlined" onClick={() => handleClickOpen()}>POST REVIEW</Button>
                    </CardContent>
                </Card>
                <Typography sx={{ marginBottom: "30px" }} variant="h5">Your Reviews</Typography>
                {reviewsQuery.map((txt, id) => {
                    return <DoctorReviewCard key={id} title={txt.Description} name={txt.Doctor.Name} surname={txt.Doctor.LastName} date={txt.CreatedAt} stars={txt.Rating}></DoctorReviewCard>
                })}

            </Box>
            <Dialog open={open}>
                <DialogTitle>Post Review</DialogTitle>
                <DialogContent
                    sx={{
                        float: {
                            sm: "none",
                            lg: "left",
                        },
                        height: {
                            lg: "100%"
                        },
                    }} >
                    <Typography variant="h5" >
                        {doctorsName} {doctorsSurname}
                    </Typography>
                    <Typography variant="h6" >{medicalSpecialization}</Typography>
                    <Typography color="text.secondary" >
                        Date of visit: {dateOfVisit}
                    </Typography>
                    <Rating name="size-medium" defaultValue={0} precision={0.5} className='star' onChange={(event, newValue) => {
                        setValue(newValue);
                    }}></Rating>

                    <TextField
                        autoFocus
                        multiline
                        label="Comment"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event, newComment) => {
                            setComment(newComment);
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClickClose()}>Cancel</Button>
                    <Button onClick={() => handlePost()}>Post</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}