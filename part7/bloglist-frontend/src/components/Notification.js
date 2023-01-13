// import React from "react";

// const Notification = ({ notification }) => {
//   if (notification === null) {
//     return null;
//   }

//   return <div className={notification.type}>{notification.message}</div>;
// };

// export default Notification;

import React from "react";
import { connect } from "react-redux";


const Notification = (props) => {
  const notification = props.notification;

  const style = {
    border: "solid green",
    padding: 10,
    borderWidth: 2,
  };

  return (
    <div>
          {console.log(notification)}

      {notification && <div style={style}>{notification}</div>}</div>)
};
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
