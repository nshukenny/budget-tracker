import React from 'react';
import { Card, CardContent, Typography, Button} from '@mui/material';

const TransactionCard = ({ transaction, onEditClick, onDeleteClick}) => {
  return (
    <Card sx={{ flexBasis: 'calc(33.33% - 10px)', margin: '5px', width: '100%' }}>
      <CardContent>
        <Typography variant="h6" color="blue">
          Title: {transaction.title}
        </Typography>
        <Typography variant="h6" color="red">
          Date: {transaction.date}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Category: {transaction.category}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Amount: {transaction.amount}
        </Typography>
        <Typography variant="h6" color="gray">
          Description: {transaction.description}
        </Typography>
        <Button onClick={() => onEditClick(transaction)}>Edit</Button>
        <Button onClick={() => onDeleteClick(transaction.id)}>Delete</Button>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
