import React from "react";

const DefaultAvatar = ({ name, size = 40, avatarUrl }) => {
  const fullAvatarUrl =
    avatarUrl?.startsWith("http") || avatarUrl?.startsWith("data:")
      ? avatarUrl
      : avatarUrl
      ? `${import.meta.env.VITE_API_URL.replace("/api", "")}${avatarUrl}`
      : null;

  if (fullAvatarUrl) {
    return (
      <img
        src={fullAvatarUrl}
        alt={name}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="bg-gray-500 text-white flex items-center justify-center rounded-full"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
};

export default DefaultAvatar;
