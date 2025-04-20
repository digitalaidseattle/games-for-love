import { Avatar, Box, Stack, Theme } from '@mui/material';
import React, { useContext } from 'react';
import { GeneralInfoContext } from '../context/GeneralInfoContext';
import { generalInfoService } from '../services/generalInfo/generalInfoService';
import EmphasizedText from '../styles/EmphasizedText';

function SponsorPanel() {
    const { generalInfo } = useContext(GeneralInfoContext);

    return (
        generalInfoService.hasCorporateSponsors(generalInfo) &&
        <Box sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: (theme: Theme) => theme.palette.action.selected,
            margin: '1rem',
            borderRadius: "10px",
        }}>
            <Stack
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0.5rem',
                }}>
                <EmphasizedText>Our corporate sponsors:</EmphasizedText>
                <Stack direction={'row'} gap={2}>
                    {
                        generalInfo.corpPartners.map((partner, idx) => <Avatar key={idx} src={partner.logo}>{partner.name}</Avatar>)
                    }
                </Stack>
                <EmphasizedText sx={{ fontWeight: 'bold', fontSize: 'small' }}>Total Funded {generalInfo.totalFunded} / {generalInfo.totalOpen} </EmphasizedText>
            </Stack>
        </Box >
    );
}

export default React.memo(SponsorPanel);