
import React from 'react';
import DoctorReviewCard from './DoctorReviewCard';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function DoctorReviews() {
  const reviews = [{ content: "Doktor Wioletta Rzeszotarska – bardzo profesjonalna i miła Pani doktor, trafna diagnoza, przepisane leczenie szybko przyniosło ulgę. Dziękuje !", name: "Zuzanna", surname: "Rzeszotarska", date: "2 weeks ago", stars: 4.5 }
    , { content: "Jako rodzic 2 letniej Basi, mogę z pełnym przekonaniem polecić p. doktor Bożenę. Jej podejście do mojego dziecka było profesjonalne, wiedza pomogła szybko zdiagnozować zwykłe zapalenie gardła, choć byłem mocno wystraszony, bo Basia bardzo mocno kaszlała. Obiecałem sobie napisać tą pochwałę, zaraz po wizycie pani doktor, więc to czynię ;).", name: "Magdalena", surname: "Mordecka", date: "month ago", stars: 3 }
    , { content: "Z czystym sumieniem polecam dr. Tomka. Pełen profesjonalizm, wiedza i siła spokoju i umiejętność wytłumaczenia mi przebiegu choroby, spowodowały, że po 30 minutach rozmowy z p. doktorem jestem spokojny o zdrowie moje mamy.", name: "Szymon", surname: "Derebecki", date: "2 weeks ago", stars: 2.5 }];

  return (

    <Box sx={{ margin: "30px" }} >
      <Typography sx={{ marginBottom: "30px" }} variant="h6">Reviews about you ✨</Typography>

      {reviews.map((txt, id) => {
        return <DoctorReviewCard key={id} title={txt.content} name={txt.name} surname={txt.surname} date={txt.date} stars={txt.stars}></DoctorReviewCard>
      })}
    </Box>
  );
}

export default DoctorReviews;