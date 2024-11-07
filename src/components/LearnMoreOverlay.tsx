/**
 *  LearnMoreOverlay.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Backdrop, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { LearnMoreHospitalContext } from "../context/SelectedHospitalContext";
import DialogCloseButton from "../styles/DialogCloseButton";

const LearnMoreContent = () => {
    const { hospital } = useContext(LearnMoreHospitalContext);

    return (
        <Typography>Learn more about {hospital!.name}</Typography>
    )
}

const LearnMoreOverlay = () => {
    const theme = useTheme();
    const { hospital, setHospital } = useContext(LearnMoreHospitalContext);

    const handleClose = (): void => {
        setHospital(undefined)
    }

    return (hospital &&
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={hospital !== undefined}
            onClick={handleClose}
        >
            <DialogCloseButton
                onClick={handleClose}
                sx={{ color: theme.palette.primary.contrastText }} />
            <LearnMoreContent />
        </Backdrop>
    );
};

export default LearnMoreOverlay;