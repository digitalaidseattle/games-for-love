/**
 *  ToolbarButton.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Button } from "@mui/material";

const ToolbarButton = (props: any) => {
    return (
        <Button
            variant="outlined"
            onClick={props.onClick}
            disabled={props.disabled}
            sx={Object.assign({
                outline: "1px",
                margin: "0px",
                height: "36px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px"               
            }, props.sx)}
        >
            {props.children}
        </Button>
    );
}

export default ToolbarButton