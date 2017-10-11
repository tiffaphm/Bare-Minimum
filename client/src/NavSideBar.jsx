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
        <Nav className="navbar-nav navbar-sidenav">
          <NavItem data-toggle="tooltip" data-placement="right" title="Dashboard" href="index.html">
              <i className="fa fa-fw fa-dashboard" />
              <span className="nav-link-text">Dashboard</span>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavSideBar;
