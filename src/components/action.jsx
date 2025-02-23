
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

const Action = ({ action, updateAction, deleteAction }) => (
  <div className="blockWrapper">
      <TextField label="Action" value={action.action} onChange={(e) => updateAction({ ...action, action: e.target.value })} />
      <TextField label="Text" value={action.text} onChange={(e) => updateAction({ ...action, text: e.target.value })} />
      <IconButton onClick={deleteAction}><Delete /></IconButton>
    </div>
  );

export default Action;