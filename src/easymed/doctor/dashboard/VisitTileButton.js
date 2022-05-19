import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const TileIcon = styled("img")(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: "50%",
  border: "solid transparent",
  borderWidth: "0px",
  backgroundColor: "lightGrey",
  boxShadow: theme.shadows["3"],
  width: "45px",
  height: "45px",
}));

const VisitTileButton = ({ visit, onClick, imgSrc, bgColor }) => {
  return (
      <IconButton sx={{ p: 0 }} disableRipple onClick={onClick}>
        <TileIcon
          src={imgSrc}
          alt={""}
          sx={[
            {
              backgroundColor: `rgba(${bgColor}, 1)`,
            },
            {
              "&:hover": {
                borderColor: `rgba(${bgColor}, 1)`,
                borderWidth: "2px",
              },
            },
          ]}
        />
      </IconButton>
  );
};

export default VisitTileButton;
