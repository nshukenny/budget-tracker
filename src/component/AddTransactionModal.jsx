import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, MenuItem } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const categories = ['IT', 'FOOD', 'BEVERAGES'];

const AddTransactionModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !category.trim() || !amount.trim() || !description.trim()) {
      return;
    }
    onSubmit({ title, date, category, amount, description });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add Transaction</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField label="Title" variant="filled" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
          <TextField label="Date" variant="filled" value={date} onChange={(e) => setDate(e.target.value)} fullWidth />
          <TextField
            label="Category"
            variant="filled"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            select
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField label="Amount" variant="filled" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth />
          <TextField
            label="Description"
            variant="filled"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" endIcon={<SaveAltIcon />} sx={{ marginTop: '10px' }}>
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionModal;
