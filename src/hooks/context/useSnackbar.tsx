import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarContextType {
  showError: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar باید درون SnackbarProvider استفاده شود.");
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showError = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showError }}>
      {children}
      <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
        <Alert severity="error">{message}</Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
