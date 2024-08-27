import { useState } from "react";
import {
  Box,
  TextField,
  Chip,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Button,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface FilterComponentProps {
  onClose: () => void;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({
  onClose,
}) => {
  const [location, setLocation] = useState<string>("");
  const [fundingStatus, setFundingStatus] = useState({
    active: false,
    past: false,
    closeToFullyFunded: false,
    all: true,
  });
  const [sortBy, setSortBy] = useState<string>("");

  const handleApplyFilters = () => {
    onClose();
  };

  return (
    <>
      <Card sx={{ width: "420px", borderRadius: "15px", marginTop: "40px" }}>
        <CardContent>
          <Box sx={{ padding: 2, backgroundColor: "#fff" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box component="h2" m={0}>
                Filters
              </Box>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box>
              <Box>
                <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                  Location
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="City, state, or zip code"
                  onChange={(e) => setLocation(e.target.value)}
                  sx={{
                    mt: 2,
                    "& .MuiInputBase-root": {
                      backgroundColor: "#ededed",
                      borderRadius: "20px"
                    },
                  }}
                  value={location}
                />
              </Box>

              <Box mt={2} sx={{ color: "#fff" }}>
                {location && (
                  <Chip
                    label={location}
                    onDelete={() => setLocation("")}
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      ".MuiChip-deleteIcon": {
                        color: "#fff",
                      },
                    }}
                  />
                )}
              </Box>
            </Box>

            <FormControl component="fieldset" sx={{ mt: 2, mb: 1 }}>
              <FormLabel
                component="legend"
                sx={{ color: "#000", fontWeight: "bold" }}
              >
                Sort by
              </FormLabel>
              <RadioGroup
                aria-label="sort-by"
                name="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <FormControlLabel
                  value="recentToExpiring"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "black",
                        },
                        "&.Mui-focusVisible": {
                          outline: "2px solid black",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="Date: Recent to Expiring"
                />
                <FormControlLabel
                  value="expiringToRecent"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "black",
                        },
                        "&.Mui-focusVisible": {
                          outline: "2px solid black",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 20,
                        },
                      }}
                    />
                  }
                  label="Date: Expiring to Recent"
                />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{ color: "#000", fontWeight: "bold" }}
              >
                Funding Status
              </FormLabel>
              <FormGroup>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="active"
                          checked={fundingStatus.active}
                          onChange={(e) =>
                            setFundingStatus({
                              ...fundingStatus,
                              active: e.target.checked,
                            })
                          }
                          sx={{
                            "& .MuiSvgIcon-root": {
                              color: "#000",
                              "&.Mui-checked": {
                                color: "#000",
                              },
                              "&.Mui-focusVisible": {
                                outline: "2px solid #000",
                              },
                            },
                          }}
                        />
                      }
                      label="Active"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="past"
                          checked={fundingStatus.past}
                          onChange={(e) =>
                            setFundingStatus({
                              ...fundingStatus,
                              past: e.target.checked,
                            })
                          }
                          sx={{
                            "& .MuiSvgIcon-root": {
                              color: "#000",
                              "&.Mui-checked": {
                                color: "#000",
                              },
                              "&.Mui-focusVisible": {
                                outline: "2px solid #000",
                              },
                            },
                          }}
                        />
                      }
                      label="Past"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="closeToFullyFunded"
                          checked={fundingStatus.closeToFullyFunded}
                          onChange={(e) =>
                            setFundingStatus({
                              ...fundingStatus,
                              closeToFullyFunded: e.target.checked,
                            })
                          }
                          sx={{
                            "& .MuiSvgIcon-root": {
                              color: "#000",
                              "&.Mui-checked": {
                                color: "#000",
                              },
                              "&.Mui-focusVisible": {
                                outline: "2px solid #000",
                              },
                            },
                          }}
                        />
                      }
                      label="Close to fully funded"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="all"
                          checked={fundingStatus.all}
                          onChange={() =>
                            setFundingStatus({
                              active: false,
                              past: false,
                              closeToFullyFunded: false,
                              all: true,
                            })
                          }
                          sx={{
                            "& .MuiSvgIcon-root": {
                              color: "#000",
                              "&.Mui-checked": {
                                color: "#000",
                              },
                              "&.Mui-focusVisible": {
                                outline: "2px solid #000",
                              },
                            },
                          }}
                        />
                      }
                      label="All"
                    />
                  </Grid>
                </Grid>
              </FormGroup>
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: "#000",
                borderRadius: "40px",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#000",
                },
              }}
              onClick={handleApplyFilters}
            >
              Apply filters
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
