import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import {
	DonationHospitalContext,
	LearnMoreHospitalContext,
} from "../../context/SelectedHospitalContext";
import { DonationContext } from "../../context/DonationContext";

export interface HospitalPageBaseComponentProps {
	image?: string | JSX.Element;
	header?: string;
	paragraph?: string;
	shortParagraph?: string;
	button?: boolean;
	styles?: {
		container?: React.CSSProperties;
		imageContainer?: React.CSSProperties;
		header?: React.CSSProperties;
		paragraph?: React.CSSProperties;
		shortParagraph?: React.CSSProperties;
		button?: React.CSSProperties;
	};
}
const HospitalPageBaseComponent: React.FC<HospitalPageBaseComponentProps> = ({
	image,
	header,
	paragraph,
	shortParagraph,
	button = false,
	styles = {
		container: {},
		imageContainer: {},
		header: {},
		shortParagraph: {},
		paragraph: {},
	},
}: HospitalPageBaseComponentProps) => {
	const { hospital, setHospital } = useContext(LearnMoreHospitalContext);
	const { setDonateOverlayOpen } = useContext(DonationContext);
	const { setHospital: setDonationHospital } = useContext(
		DonationHospitalContext
	);

	function handleDonate(): void {
		setDonationHospital(hospital);
		setDonateOverlayOpen(true);
		setHospital(undefined);
	}

	return (
		<Box sx={{ paddingX: { xs: "2rem", lg: "4rem" }, paddingY: "6rem" }}>
			{/* Header Section */}
			<Typography
				variant="h4"
				sx={{
					fontSize: { xs: "2rem", lg: "3rem" },
					fontWeight: 600,
					textAlign: "center",
					mb: 3,
					...styles.header,
				}}
			>
				{header}
			</Typography>

			{/* Content Section */}
			<Grid
				container
				spacing={4}
				alignItems="flex-start"
				padding={4}
				sx={{ ...styles.container }}
			>
				{/* Image Section */}
				{image && (
					<Grid item xs={12} lg={5}>
						<Box
							sx={{
								width: "100%",
								height: 400,
								backgroundColor: "black",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								borderRadius: "15px",
								overflow: "hidden",
								...styles.imageContainer,
							}}
						>
							{typeof image === "string" ? (
								<img
									src={image}
									alt="Impact"
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
									}}
								/>
							) : (
								image
							)}
						</Box>
					</Grid>
				)}
				{/* Text Content Section */}
				<Grid item xs={12} lg={image ? 7 : 12}>
					{shortParagraph && (
						<Typography
							variant="h5"
							color="textSecondary"
							mb={2}
							sx={{ textAlign: "center", ...styles.shortParagraph }}
						>
							{shortParagraph}
						</Typography>
					)}
					{paragraph &&
						paragraph.split("\n").map((para, index) => (
							<Typography
								key={index}
								variant="body1"
								color="textSecondary"
								mb={2}
								sx={{ color: "#000", textAlign: "left", ...styles.paragraph }}
							>
								{para}
							</Typography>
						))}
				</Grid>

				{/* Donate Now Button */}
				{button && hospital?.status === "active" && (
					<Grid item xs={12}>
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<Button
								variant="contained"
								sx={{
									width: "30em",
									height: "4em",
									borderRadius: "15px",
									fontWeight: 600,
									cursor: "pointer",
									textTransform: "none",
									color: "#fff",
									backgroundColor: "#4A24E7",
									...styles.button,
								}}
								onClick={() => handleDonate()}
							>
								Donate now - make a difference
							</Button>
						</Box>
					</Grid>
				)}
			</Grid>
		</Box>
	);
};

export default HospitalPageBaseComponent;
