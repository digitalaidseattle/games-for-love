import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

const HospitalPageFooter = () => {
  return (
    <React.Fragment>
      <Divider />
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={4}>
          {/* Section 1 */}
          <Grid container xs={12} sm={5} md={5}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ marginBottom: 2, paddingTop: 2, paddingBottom: 2 }}
              >
                Games For Love
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link href="#" color="inherit" underline="hover">
                <FacebookRoundedIcon
                  fontSize="large"
                  sx={{ color: "#828282" }}
                />
              </Link>
              <Link href="#" color="inherit" underline="hover">
                <FacebookRoundedIcon
                  fontSize="large"
                  sx={{ color: "#828282" }}
                />
              </Link>

              <Link href="#" color="inherit" underline="hover">
                <FacebookRoundedIcon
                  fontSize="large"
                  sx={{ color: "#828282" }}
                />
              </Link>
              <Link href="#" color="inherit" underline="hover">
                <FacebookRoundedIcon
                  fontSize="large"
                  sx={{ color: "#828282" }}
                />
              </Link>
            </Grid>
          </Grid>

          {/* Section 2 */}
          <Grid item xs={12} sm={2} md={2}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Topic
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">
                Page
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Page
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Page
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Page
              </Link>
              <br />
            </Typography>
          </Grid>

          {/* Section 3 */}
          <Grid item xs={12} sm={2} md={2}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Topic
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">
                Page
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Page
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Page
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Page
              </Link>
              <br />
            </Typography>
          </Grid>

          {/* Section 4 */}
          <Grid item xs={12} sm={2} md={2}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Topic
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">
                Page
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Page
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Page
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Page
              </Link>
              <br />
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default HospitalPageFooter;
