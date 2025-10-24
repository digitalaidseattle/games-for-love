/**
 *  HospitalPageStatusSection.tsx
 *
 *  @copyright 2025 Digital Aid Seattle
 *
 */
import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import { CorporatePartner } from "../../models/corporatePartner";
import { Hospital } from "../../models/hospital";
import DonationBar from "./DonationBar";

const BrandPartners: React.FC<{ hospital: Hospital }> = ({ hospital }) => {
  const [corporatePartners, setCorporatePartners] = useState<CorporatePartner[]>([]);

  useEffect(() => {
    if (hospital) {
      if (hospital.matchedRequest && hospital.matchedRequest.corpPartners) {
        setCorporatePartners(hospital.matchedRequest.corpPartners);
        // setCorporatePartners(TEST_PARTNER)
      }
    }
  }, [hospital]);

  const partnerSection = (partner: CorporatePartner) => {
    return (
      <Stack
        key={partner.name} direction={'row'}
        alignItems={'center'}
        gap={'1rem'}
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: '#F9FAFB',
          borderRadius: 8,
          padding: 0.5
        }}
      >
        <img
          src={partner.logo} // Replace with actual image
          alt="Partner Logo"
          style={{
            margin:'0.5rem',
            width: "15%",
            height: "auto",
            borderRadius: 8
          }}
        />
        <Stack>
          <Typography fontWeight={600}>{partner.name}</Typography>
          <Typography >Match Amount: ${partner.match! / 1000}k</Typography>
        </Stack>
      </Stack>
    );
  };

  return (
    <Box mt={4} sx={{ minHeight: "100px" }}>
      {corporatePartners.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Brand Partners
          </Typography>
          <Stack gap='1rem'>
            {corporatePartners.map((partner) => partnerSection(partner))}
          </Stack>
        </>
      )}
    </Box>
  );
};

const HospitalPageStatusSection = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);
  return (
    <Stack
      gap={2}
      sx={{
        margin: "20px",
      }}
    >
      {hospital && <DonationBar hospital={hospital} />}
      {hospital && <BrandPartners hospital={hospital} />}
    </Stack>
  );
};

export default HospitalPageStatusSection;
