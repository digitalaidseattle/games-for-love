import { Avatar, Box, Stack, Theme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CorporatePartner } from '../models/corporatePartner';
import { generalInfoService } from '../services/generalInfo/generalInfoService';
import EmphasizedText from '../styles/EmphasizedText';

function SponsorPanel() {
    const [partners, setPartners] = useState<CorporatePartner[]>([]);

    useEffect(() => {
        generalInfoService.findAll()
            .then(data => setPartners(data[0].corpPartners));
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
                    {
                        partners.map((partner, idx) => <Avatar key={idx} src={partner.logo}>{partner.name}</Avatar>)
                    }
                </Stack>
            </Stack>
        </Box >

    );
}

export default React.memo(SponsorPanel);