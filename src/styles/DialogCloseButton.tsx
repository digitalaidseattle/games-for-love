/**
 *  ActionButton.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import CloseIcon from "@mui/icons-material/Close";

import { IconButton, Theme } from "@mui/material";

const DialogCloseButton = (props: any) => {
    return <IconButton
        onClick={props.onClick}
        aria-label="close"
        sx={Object.assign({
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme: Theme) => theme.palette.grey[500],
        }, props.sx)}
    >
        <CloseIcon />
    </IconButton>
}

export default DialogCloseButton