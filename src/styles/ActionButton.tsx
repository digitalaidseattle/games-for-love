/**
 *  ActionButton.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Button } from "@mui/material";

interface ActionButtonProps {
  disabled?: boolean;
  zIndex?: number;
  sx?: object;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const ActionButton = (props: ActionButtonProps) => {
  return (
    <Button
      disabled={props.disabled}
      variant="contained"
      href="#"
      sx={{
        width: "100%",
        height: "2.5rem",
        borderRadius: "12px",
        textTransform: "none",
        ...(props.zIndex !== undefined ? { zIndex: props.zIndex } : {}),
        ...props.sx,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default ActionButton;
