import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const HospitalPageInfoCard = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      {/* Image */}
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        sx={{ borderRadius: "8px 8px 0 0" }}
      />

      {/* Content */}
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HospitalPageInfoCard;
