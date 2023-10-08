import React, { useContext, useState } from "react";
import CottageIcon from "@mui/icons-material/Cottage";
import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import GenericDrawer from "@/components/GenericDrawer";
import CustomSearchBar from "@/components/SearchInput";
import {
	headerLargeDisplay,
	headerMenuOptions,
	headerSmallDisplay,
} from "@/constants";
import RoomsContext from "@/roomsContext";

export default function MobileHeader() {
	const { search, setPage, setSearch } = useContext(RoomsContext);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [searchDisplay, setSearchDisplay] = useState("");

	const clearSearch = () => {
		setPage(1);
		setSearch("");
		setSearchDisplay("");
	};

	const handleSearchDisplayChange = (e) => {
		setSearchDisplay(e.target.value);
	};

	const handleSearchKeyDown = (e) => {
		if (e.key == "Enter") {
			setPage(1);
			setSearch(e.target.value);
		}
	};

	const renderLargeMenuBtns = (option) => {
		const { buttonName, options } = option;
		const [anchorEl, setAnchorEl] = useState(null);
		const open = Boolean(anchorEl);
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		return (
			<div className="nav-wrapper">
				<Button
					key={buttonName}
					onClick={handleClick}
					sx={{ color: "white", display: "block", my: 2 }}
				>
					{buttonName}
				</Button>
				<Menu
					anchorEl={anchorEl}
					anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
					aria-labelledby="large-menu"
					id="large-menu"
					onClose={handleClose}
					open={open}
					transformOrigin={{ horizontal: "left", vertical: "top" }}
				>
					{options.map((item) => {
						return (
							<MenuItem key={item} onClick={handleClose}>
								{item}
							</MenuItem>
						);
					})}
				</Menu>
			</div>
		);
	};

	const renderTitle = (size) => {
		return (
			<>
				<CottageIcon
					sx={{
						display: size === "small" ? headerSmallDisplay : headerLargeDisplay,
						mr: 1,
					}}
				/>
				<Typography
					className={search !== "" && "hover"}
					component="a"
					noWrap
					onClick={clearSearch}
					sx={{
						color: "inherit",
						display: size === "small" ? headerSmallDisplay : headerLargeDisplay,
						fontFamily: "BlinkMacSystemFont",
						fontWeight: 700,
						mr: 2,
						textDecoration: "none",
					}}
					variant={size === "small" ? "h6" : "h5"}
				>
					StayIn
				</Typography>
			</>
		);
	};

	return (
		<AppBar className="header">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<GenericDrawer
						data={headerMenuOptions}
						onClose={() => setDrawerOpen(false)}
						open={drawerOpen}
					/>
					{renderTitle("large")}
					<Box
						sx={{
							flexGrow: 1,
							display: headerSmallDisplay,
							alignItems: "center",
						}}
					>
						<IconButton
							aria-controls="menu-appbar"
							aria-label="drawer"
							aria-haspopup="true"
							color="inherit"
							onClick={() => setDrawerOpen(true)}
							size="large"
						>
							<MenuIcon />
						</IconButton>
						{renderTitle("small")}
					</Box>
					<Box sx={{ flexGrow: 1, display: headerLargeDisplay }}>
						{headerMenuOptions.map((option) => {
							return renderLargeMenuBtns(option);
						})}
					</Box>
					<CustomSearchBar
						onChange={handleSearchDisplayChange}
						onKeyDown={handleSearchKeyDown}
						value={searchDisplay}
					/>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
