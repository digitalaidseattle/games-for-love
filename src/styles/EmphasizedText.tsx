/**
 *  EmphasizedText.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Typography } from "@mui/material"

const EmphasizedText = (props: any) => {
    return <Typography
        textAlign={props.textAlign ?? "inherit"}
        variant="body2"
        component="span"
        align={props.align ?? "inherit"}
        sx={Object.assign(
            {
                fontStyle: "italic",
            },
            props.sx
        )}
    >
        {props.children}
    </Typography>
}

export default EmphasizedText