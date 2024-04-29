import { Box, Container, Grid, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { FullscreenControl, GeolocateControl, Marker, NavigationControl, ScaleControl } from 'react-map-gl';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

import './App.css';
import { DASPopup } from './components/DASPopup';
import { Pin } from './components/Pin';

import { Location } from './mapping/location';
import { mappingService } from './mapping/memberService';
import { PopupInfo } from './mapping/popuInfo';
import { TeamMember } from './mapping/teamMember';

const MAP_HEIGHT = '90vh';

// Seattle
const DEFAULT_VIEW = {
  longitude: -122.4,
  latitude: 47.6061,
  zoom: 7
}
// TeamMembers do not have lat & long
function App() {
  const [viewState, setViewState] = useState(DEFAULT_VIEW);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [people, setPeople] = useState<TeamMember[]>([]);
  const [pins, setPins] = useState<ReactNode[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    Promise
      .all([
        mappingService.getPeople(),
        mappingService.getLocations()
      ])
      .then(resps => {
        setPeople(resps[0].sort((p1, p2) => p1.name.localeCompare(p2.name)))
        setLocations(resps[1]);
      });
  }, []);

  useEffect(() => {
    setPins(mappingService
      .unique(locations)
      .map((loc, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={loc.longitude}
          latitude={loc.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            handleMarkerSelection(loc);
          }}
        >
          <Pin />
        </Marker>
      )))
  }, [locations])

  const handleMarkerSelection = (loc: Location) => {
    const peeps = mappingService.getPeopleAt(people, locations, loc)
    setPopupInfo({
      location: loc,
      members: peeps
    });
  }

  // show that person and center on them
  const handlePeopleSelection = (person: TeamMember) => {
    const loc = locations.find(l => l.name === person.location.trim());
    if (loc) {
      setViewState({
        longitude: loc.longitude,
        latitude: loc.latitude,
        zoom: viewState.zoom
      });
      setPopupInfo({
        location: loc,
        members: [person],
      });
    }
  }

  return (
    <Container sx={{ width: '100vh', height: '100vh' }}>
      <Grid container width={'100%'}>
        <Grid item xs={12} lg={3}>
          <Paper style={{ maxHeight: MAP_HEIGHT, overflow: 'auto' }}>
            <List >
              {people.map((p, idx) =>
                <ListItem key={('p' + idx)}>
                  <ListItemButton
                    onClick={() => handlePeopleSelection(p)}>
                    <ListItemText
                      primary={p.name} />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Box height={MAP_HEIGHT}>
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              mapStyle={`${import.meta.env.VITE_MAP_STYLE}?key=${import.meta.env.VITE_MAPTILER_API_KEY}`}
            >
              {/* <GeolocateControl position="top-left" /> */}
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />
              <ScaleControl />
              {pins}
              <DASPopup popupInfo={popupInfo} onClose={() => setPopupInfo(null)} />
            </Map>
          </Box>
        </Grid>
      </Grid>
    </Container >
  )
}

export default App
