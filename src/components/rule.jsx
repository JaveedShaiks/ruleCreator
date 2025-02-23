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

import Step from "./step"


const Rule = ({ rule, ruleIndex, updateJsonData, deleteRule }) => {
    const [stepType, setStepType] = useState("or");
  
    const addStep = () => {
      updateJsonData(ruleIndex, (prevRule) => ({
        ...prevRule,
        steps: {
          ...prevRule.steps,
          [stepType]: [
            ...prevRule.steps[stepType],
            { name: "Step Name", on_success: [], conditions: { and: [], or: [], all: [] } },
          ],
        },
      }));
    };
  
    return (
      <Card style={{ marginBottom: 10 }}>
        <CardContent>
        <div className="blockWrapper">
          <TextField
            label="Rule Name"
            value={rule.name}
            onChange={(e) => updateJsonData(ruleIndex, (prevRule) => ({ ...prevRule, name: e.target.value }))}
          />
          <Select value={stepType} onChange={(e) => setStepType(e.target.value)}>
            <MenuItem value="or">OR</MenuItem>
            <MenuItem value="and">AND</MenuItem>
            <MenuItem value="all">ALL</MenuItem>
          </Select>
          <Button variant="outlined" onClick={addStep}>Add Step</Button>
          <IconButton onClick={() => deleteRule(ruleIndex)}><Delete /></IconButton>
          </div>
          {rule.steps[stepType].map((step, stepIndex) => (
            <Step key={stepIndex} step={step} stepIndex={stepIndex} ruleIndex={ruleIndex} stepType={stepType} updateJsonData={updateJsonData} />
          ))}
        </CardContent>
      </Card>
    );
  };

  export default Rule;
  