import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import Rule from "./components/rule";

const initialRule = {
  id: "0194f8cf-3caa-79cb-b0a6-69d715fd34e3",
  name: "Template Customer Discount Prediction",
  rules: {
    all: [],
    or: [],
    and: [],
  },
};

const RuleCreator = () => {
  const [jsonData, setJsonData] = useState(initialRule);
  const [ruleType, setRuleType] = useState("all");

  const updateJsonData = (ruleIndex, updateNewData) => {
    setJsonData((prevData) => {
      const updatedRules = [...prevData.rules[ruleType]];
      updatedRules[ruleIndex] = updateNewData(updatedRules[ruleIndex]);
      return { ...prevData, rules: { ...prevData.rules, [ruleType]: updatedRules } };
    });
  };

  const addRule = () => {
    setJsonData((prevData) => ({
      ...prevData,
      rules: { ...prevData.rules, [ruleType]: [...prevData.rules[ruleType], { name: "Rule Name", steps: { or: [], and: [], all: [] } }] },
    }));
  };

  const deleteRule = (ruleIndex) => {
    setJsonData((prevData) => ({
      ...prevData,
      rules: { ...prevData.rules, [ruleType]: prevData.rules[ruleType].filter((rule, index) => index !== ruleIndex) },
    }));
  };

  return (
    <div className="main">
      <div className="ruleRoot">
        <Typography variant="h5"> Rule Creator</Typography>
            <div className="blockWrapper">
            <Select className="selectItem" value={ruleType} onChange={(e) => setRuleType(e.target.value)}>
              <MenuItem value="all">ALL</MenuItem>
              <MenuItem value="or">OR</MenuItem>
              <MenuItem value="and">AND</MenuItem>
            </Select>
            <Button variant="contained" onClick={addRule}>Add Rule</Button>
              </div>
            {jsonData.rules[ruleType].map((rule, ruleIndex) => (
              <Rule key={ruleIndex} rule={rule} ruleIndex={ruleIndex} updateJsonData={updateJsonData} deleteRule={deleteRule} />
            ))}
      </div>
      <div className="output">
        <pre>{JSON.stringify(jsonData, '', 2)}</pre>
      </div>
    </div>
  );
};

export default RuleCreator;