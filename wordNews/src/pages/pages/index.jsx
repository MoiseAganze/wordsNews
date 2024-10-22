import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, AlertTitle, Box, Grid2, LinearProgress } from "@mui/material";
import CardNew from "../../_components/CardNew";
import Model from "../Model";
// import translate from "@vitalets/google-translate-api";
export function Tech(props) {
  const url =
    "https://api.worldnewsapi.com/search-news?language=fr&earliest-publish-date=2024-10-10&sort-by=date&text=tech";
  return <Model url={url} cle="news-tech" />;
}

export function Guerres(props) {
  const url =
    "https://api.worldnewsapi.com/search-news?language=fr&earliest-publish-date=2024-10-10&sort-by=date&text=guerre,conflit,combat";

  return <Model url={url} cle="news-guerres" />;
}
export function Meteo(props) {
  const url =
    "https://api.worldnewsapi.com/search-news?language=fr&earliest-publish-date=2024-10-10&sort-by=date&text=climat";

  return <Model url={url} cle="news-meteo" />;
}
