import React, { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
	Collapse,
	Drawer,
	List,
	ListItemButton,
	ListItemText,
} from "@mui/material";

export default function GenericDrawer(props) {
	const renderNestedListItem = (item) => {
		const [open, setOpen] = useState(false);
		const handleClick = () => setOpen(!open);

		return (
			<>
				<ListItemButton key={item.buttonName} onClick={handleClick}>
					<ListItemText primary={item.buttonName} />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{item.options.map((option) => {
							return (
								<ListItemButton key={option} sx={{ pl: 4 }}>
									<ListItemText primary={option} />
								</ListItemButton>
							);
						})}
					</List>
				</Collapse>
			</>
		);
	};

	return (
		<Drawer anchor="left" open={props.open} onClose={props.onClose}>
			<List>
				{props.data.map((item) => {
					if (item.hasOwnProperty("options")) {
						return renderNestedListItem(item);
					} else {
						return (
							<ListItemButton key={item.buttonName}>
								<ListItemText primary={item.buttonName} />
							</ListItemButton>
						);
					}
				})}
			</List>
		</Drawer>
	);
}
