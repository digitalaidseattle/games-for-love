/**
 * App.tsx
 */
import { Box, useMediaQuery, useTheme, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState, useRef } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

import { GFLMap } from "./components/GFLMap";
import { HospitalCardDetails } from "./components/HospitalCardDetails";
import { SelectedHospitalContext } from "./context/SelectedHospitalContext";
import { SearchAndSort } from "./components/SearchAndSort";

import { HospitalsContext } from "./context/HospitalContext";
import { hospitalService } from "./services/hospital/hospitalService";

import "maplibre-gl/dist/maplibre-gl.css";
import "react-reflex/styles.css";
import "./App.css";

import { DonateOverlay } from "./components/DonateOverlay";
import { DrawerWidthContext } from "./context/DrawerWidthContext";
import { FilterContext } from "./context/FilterContext";
import { LoadingContext } from "./context/LoadingContext";

import { WebGLBlockedBanner } from "./components/WebGLBlockedBanner";
import { checkWebGLSupport } from "./utils/webglSupport";

import * as styles from "./AppStyles";

// Shared list renderer
const HospitalList = ({ isMobileView }: { isMobileView: boolean }) => {
  const { hospitals } = useContext(HospitalsContext);
  const { hospital: selectedHospital, setHospital: setSelectedHospital } = useContext(SelectedHospitalContext);

  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (!selectedHospital) return;

    const e = cardRefs.current[selectedHospital.id];
    if (!e) return;

    e.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedHospital]);

  return (
    <>
      {hospitals?.map((hospital) => (
        <Box
          key={hospital.id}
          component="div"
          ref={(node: HTMLElement | null) => {
            cardRefs.current[hospital.id] = node;
          }}
          sx={styles.hospitalCardBox(isMobileView)}
          onClick={() => setSelectedHospital(hospital)}
        >
          <HospitalCardDetails hospital={hospital} />
        </Box>
      ))}
    </>
  );
};

// Laptop drawer element
const SizeAwareReflexElement = (props: {
  windowHeight: number;
  dimensions?: any;
}) => {
  const { setLastDrawerWidth } = useContext(DrawerWidthContext);

  useEffect(() => {
    if (props.dimensions?.width) {
      setLastDrawerWidth(props.dimensions.width);
    }
  }, [props.dimensions, setLastDrawerWidth]);

  return (
    <Box id="drawer" sx={styles.drawerBox(props.windowHeight)}>
      <SearchAndSort />
      <Box data-testid="hospital-list">
        <HospitalList isMobileView={false} />
      </Box>
    </Box>
  );
};

function App() {
  const { filters } = useContext(FilterContext);
  const { setOriginals } = useContext(HospitalsContext);
  const { drawerWidth } = useContext(DrawerWidthContext);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const { loading, setLoading } = useContext(LoadingContext);
  const { originals, setHospitals } = useContext(HospitalsContext);
  const [webglOk, setWebglOk] = useState(true);

  const theme = useTheme();
  // when screen size is < md change to mobile layout
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const result = checkWebGLSupport();
    setWebglOk(result.ok);
  }, []);

  useEffect(() => {
    setLoading(true);
    hospitalService
      .findAll()
      .then((res) => {
        const validHospitals = res.filter(hospitalService.isValid);
        setOriginals(validHospitals);
      })
      .finally(() => setLoading(false));
  }, [setOriginals]);

  useEffect(() => {
    if (!filters) {
      setHospitals(originals);
      return;
    }
    const filtered = originals.filter(hospitalService.filterPredicate(filters));

    // Apply sorting according to filters so manual toggles are preserved
    if (filters.sortDirection) {
      const sorted = [...filtered].sort(
        hospitalService.getSortComparator(filters),
      );
      setHospitals(sorted);
    } else {
      setHospitals(filtered);
    }
  }, [filters, originals, setHospitals]);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile Layout
  if (isMobileView) {
    return (
      <>
        <Box sx={styles.mobileRootBox}>
          {/* Full-screen map */}
          <Box sx={styles.mobileMapBox}>
            {webglOk ? <GFLMap isMobileView={isMobileView}/> : <WebGLBlockedBanner isMobileView={isMobileView} />}
          </Box>

          {/* Search and sort tool bar */}
          <Box sx={styles.mobileToolbarWrapperBox}>
            <Box sx={styles.mobileToolbarInnerBox}>
              <SearchAndSort />
            </Box>
          </Box>

          {/* Hospital cards */}
          <Box sx={styles.mobileHospitalOverlayBox}>
            <Box data-testid="hospital-list" sx={styles.mobileHospitalListBox}>
              <HospitalList isMobileView={true} />
            </Box>
          </Box>
        </Box>

        <DonateOverlay />
      </>
    );
  }

  // Laptop Broswer Layout
  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            inset: 0, // top:0, right:0, bottom:0, left:0
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.5)", // transparent white overlay
            backdropFilter: "blur(2px)", // optional: subtle blur
            zIndex: 1300, // above most content
          }}
        >
          <CircularProgress size={100} />
        </Box>
      )}
      <ReflexContainer orientation="vertical">
        <ReflexElement size={drawerWidth} propagateDimensions={true}>
          <SizeAwareReflexElement windowHeight={windowHeight} />
        </ReflexElement>

        <ReflexSplitter>
          <Box height={windowHeight} width={5}></Box>
        </ReflexSplitter>

        <ReflexElement>
          <Box height={windowHeight} data-testid="gfl-map-box" sx={{ position: "relative" }}>
            {webglOk ? <GFLMap isMobileView={isMobileView}/> : <WebGLBlockedBanner isMobileView={isMobileView} />}
          </Box>
        </ReflexElement>
      </ReflexContainer>
      <DonateOverlay />
    </>
  );
}

export default App;
