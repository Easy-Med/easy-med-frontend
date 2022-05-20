import VisitTile from "./VisitTile";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import useAuth from "../../../app/auth/UseAuth";
import { useQuery } from "react-query";
import ReservedVisitsService from "../../../app/api/ReservedVisitsService";
import { useTheme } from "@emotion/react";

const AllVisitsTile = ({ ...props }) => {
  const auth = useAuth();
  const id = auth.authData.id;
  const theme = useTheme();
  const { role } = auth.authData;

  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { isLoading, data } = useQuery(`${role}Visits`, () =>
    ReservedVisitsService.getReservedVisitsFor(role, 3, {"completed": ["no"]})
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
            visit={element}
          />
        ))
      )}
    </Box>
  );
};

export default AllVisitsTile;