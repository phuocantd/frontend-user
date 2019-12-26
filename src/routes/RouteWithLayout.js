import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class RouteWithLayout extends PureComponent {
  render() {
    const { path, exact, layout, component, authed, isLoggedIn } = this.props;
    if (authed && !isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <Route
        path={path}
        exact={exact}
        render={props =>
          React.createElement(
            layout,
            props,
            React.createElement(component, props)
          )
        }
      />
    );
  }
}

RouteWithLayout.defaultProps = {
  authed: false
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

export default connect(mapStateToProps)(RouteWithLayout);
