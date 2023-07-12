import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import PluginPage from "./pages/PlugPage";
import "./styles/App.css"
import './fonts/CascadiaCode.ttf';
import TerminalPage from "./pages/TerminalPage";

const root = ReactDOM.createRoot(
  document.body as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="|sfm/plugins/*" element={<PluginPage />}/>
          <Route path="|sfm/terminal" element={<TerminalPage/>}/>
          <Route path="*" element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
