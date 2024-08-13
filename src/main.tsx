import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//use managing and caching remote data
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <QueryClientProvider client={queryClient}>
            <App />
            {/* <ReactQueryDevtools /> */}
          </QueryClientProvider>
        </ChakraProvider>
      {/* </LocalizationProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
