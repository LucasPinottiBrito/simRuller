'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

interface ReferenceDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (valueInCm: number) => void;
}

const ReferenceDialog: React.FC<ReferenceDialogProps> = ({ open, onClose, onSave }) => {
  const [value, setValue] = useState<string>('');

  const handleSave = () => {
    setValue(value.trim());
    setValue(value.replace(',', '.'));
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0) {
      onSave(num);
      setValue('');
    } else {
      alert('Por favor, insira um número válido maior que zero.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Referência de Medida</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Distância real entre os pontos (em cm)"
          type="number"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          inputProps={{ min: "0", step: "0.01" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReferenceDialog;
