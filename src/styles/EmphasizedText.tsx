/**
 *  EmphasizedText.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Theme, Typography } from "@mui/material"

const EmphasizedText = (props: any) => {
    return <Typography
        variant="body2"
        component="span"
        align={props.align ?? "inherit"}
        sx={Object.assign(
            {
                fontStyle: "italic",
                color: (theme: Theme) => theme.palette.common.black
            },
            props.sx
        )}
    >
        {props.children}
    </Typography>
}

export default EmphasizedText