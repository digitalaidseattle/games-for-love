import { Box, Grid, Typography } from "@mui/material";

const HospitalPageStatsSection = () => {
  const stats = [
    {
      startNumber: "600",
      endNumber: "400",
      label: "Play sessions in 3 years",
    },
    {
      startNumber: "15",
      endNumber: "10",
      label: "Equipment to be installed",
    },
    {
      startNumber: "450",
      endNumber: "300",
      label: "Kids impacted in 3 years",
    },
  ];

  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        padding={4}
        sx={{ border: "1px solid black", backgroundColor: "#E9605A" }}
      >
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            {/* Circle with the number */}
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                backgroundColor: "#4A24E7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" sx={{ color: "white" }}>
                {stat.startNumber}{" "}
                <Typography
                  variant="body1"
                  sx={{ color: "#F3C941", fontStyle: "italic" }}
                >
                  of {stat.endNumber}
                </Typography>
              </Typography>
            </Box>

            {/* Label below the circle */}
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ marginTop: 2 }}
            >
              {stat.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HospitalPageStatsSection;
