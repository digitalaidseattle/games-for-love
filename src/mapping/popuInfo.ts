import { Location } from "./location";
import { TeamMember } from "./memberService";

export type PopupInfo = {
    location: Location;
    members: TeamMember[];
}