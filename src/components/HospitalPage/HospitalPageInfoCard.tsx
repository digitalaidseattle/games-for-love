import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Hospital } from "../../models/hospital";
import { useContext } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";

const HospitalPageInfoCard = ({
  hospital
}: {
  hospital: Hospital
}) => {
  const { setHospital: setLearnMoreHospital } = useContext(LearnMoreHospitalContext);

  const handleLearnMore = (evt: any) => {
    evt.stopPropagation();
    setLearnMoreHospital(hospital);
  };

  return (
    <Card
      sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardActionArea onClick={handleLearnMore}>
        {/* Image */}
        <CardMedia
          component="img"
          height="180"
          image={hospital.hospitalPictures[0]}
          alt={hospital.name}
          sx={{ borderRadius: "8px 8px 0 0" }}
        />

        {/* Content */}
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {hospital.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {hospital.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HospitalPageInfoCard;
