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


import Condition from "./condition";

import Action from "./action";

const Step = ({ step, stepIndex, ruleIndex, stepType, updateJsonData }) => {
    const [conditionType, setConditionType] = useState("and");
  
    const updateStep = (updateNewData) => {
      updateJsonData(ruleIndex, (prevRule) => {
        const updatedSteps = [...prevRule.steps[stepType]];
        updatedSteps[stepIndex] = updateNewData(updatedSteps[stepIndex]);
        return { ...prevRule, steps: { ...prevRule.steps, [stepType]: updatedSteps } };
      });
    };
  
    const addCondition = () => {
      updateStep((prevStep) => ({
        ...prevStep,
        conditions: {
          ...prevStep.conditions,
          [conditionType]: [...prevStep.conditions[conditionType], { metric: "", operator: "", value: "" }],
        },
      }));
    };
  
    const deleteCondition = (conditionIndex) => {
      updateStep((prevStep) => ({
        ...prevStep,
        conditions: {
          ...prevStep.conditions,
          [conditionType]: prevStep.conditions[conditionType].filter((_, index) => index !== conditionIndex),
        },
      }));
    };
  
    const addAction = () => {
      updateStep((prevStep) => ({
        ...prevStep,
        on_success: [...prevStep.on_success, { action: "", text: "" }],
      }));
    };
  
    const deleteAction = (actionIndex) => {
      updateStep((prevStep) => ({
        ...prevStep,
        on_success: prevStep.on_success.filter((_, index) => index !== actionIndex),
      }));
    };
  
    const deleteStep = () => {
      updateJsonData(ruleIndex, (prevRule) => ({
        ...prevRule,
        steps: {
          ...prevRule.steps,
          [stepType]: prevRule.steps[stepType].filter((_, index) => index !== stepIndex),
        },
      }));
    };
  
    return (
      <Card style={{ margin: 10, padding: 15 }}>
       <div className="blockWrapper">
              <TextField 
                label="Step Name" 
                value={step.name} 
                onChange={(e) => updateStep((prevStep) => ({ ...prevStep, name: e.target.value }))} 
              />
             
              <Select value={conditionType} onChange={(e) => setConditionType(e.target.value)}>
                <MenuItem value="and">AND</MenuItem>
                <MenuItem value="or">OR</MenuItem>
                <MenuItem value="all">ALL</MenuItem>
              </Select>
              <Button variant="outlined" onClick={addCondition}>Add Condition</Button>
              <Button variant="outlined" onClick={addAction}>Add Action</Button>
              <IconButton onClick={deleteStep}><Delete /></IconButton>
      </div>
   <Typography style={{marginBottom: "1rem"}}>Conditions:</Typography>
        {step.conditions[conditionType].map((condition, conditionIndex) => (
          <Condition key={conditionIndex} condition={condition} updateCondition={(updatedCondition) => {
            updateStep((prevStep) => {
              const updatedConditions = [...prevStep.conditions[conditionType]];
              updatedConditions[conditionIndex] = updatedCondition;
              return { ...prevStep, conditions: { ...prevStep.conditions, [conditionType]: updatedConditions } };
            });
          }} deleteCondition={() => deleteCondition(conditionIndex)} />
        ))}
        <Typography style={{marginBottom: "1rem"}}>Actions:</Typography>
        {step.on_success.map((action, actionIndex) => (
          <Action key={actionIndex} action={action} updateAction={(updatedAction) => {
            updateStep((prevStep) => {
              const updatedActions = [...prevStep.on_success];
              updatedActions[actionIndex] = updatedAction;
              return { ...prevStep, on_success: updatedActions };
            });
          }} deleteAction={() => deleteAction(actionIndex)} />
        ))}
      </Card>
    );
  };

  export default Step;