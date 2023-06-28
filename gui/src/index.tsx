import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import PluginPage from "./pages/PlugPage";

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
          
          <Route path="*" element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
