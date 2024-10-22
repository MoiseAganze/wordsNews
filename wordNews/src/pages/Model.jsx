import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, AlertTitle, Box, Grid2, LinearProgress } from "@mui/material";
import CardNew from "../_components/CardNew";

// import translate from "@vitalets/google-translate-api";
function Model({ url, cle }) {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchDatas = async () => {
      // const url =
      //   "https://api.worldnewsapi.com/search-news?text=earth+quake&language=en&earliest-publish-date=2024-04-01";
      const api_key = "54d301b298e74b77a16109d9741fe312";
      const headers = {
        "x-api-key": api_key,
      };
      await axios
        .get(url, { headers: headers })
        .then(async (res) => {
          console.log(res);
          setDatas(res.data.news);

          setItemWithExp(cle, res.data.news, 1000 * 60 * 60 * 24);
          setLoading(false);
        })
        .catch((res) => {
          console.log(res);

          setError(true);
        });
    };

    const storage = localStorage.getItem(cle);
    if (storage) {
      const item = JSON.parse(storage);
      const now = new Date();
      if (now >= item.exp) {
        fetchDatas();
      } else {
        setDatas(item.value);
        setLoading(false);
      }
    } else {
      fetchDatas();
    }
  }, []);
  return (
    <>
      {loading && (
        <Box sx={{ width: "100%", my: 3 }}>
          <LinearProgress />
        </Box>
      )}
      {!loading && datas.length == 0 && (
        <Alert severity="error">
          <AlertTitle>Oups!</AlertTitle>
          Tous les infos pour aujourd'hui ont été consomés, revenez demain ou
          plus tard aujourd'hui
        </Alert>
      )}
      <Grid2 container spacing={2} justifyContent={"center"} p={2}>
        {datas.map((item, i) => (
          <Grid2 item key={i} md={6}>
            <CardNew datas={item} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}

export default Model;

function setItemWithExp(key, value, exp) {
  const now = new Date();
  const item = {
    value: value,
    exp: now.getTime() + exp,
  };
  localStorage.setItem(key, JSON.stringify(item));
}
