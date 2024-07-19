import { Box, Container, Grid, Paper } from '@mui/material';
import 'maplibre-gl/dist/maplibre-gl.css';
import {useEffect, useState } from 'react';
import {GFLMap} from './components/GFLMap';
import './App.css';
import { PopupInfo } from './models/popupInfo';
import { HospitalInfo } from './models/hospitalInfo';
import { generalInfoService } from './services/generalInfo/generalInfoService';
import { hospitalInfoService } from './services/hospitalInfo/hospitalInfoService';
import { hospitalRequestService } from './services/hospitalRequest/hospitalRequestService';
import { hospitalFundedService } from './services/hospitalFunded/hospitalFundedService';

const MAP_HEIGHT = '100vh';

// Seattle
const DEFAULT_VIEW = {
  longitude: -122.4,
  latitude: 47.6061,
  zoom: 10
};

function App() {
  const [viewState, setViewState] = useState(DEFAULT_VIEW);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [hospitals, setHospitals] = useState<HospitalInfo[]>([]);

  useEffect(() => {
    hospitalInfoService.getHospitalInfo().then((res: HospitalInfo[]) => {
      const closedHospitals = res.filter(hospital => hospital.status === 'Closed');
      console.log("Closed Hospitals:", closedHospitals);
      setHospitals(closedHospitals);
    });
    generalInfoService.getGeneralInfo().then((res) => console.log(res));
    hospitalRequestService.getHospitalRequest().then((res) => console.log(res));
    hospitalFundedService.getHospitalFunded().then((res) => console.log(res));
  }, []);

  return (
    <Container sx={{ width: '100vw', height: '100vh' }}>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Paper style={{ maxHeight: MAP_HEIGHT, overflow: 'auto' }}>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Box width={'75vw'} height={MAP_HEIGHT}>
            <GFLMap hospitals={hospitals} viewState={viewState} setViewState={setViewState} setPopupInfo={setPopupInfo} popupInfo={popupInfo}/>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
