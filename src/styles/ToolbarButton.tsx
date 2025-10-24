/**
 *  ToolbarButton.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Button } from "@mui/material";

import { ReactNode } from "react";

interface ToolbarButtonProps {
  variant?: "text" | "outlined" | "contained";
  onClick?: () => void;
  disabled?: boolean;
  height?: string | number;
  width?: string | number;
  sx?: object;
  children?: ReactNode;
}

const ToolbarButton = (props: ToolbarButtonProps) => {
  return (
    <Button
      variant={props.variant ?? "outlined"}
      onClick={props.onClick}
      disabled={props.disabled}
      sx={Object.assign(
        {
          margin: "0px",
          height: props.height ?? "2.5rem",
          width: props.width,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "12px",
        },
        props.sx
      )}
    >
      {props.children}
    </Button>
  );
};

export default ToolbarButton;
