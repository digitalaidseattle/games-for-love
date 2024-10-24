/**
 *  ActionButton.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Button } from "@mui/material"

const ActionButton = (props: any) => {
    return <Button
        variant="contained"
        href="#"
        sx={Object.assign({
            backgroundColor: "black",
            width: "100%",
            borderRadius: "40px",
            textTransform: "none",
            "&:hover": {
                backgroundColor: "transparent",
                color: "#000",
            },
        }, props.sx)}
        onClick={props.onClick}
    >
        {props.children}
    </Button>
}

export default ActionButton