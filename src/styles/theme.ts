
export const OPEN_MARKER_COLOR = "#92C65E";
export const CLOSED_MARKER_COLOR = "#DB5757";
export const SELECTED_MARKER_COLOR = "#FFFF00";
export const SELECTED_BACKGROUD_COLOR = "#F0F5FA";
export const HIGHLIGHT_BACKGROUD_COLOR = "#FFFCD8";
export const BORDER_COLOR = "#d9d9d9";

export const getStatusColor = (status: "selected" | "past" | "active" | undefined) => {
  switch (status) {
    case "selected":
      return SELECTED_MARKER_COLOR;
    case "past":
      return CLOSED_MARKER_COLOR;
    case "active":
    default:
      return OPEN_MARKER_COLOR;
  }
}
