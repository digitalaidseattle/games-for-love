import { Popup } from 'react-map-gl';
import { PopupInfo } from '../mapping/popuInfo';
import { Stack, Typography } from '@mui/material';

interface DASPopupProps {
    popupInfo: PopupInfo | null,
    onClose: () => void
}

export const DASPopup: React.FC<DASPopupProps> = ({
    popupInfo = null,
    onClose }) => {
    return (
        popupInfo &&
        <Popup
            anchor="top"
            longitude={Number(popupInfo.location.longitude)}
            latitude={Number(popupInfo.location.latitude)}
            onClose={() => onClose()} >
            <Stack>
                <Typography fontWeight={600}>
                    <a target="_new"
                        href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.location.name}`}
                    >{popupInfo.location.name}</a>
                </Typography>

                {popupInfo.members.length === 1 ?
                    <Stack>
                        <img src={popupInfo.members[0].url} />
                        <Typography fontWeight={600}>{popupInfo.members[0].name}</Typography>
                        <Typography fontWeight={400}>{popupInfo.members[0].role}</Typography>
                    </Stack>
                    :
                    <Typography>Home of {popupInfo.members.length} Cadre members</Typography>
                }
            </Stack>
        </Popup>);
}
