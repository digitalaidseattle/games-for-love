import { Box, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import { CorporatePartner } from "../../models/corporatePartner";
import { Hospital } from "../../models/hospital";

const DonationsRecievedProgressBar = styled(LinearProgress)({
  height: 40,
  borderRadius: 5,
  "& .MuiLinearProgress-bar": {
    backgroundColor: "#4A24E7", // Purple color
  },
});

const BrandPartners: React.FC<{ hospital: Hospital }> = ({ hospital }) => {
  const [corporatePartners, setCorporatePartners] = useState<
    CorporatePartner[]
  >([]);

  useEffect(() => {
    if (hospital) {
      if (hospital.matchedRequest) {
        if (hospital.matchedRequest.corpPartners) {
          setCorporatePartners(hospital.matchedRequest.corpPartners);
        }
      }
    }
  }, [hospital]);

  const partnerSection = (partner: CorporatePartner) => {
    return (
      <Grid key={partner.name} container spacing={2}>
        <Grid item xs={3}>
          <img
            src={partner.logo} // Replace with actual image
            alt="Partner Logo"
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">{partner.name}</Typography>
            <Typography variant="body2" mt={1}>
              Match Amount: {partner.match}
            </Typography>
          </Box>
          <Typography variant="body2" mt={1}>
            {partner.description}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box mt={4} sx={{ minHeight: "100px" }}>
      {corporatePartners.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Brand Partners
          </Typography>
          {corporatePartners.map((partner) => partnerSection(partner))}
        </>
      )}
    </Box>
  );
};
const HospitalPageTitleRequestNarrative = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);
  const amountRequested = hospital?.matchedRequest?.requested ?? 0;
  const amountRaised = hospital?.matchedFunded?.fundingCompleted ?? 0;
  const percentage = (amountRaised / amountRequested) * 100;
  const [columns, setColumns] = useState<number>(2);

  useEffect(() => {
    if (hospital) {
      if (hospital.status === "active")
        if (hospital.matchedRequest) {
          if (hospital.matchedRequest.corpPartners.length === 0) {
            setColumns(1);
          }
        }
    }
  }, [hospital]);

  return (
    <div id='AAAA'>
      <Grid
        container
        spacing={4}
        sx={{
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={columns === 1 ? 12 : 6}
          sx={{
            padding: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ color: "#8A8A8A", paddingBottom: "1rem" }}
            >
              {hospital?.matchedRequest?.titleRequestNarrative}
            </Typography>

            <Typography variant="body1" gutterBottom>
              {hospital?.matchedRequest?.requestNarrative}
            </Typography>
          </Stack>
        </Grid>

        {columns === 2 &&
          <Grid item xs={12} md={6}>
            <Stack>
              {/* Donations Received Section - past hospital */}
              {hospital?.status === "past" && (
                <Box mt={2}>
                  <Typography variant="h6" sx={{ fontSize: "20px" }}>
                    Donations Received:
                    <span>
                      {" "}
                      {`$${(amountRaised / 1000).toFixed(1)}k raised out of $${(
                        amountRequested / 1000
                      ).toFixed(1)}k (${percentage.toFixed(0)}%)`}
                    </span>
                  </Typography>

                  <Box mt={2}>
                    <DonationsRecievedProgressBar
                      variant="determinate"
                      value={100}
                    />
                  </Box>
                </Box>
              )}

              <BrandPartners hospital={hospital!} />
            </Stack>
          </Grid>
        }
      </Grid>
    </div>
  );
};

export default HospitalPageTitleRequestNarrative;
