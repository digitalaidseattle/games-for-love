import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import arrow from "../../assets/handrawn-arrow.png";

const HospitalPageStatsSection = () => {
	const { hospital } = useContext(LearnMoreHospitalContext);
	const [stats, setStats] = useState<any[]>([]);
	const IMPACT_MESSAGE = "This is the impact people like you have made";

	useEffect(() => {
		if (hospital && hospital.matchedRequest && hospital.matchedFunded) {
			// From Frank 4/24
			// 1. Equipment to be Installed =  Hospital_Fundraising[“#Equipment Shipped”] / Hospital_Request[“Equipment Requested”]
			// 2. Kids Impacted = (Fundraising reached / Fundraising sought) * Hospital_Request[“Kids 3Y”] ) / Hospital_Request[“Kids 3Y”]
			// 3. Play sessions = (Fundraising reached / Fundraising sought) * Hospital_Request[“Play 3Y”] ) / Hospital_Request[“Play 3Y”]

			const percentage =
				hospital.matchedFunded.fundingCompleted /
				hospital.matchedRequest.requested;
			setStats([
				{
					startNumber: percentage * parseInt(hospital.matchedRequest.play3Y),
					endNumber: hospital.matchedRequest.play3Y ?? 0,
					label: "play sessions in 3 years",
					background:
						"linear-gradient(142.35deg, #FF6B6B -16.18%, #7B68EE 132.26%)",
				},
				{
					startNumber: hospital.matchedFunded.equipmentShipped ?? 0,
					endNumber: hospital.matchedRequest.equipReq ?? 0,
					label: "equipment installed",
					background:
						"linear-gradient(141.64deg, #2196F3 -6.39%, #50E3C2 96.87%)",
				},
				{
					startNumber: percentage * hospital.matchedRequest.kids3Y,
					endNumber: hospital.matchedRequest.kids3Y ?? 0,
					label: "kids impacted in 3 years",
					background:
						"linear-gradient(156.77deg, #7ED321 -11.18%, #F5D76E 111.48%)",
				},
			]);
		}
	}, [hospital]);

	return (
		stats.length > 0 && (
			<Box
				sx={{
					background: "linear-gradient(180deg, #FFFFFF 0%, #D8ECFF 100%)",
				}}
			>
				<Box
					sx={{
						position: "relative",
						top: "-3em",
						right: "-62em",
						transform: "rotate(-12deg)",
						width: "24em",
					}}
				>
					<img
						src={arrow}
						alt="decorative arrow pointing to impact statistics"
						style={{
							width: "5.5em",
							transform: "rotate(12deg)",
							position: "absolute",
							left: "-5em",
							top: "4em",
						}}
					/>
					<Typography
						variant="h5"
						sx={{
							width: "13em",
							fontFamily: "'Gloria Hallelujah', cursive",
							textAlign: "center",
							lineHeight: 2,
						}}
					>
						{IMPACT_MESSAGE}
					</Typography>
				</Box>
				<Box
					sx={{
						height: "30em",
						display: "flex",
						alignItems: "center",
					}}
				>
					<Stack
						direction={"row"}
						justifyContent="space-evenly"
						padding={9}
						sx={{ width: "100%" }}
					>
						{stats.map((stat, index) => (
							<Box key={index} sx={{ textAlign: "center" }}>
								<Stack
									direction={"column"}
									sx={{
										width: "24em",
										height: "13.5em",
										borderRadius: "1rem",
										background: stat.background,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										margin: "0 auto",
										boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
									}}
								>
									<Typography
										variant="h3"
										sx={{ color: "white", fontWeight: 700, lineHeight: 1.05 }}
									>
										{stat.startNumber.toFixed(0)}
									</Typography>
									<Typography
										variant="body1"
										sx={{
											color: "white",
											fontSize: "1.3em",
											fontStyle: "italic",
											fontWeight: 700,
										}}
									>
										of {stat.endNumber}
									</Typography>
									<Typography
										variant="body1"
										sx={{
											color: "white",
											fontSize: "1.5em",
											fontWeight: 700,
											lineHeight: 2.25,
										}}
									>
										{stat.label}
									</Typography>
								</Stack>
							</Box>
						))}
					</Stack>
				</Box>
			</Box>
		)
	);
};

export default HospitalPageStatsSection;
