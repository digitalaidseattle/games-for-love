import { Avatar, Box, Stack, Theme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GeneralInfo } from '../models/generalInfo';
import { generalInfoService } from '../services/generalInfo/generalInfoService';
import EmphasizedText from '../styles/EmphasizedText';

function SponsorPanel() {
    const [generalInfo, setGeneralInfo] = useState<GeneralInfo[]>([]);

    useEffect(() => {
        generalInfoService.findAll()
            .then(data => setGeneralInfo(data));
    }, []);

    return (
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
                    justifyContent: 'center', alignItems: 'center',
                    margin: '0.5rem',
                }}>
                <EmphasizedText>Our corporate sponsors:</EmphasizedText>
                <Stack direction={'row'} gap={2}>
                    {generalInfo.length > 0 &&
                        generalInfo[0].corpPartners.map((partner, idx) => <Avatar key={idx} src={partner.logo}>{partner.name}</Avatar>)
                    }
                </Stack>
                {generalInfo.length > 0 &&
                    <EmphasizedText>Total Funded {generalInfo[0].totalFunded} / {generalInfo[0].totalOpen} </EmphasizedText>
                }
            </Stack>
        </Box >

    );
}

export default React.memo(SponsorPanel);