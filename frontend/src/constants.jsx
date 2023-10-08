const filterSelectOptions = ["Title", "Location", "Bedrooms", "Bathrooms"];
const headerMenuOptions = [
	{
		buttonName: "My Rooms",
		options: ["Manage Rooms", "History"],
	},
	{
		buttonName: "Help",
		options: ["FAQ", "Chat with BOT", "Chat with Agent"],
	},
];
const headerLargeDisplay = { xs: "none", sm: "flex" };
const headerSmallDisplay = { xs: "flex", sm: "none" };

export {
	filterSelectOptions,
	headerMenuOptions,
	headerLargeDisplay,
	headerSmallDisplay,
};
