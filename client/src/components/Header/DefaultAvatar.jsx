import React from "react";

const DefaultAvatar = ({ name, size = 48 }) => {
  if (!name) return null;
  const initial = name.charAt(0).toUpperCase();

  const colors = [
    "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFC107", "#FF9800", "#FF5722",
  ];

  const colorIndex = initial.charCodeAt(0) % colors.length;
  const backgroundColor = colors[colorIndex];

  const style = {
    width: size,
    height: size,
    borderRadius: "50%",
    backgroundColor,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: size / 2,
    userSelect: "none",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  };

  return <div style={style}>{initial}</div>;
};

export default DefaultAvatar;
