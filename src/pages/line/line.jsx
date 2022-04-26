import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CreateLine from "./create-line";
import ListLine from "./list-line";
import { AuthContext } from "../../contexts/auth.context";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const LinePage = () => {
  const { isAdmin, isStaff } = React.useContext(AuthContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Lines" {...a11yProps(0)} />
          {isAdmin || isStaff ? (
            <Tab label="Create line" {...a11yProps(1)} />
          ) : null}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ListLine />
      </TabPanel>
      {isAdmin || isStaff ? (
        <TabPanel value={value} index={1}>
          <CreateLine />
        </TabPanel>
      ) : null}
    </Box>
  );
};

export default LinePage;
