// Report.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';
import { tranList } from "../store/Data";

const Report = () => {
  // Using the imported tranList data
  const data = tranList.map(item => ({
    category: item.category,
    amount: item.amount,
  }));

  return (
    <Box>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Report;
