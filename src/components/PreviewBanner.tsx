/**
 *  PreviewBanner.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { siteService } from "../services/siteUtils";

export const PreviewBanner: React.FC = () => {
  const [show, setShow] = useState<boolean>(true)
  return (
    siteService.isPreview() && (
      <Snackbar
        open={show}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setShow(false)}>
        <Alert
          onClose={() => setShow(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          This is a preview site.
        </Alert>
      </Snackbar>
    )
  );
};
