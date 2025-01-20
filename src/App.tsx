/**
 *  App.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Box, Grid } from "@mui/material";
import "maplibre-gl/dist/maplibre-gl.css";
import { useContext, useEffect, useState } from "react";
import { GFLMap } from "./components/GFLMap";
import { HospitalCardDetails } from "./components/HospitalCardDetails";
import { SearchAndSort } from "./components/SearchAndSort";

import "./App.css";

import { HospitalsContext } from "./context/HospitalContext";
import { hospitalService } from "./services/hospital/hospitalService";

const HospitalList = () => {
  const { hospitals } = useContext(HospitalsContext);
  return hospitals?.map((hospital, idx: number) => (
    <HospitalCardDetails key={`h-${idx})`} hospital={hospital} />
  ));
};

function App() {
  const { setOriginals } = useContext(HospitalsContext);
  const [windowHeight, setWindowHeight] = useState<number>(400);

  const getCombinedHospital = async () => {
    hospitalService.findAll().then((res) => setOriginals(res));
  };

  useEffect(() => {
    getCombinedHospital();

    setWindowHeight(window.innerHeight);

    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        {/* Hospital List Section */}
        <Grid
          item
          xs={12}
          sm={6} // sm: 600px 이상에서 50% 사용
          md={5} // md: 900px 이상에서 41.67% 사용
          lg={4} // lg: 1200px 이상에서 33.33% 사용
          xl={4} // xl: 1536px 이상에서 33.33% 사용
        >
          <Box
            sx={{
              height: "100vh", // 화면 높이를 꽉 채움
              overflowY: "auto", // 스크롤 가능
              padding: "16px", // 여백 추가
            }}
          >
            <SearchAndSort />
            <Box data-testid="hospital-list">
              <HospitalList />
            </Box>
          </Box>
        </Grid>

        {/* Map Section */}
        <Grid
          item
          xs={12}
          sm={6} // sm: 600px 이상에서 50% 사용
          md={7} // md: 900px 이상에서 58.33% 사용
          lg={8} // lg: 1200px 이상에서 66.67% 사용
          xl={8} // xl: 1536px 이상에서 66.67% 사용
        >
          <Box
            sx={{
              height: "100vh", // 화면 높이를 꽉 채움
              overflow: "hidden", // 넘침 방지
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GFLMap />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
