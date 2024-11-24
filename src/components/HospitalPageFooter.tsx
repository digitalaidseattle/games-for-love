import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const HospitalPageFooter = () => {
  return (
    <React.Fragment>
      <Divider />
      <Box sx={{ backgroundColor: "#333", color: "#fff", padding: 4 }}>
        <Grid container spacing={4}>
          {/* Section 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              About Us
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </Typography>
          </Grid>

          {/* Section 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Quick Links
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">
                Home
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                About
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Services
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Contact
              </Link>
            </Typography>
          </Grid>

          {/* Section 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: info@example.com
              <br />
              Phone: +123 456 7890
              <br />
              Address: 123 Main Street, City, Country
            </Typography>
          </Grid>

          {/* Section 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Follow Us
            </Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">
                Facebook
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Twitter
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                LinkedIn
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Instagram
              </Link>
            </Typography>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box
          sx={{
            textAlign: "center",
            marginTop: 4,
            borderTop: "1px solid #444",
            paddingTop: 2,
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default HospitalPageFooter;
