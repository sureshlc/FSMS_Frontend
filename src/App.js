import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Root from "./Pages/Root";
import "./App.css";
import MobileView from "./components/mobile-view";
import { createGlobalStyle } from "styled-components";
import { TimeoutProvider } from "./hooks/TimeOutProvider";

const queryClient = new QueryClient();

const App = () => {
  const GlobalStyle = createGlobalStyle`
   .mobile-view {
      display: none;
    }
    .desktop-view {
      display: block;
      height: 100%;
    }
 
  @media only screen and (max-width: 1200px) {
   
     .mobile-view {
    display: block;
    height: 100%;
  }

  .desktop-view {
    display: none;
  }
  }
  `;
  return (
    <QueryClientProvider client={queryClient}>
      <TimeoutProvider>
        <GlobalStyle />
        <div className="desktop-view">
          <Root />
        </div>
        <div className="mobile-view">
          <MobileView />
        </div>
      </TimeoutProvider>
    </QueryClientProvider>
  );
};

export default App;
