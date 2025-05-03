import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "./Sidenav";
import Header from "./header";
import '../css/Sdashboard.css'
export default function StudentHome() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="home-container">
        <aside className="home-sidebar">
          <Sidenav />
        </aside>
        <main className="home-content">
          <Outlet context={{ searchQuery, setSearchQuery }} />
        </main>
      </div>
    </div>
  );
}