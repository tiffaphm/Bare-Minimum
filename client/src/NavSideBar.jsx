import React from "react";
import { Button, Navbar, Nav, NavItem } from "react-bootstrap";

const NavSideBar = () => {
  return (
    <Navbar className="navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">V2 Travels</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse id="navbarResponsive">
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <Nav className="navbar-nav navbar-sidenav">
            <NavItem data-toggle="tooltip" data-placement="right" title="Dashboard">
              <a className="nav-link" href="charts.html">
                <i className="fa fa-fw fa-dashboard"></i>
                <span className="nav-link-text">Dashboard</span>
              </a>
            </NavItem>
            <NavItem data-toggle="tooltip" data-placement="right" title="Charts">
              <a className="nav-link" href="charts.html">
                <i className="fa fa-fw fa-area-chart"></i>
                <span className="nav-link-text">Charts</span>
              </a>
            </NavItem>
            <NavItem data-toggle="tooltip" data-placement="right" title="Tables">
              <a className="nav-link" href="tables.html">
                <i className="fa fa-fw fa-table"></i>
                <span className="nav-link-text">Tables</span>
              </a>
            </NavItem>
            <NavItem data-toggle="tooltip" data-placement="right" title="Pages">
              <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapsePages" data-parent="#exampleAccordion">
                <i className="fa fa-fw fa-file"></i>
                <span className="nav-link-text">Pages</span>
              </a>
              <ul className="sidenav-second-level collapse" id="collapseExamplePages">
              <li>
                <a href="navbar.html">Navbar</a>
              </li>
              <li>
                <a href="cards.html">Cards</a>
              </li>
            </ul>
            </NavItem>
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavSideBar;
