/**
 *  ActionButton.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Button, useTheme } from "@mui/material"

const ActionButton = (props: any) => {
    const theme = useTheme();
    return <Button
        disabled={props.disabled}
        variant="contained"
        href="#"
        sx={Object.assign({
            backgroundColor: props.disabled ? "gray" : "black",
            width: "100%",
            borderRadius: "40px",
            textTransform: "none",
            "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.common.white,
            },
        }, props.sx)}
        onClick={props.onClick}
    >
        {props.children}
    </Button>
}

export default ActionButton