import React from "react";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function GenericCard(props) {
	const { bathrooms, bedrooms, image, location, title } = props.details;
	return (
		<Card className="room-card">
			<CardMedia
				className={props.dialog ? "dialog-media" : "card-media"}
				title={title}
			>
				<img
					alt={title}
					src={image}
					loading="lazy"
					style={{ borderRadius: "4px" }}
					width="100%"
				/>
			</CardMedia>
			<CardContent className="card-content">
				<Typography variant="h6">{title}</Typography>
				<div className="location-wrapper flex-align-center">
					<LocationOnOutlinedIcon className="location-icon" />
					<Typography variant="body2">{location}</Typography>
				</div>
				<div className="bath-bed-wrapper flex-align-center">
					<BedOutlinedIcon className="bath-bed" />
					<Typography>{bedrooms}</Typography>
					<BathtubOutlinedIcon className="bath-bed" />
					<Typography>{bathrooms}</Typography>
				</div>
			</CardContent>
		</Card>
	);
}
