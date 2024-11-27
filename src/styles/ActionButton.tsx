/**
 *  ActionButton.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Button } from "@mui/material"

const ActionButton = (props: any) => {
    return <Button
        disabled={props.disabled}
        variant="contained"
        href="#"
        sx={Object.assign({
            width: "100%",
            borderRadius: "40px",
            textTransform: "none"
        }, props.sx)}
        onClick={props.onClick}
    >
        {props.children}
    </Button>
}

export default ActionButton