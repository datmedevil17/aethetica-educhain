import React, { useState, useEffect, useContext } from "react";
import { WalletContext } from "../context/WalletContext";

const Artists = () => {
     const { account, state } = useContext(WalletContext);
      const { core } = state;
      const artists = ["0x2F3E1B17d4A8F0115C68e9658D18325736dBDFca","0x2F55f5Aeb94A8b8E59E317D47754582bc16701fB"]
      for (let index = 0; index < artists.length; index++) {
        const element = artists[index];

      }
  return (
    <div>

    </div>
  )
}

export default Artists
