import VisitTile from "./VisitTile";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import useAuth from "../../../app/auth/UseAuth";
import { useQuery } from "react-query";
import VisitService from "../../../app/api/doctor/VisitService";
import moment from "moment";
import { useTheme } from "@emotion/react";

const AllVisitsTile = ({ ...props }) => {
  const auth = useAuth();
  const id = auth.authData.id;
  const theme = useTheme();

  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { isLoading, data } = useQuery("doctorsVisits", () =>
    VisitService.getDoctorsVisits(3)
  );

  return (
    <Box>
      {isLoading ? (
        <Box sx={{
          px: 2,
          py: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          flex: matchesMobile ? "1" : "0 1 auto",
          width: "100%",
          minWidth: "245px",
        }}>
          <CircularProgress />
        </Box>
      ) : (
        data.map((element) => (
          <VisitTile
            key={element.id}
            hour={moment(element.startDate).format("HH:mm")}
            firstName={element.patient.firstName}
            lastName={element.patient.lastName}
            pesel={element.patient.personalIdentityNumber}
          />
        ))
      )}
    </Box>
  );
};

export default AllVisitsTile;

/* 
<VisitTile
        hour={"13:00"}
        firstName={"Zbigniew"}
        lastName={"Kaniecki"}
        pesel={"00230305789"}
      />
      <VisitTile
        hour={"14:00"}
        firstName={"Aneta"}
        lastName={"Ławska"}
        pesel={"01457898123"}
      />
      <VisitTile
        hour={"15:00"}
        firstName={"Ola"}
        lastName={"Kabzuła"}
        pesel={"01457898123"}
      />
      <VisitTile
        hour={"16:00"}
        firstName={"Ola"}
        lastName={"Kabzuła"}
        pesel={"01457898123"}
      />
      <VisitTile
        hour={"17:00"}
        firstName={"Ola"}
        lastName={"Kabzuła"}
        pesel={"01457898123"}
      />
*/
