import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  const notification = props.notification;
  const style = {
    border: "solid green",
    padding: 10,
    borderWidth: 3,
  };
  return <div>{notification && <div style={style}>{notification}</div>}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
