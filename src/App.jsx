import { __ } from "@wordpress/i18n";
import "./App.scss";
import Header from "./layouts/Header/Header";
// import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ImportExport from "./pages/ImportExport";
import More from "./pages/More";
import ComponentsBasic from "./pages/ComponentsBasic";
import CustomizerRedesignTemplate from "./pages/CustomizerRedesignTemplate";
import CustomizerRedesignBackground from "./pages/CustomizerRedesignBackground";
import CustomizerRedesignLogo from "./pages/CustomizerRedesignLogo";
import CustomizerRedesignForm from "./pages/CustomizerRedesignForm";
import ComponentsAdvanced from "./pages/ComponentsAdvanced";
import BasicTable from "./pages/BasicTable";
import AjaxTable from "./pages/AjaxTable";
import Page from "./pages/Page";
import Feedback from "./pages/Feedback";
import Footer from "./layouts/Footer/Footer";
import CustomizerRedesignFields from "./pages/CustomizerRedesignFields";
import CustomizerRedesignButton from "./pages/CustomizerRedesignButton";
import CustomizerRedesignOther from "./pages/CustomizerRedesignOther";
import CustomizerSettings from "./pages/CustomizerSettings";

import { useState } from "react";
import Tools from "./pages/Tools";

const NotFound = () => (
  <div>
    <h2>{__("404 - Page Not Found", "authpress")}</h2>
    <p>{__("The page you are looking for does not exist.", "authpress")}</p>
    <Link to="/">{__("Go back to Home", "authpress")}</Link>
  </div>
);
function App() {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <div className="authpress-settings-container">
      <Header />
      <Routes>
        {/* <Route path="/" element={<RestrictionsSettings handleChange={handleChange} />} /> */}
        {/* <Route path="/"  element={<Navigate to="/restrictions/settings" />} /> */}
        <Route path="/" element={<Dashboard />} />

        <Route path="/settings" element={<Navigate to="/settings/customizer/redesign/templates" />} />
        <Route path="/settings/customizer/redesign/templates" element={<CustomizerRedesignTemplate />} />
        <Route path="/settings/customizer/redesign/background" element={<CustomizerRedesignBackground />} />
        <Route path="/settings/customizer/redesign/logo" element={<CustomizerRedesignLogo />} />
        <Route path="/settings/customizer/redesign/form" element={<CustomizerRedesignForm />} />
        <Route path="/settings/customizer/redesign/fields" element={<CustomizerRedesignFields/>} />
        <Route path="/settings/customizer/redesign/button" element={<CustomizerRedesignButton/>} />
        <Route path="/settings/customizer/redesign/other" element={<CustomizerRedesignOther/>} />
        <Route path="/settings/customizer/settings" element={<CustomizerSettings/>} />

        <Route path="/settings/components" element={<Navigate to="/settings/components/basic" />} />
        <Route path="/settings/components/basic" element={<ComponentsBasic />} />
        <Route path="/settings/components/advanced" element={<ComponentsAdvanced />} />

        <Route path="/settings/components/datatable" element={<Navigate to="/settings/components/datatable/basic_table" />} />
        <Route path="/settings/components/datatable/basic_table" element={<BasicTable />} />
        <Route path="/settings/components/datatable/ajax_table" element={<AjaxTable />} />

        <Route path="/page" element={<Page />} />
        <Route path="/settings/import_export" element={<ImportExport />} />
        <Route path="/settings/more" element={<More />} />
        <Route path="/settings/tools" element={<Tools />} />
        <Route path="/settings/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>

      
    </div>
  );
}

export default App;
