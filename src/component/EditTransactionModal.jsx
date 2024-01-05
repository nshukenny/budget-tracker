// EditTransactionForm.js

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const EditTransactionModal = ({ selectedTransaction, onEditConfirm, onClose }) => {
const [editedTransaction, setEditedTransaction] = useState(selectedTransaction);

const handleEditConfirm = () => {
    onEditConfirm(editedTransaction);
  };

  return (
    <form onSubmit={handleEditConfirm}>
      <TextField
        label="Title"
        variant="filled"
        value={editedTransaction.title}
        onChange={(e) =>
          setEditedTransaction({
            ...editedTransaction,
            title: e.target.value,
          })
        }
        fullWidth
      />
      <TextField
        label="Date"
        variant="filled"
        value={editedTransaction.date}
        onChange={(e) =>
          setEditedTransaction({
            ...editedTransaction,
            date: e.target.value,
          })
        }
        fullWidth
      />
      <TextField
        label="Category"
        variant="filled"
        value={editedTransaction.category}
        onChange={(e) =>
          setEditedTransaction({
            ...editedTransaction,
            category: e.target.value,
          })
        }
        fullWidth
      />
      <TextField
        label="Amount"
        variant="filled"
        value={editedTransaction.amount}
        onChange={(e) =>
          setEditedTransaction({
            ...editedTransaction,
            amount: e.target.value,
          })
        }
        fullWidth
      />
      <TextField
        label="Description"
        variant="filled"
        value={editedTransaction.description}
        onChange={(e) =>
          setEditedTransaction({
            ...editedTransaction,
            description: e.target.value,
          })
        }
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default EditTransactionModal;
