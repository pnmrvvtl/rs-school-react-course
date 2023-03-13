import React, { Component, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface Props {
  children?: ReactNode;
}

export class Navigation extends Component<Props> {
  render() {
    return (
      <div>
        navigation
        {this.props.children || <Outlet />}
      </div>
    );
  }
}

export default Navigation;
