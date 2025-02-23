
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


const Condition = ({ condition, updateCondition, deleteCondition }) => (
  <div className="blockWrapper">
    
      <TextField label="Metric" value={condition.metric} onChange={(e) => updateCondition({ ...condition, metric: e.target.value })} />
     
                <Select
                              value={condition.operator}
                              onChange={(e) => updateCondition({ ...condition, operator: e.target.value })}
                            >
                              <MenuItem value="greater_than">Greater Than</MenuItem>
                              <MenuItem value="less_than">Less Than</MenuItem>
                              <MenuItem value="equals">Equals</MenuItem>
                            </Select>


      <TextField label="Value" value={condition.value} onChange={(e) => updateCondition({ ...condition, value: e.target.value })} />
      <IconButton onClick={deleteCondition}><Delete /></IconButton>
    </div>
  );

  export default Condition;