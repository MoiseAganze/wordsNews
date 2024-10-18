import * as React from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, Outlet } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";

export default function ScrollableTabsButtonVisible() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
        }}
      >
        <Tab label="Tech" LinkComponent={Link} to="/tech" />
        <Tab label="Guerres" LinkComponent={Link} to="/guerres" />
        <Tab label="Météo" LinkComponent={Link} to="/meteo" />
      </Tabs>
      <Box pt={5} minHeight={"80vh"}>
        <Outlet />
      </Box>
      <Paper
        elevation={6}
        sx={{
          py: 3,
          mt: 5,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1">
            © {new Date().getFullYear()} infos-monde. fait par{" "}
            <b>Moise Aganze</b> . Tous droits réservés.
          </Typography>
        </Container>
      </Paper>
    </Box>
  );
}
