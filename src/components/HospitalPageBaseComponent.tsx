import { Box, Grid, Typography } from "@mui/material";

export interface HospitalPageBaseComponentProps {
  image?: string | JSX.Element;
  header?: string;
  paragraph?: string;
  shortParagraph?: string;
  styles?: {
    container?: any;
    imageContainer?: any;
    header?: any;
    paragraph?: any;
    shortParagraph?: any;
  };
}
const HospitalPageBaseComponent = ({
  image,
  header,
  paragraph,
  shortParagraph,
  styles = {
    container: {},
    imageContainer: {},
    header: {},
    shortParagraph: {},
    paragraph: {},
  },
}: HospitalPageBaseComponentProps) => {
  return (
    <Box sx={{ padding: 6, ...styles.container }}>
      <Grid container spacing={4} alignItems="center">
        {/* Conditionally render the image */}
        {image && (
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: 300,
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...styles.imageContainer,
              }}
            >
              {typeof image === "string" ? (
                <img
                  src={image}
                  alt="Impact"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                image
              )}
            </Box>
          </Grid>
        )}

        {/* Text Content */}
        <Grid item xs={12} md={image ? 6 : 12} sx={{ textAlign: "center" }}>
          <Typography variant="h5" gutterBottom sx={{ ...styles.header }}>
            {header}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            color="textSecondary"
            sx={{ ...styles.shortParagraph }}
          >
            {shortParagraph}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ ...styles.paragraph }}
          >
            {paragraph}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HospitalPageBaseComponent;
