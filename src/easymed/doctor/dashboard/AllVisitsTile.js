import VisitTile from "./VisitTile";

const AllVisitsTile = ({ visits, ...props }) => {
  return (
    <>
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
    </>
  );
};

export default AllVisitsTile;
