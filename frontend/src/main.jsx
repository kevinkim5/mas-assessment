import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RoomsContextProvider } from "./roomsContext";
import "@/styles/styles.less";

ReactDOM.createRoot(document.getElementById("root")).render(
	<RoomsContextProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</RoomsContextProvider>,
);
