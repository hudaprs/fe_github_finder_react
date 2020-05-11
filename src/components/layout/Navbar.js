import React, { Component } from "react";
import PropTypes from "prop-types";

export class Navbar extends Component {
  static defaultProps = {
    title: "Github Finder",
    icon: "fab fa-github",
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
        <nav className="navbar bg-primary">
          <h1>
            <em className={this.props.icon}></em> {this.props.title}
          </h1>
        </nav>
      </div>
    );
  }
}

export default Navbar;
