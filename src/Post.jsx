import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { addTrans } from './TranReducer';
import { useDispatch, useSelector } from 'react-redux';


export default function Post({ addSavedTransaction }) {
  const trans = useSelector((state) => state.trans);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [nextId, setNextId] = useState(trans.length > 0 ? trans[trans.length - 1].id + 1 : 1);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !category.trim() || !amount.trim() || !description.trim()) {
      return;
    }

    dispatch(addTrans({ id: nextId, title, date,category,amount,description }));
    setTitle('');
    setDate('');
    setCategory('');
    setAmount('');
    setDescription('');
    setNextId(nextId + 1);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2, width: '15ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField id="filled-basic" label="title" variant="filled" onChange={(e) => setTitle(e.target.value)} />
      <TextField id="standard-basic" label="date" variant="standard" onChange={(e) => setDate(e.target.value)} />
      <TextField id="outlined-basic" label="category" variant="outlined" onChange={(e) => setCategory(e.target.value)} />
      <TextField id="filled-basic" label="amount" variant="filled" onChange={(e) => setAmount(e.target.value)} />
      <TextField id="standard-basic" label="description" variant="standard" onChange={(e) => setDescription(e.target.value)} />
      <Button variant="contained" endIcon={<SaveAltIcon />} type="submit">
        Save
      </Button>
    </Box>
  );
}
