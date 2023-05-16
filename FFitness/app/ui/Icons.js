import React from 'react';
import {Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome,
}

const Icon = ({ type, name, color, size = 28, style }) => {
  const fontSize = 24;
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag name={name} size={size || fontSize} color={color} style={style} />
      )}
    </>
  )
}

export default Icon