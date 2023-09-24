import React, { useState } from 'react';
import {Box,Card,CardContent,Typography,Button,IconButton,Menu,MenuItem,Pagination, Dialog, DialogTitle, DialogContent,} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { tranList } from './Data';
import ConfirmationModal from './ConfirmationModal'; 
import { addTrans, deleteTrans, updateTrans } from './TranReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const Feed = () => {
  const trans = useSelector((state) => state.trans);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredTrans, setFilteredTrans] = useState(trans);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [nextId, setNextId] = useState(trans.length > 0 ? trans[trans.length - 1].id + 1 : 1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const FILTER_TRANSACTIONS = 'FILTER_TRANSACTIONS';
  const itemsPerPage = 6;
  const dispatch = useDispatch();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  useEffect(() => {
    if (searchQuery) {
      dispatch({ type: FILTER_TRANSACTIONS, searchQuery });
    }
  
    const filteredTrans = trans.filter(
      (tran) =>
        tran.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tran.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tran.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const sortedTrans = [...filteredTrans].sort((a, b) => {
      if (sortField === 'id') {
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      } else if (sortField === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });
  
    setFilteredTrans(sortedTrans);
  }, [trans, searchQuery, sortField, sortOrder, dispatch]);
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !category.trim() || !amount.trim() || !description.trim()) {
      return;
    }
    dispatch(addTrans({ id: nextId, title,date,category,amount,description }));
    setNextId(nextId + 1);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };




  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };


  const handleEditClick = (transaction) => {

    const editedTransaction = trans.find((t) => t.id === transaction.id);
    setSelectedTransaction(editedTransaction);
    setEditModalOpen(true);
  };
  
  

  const handleDeleteClick = (transaction) => {
    handleDeleteConfirm(transaction);
    setShowDeleteConfirmation(true);

  };

  const handleEditConfirm = () => {
    if (selectedTransaction) {
      dispatch(updateTrans(selectedTransaction));
      setEditModalOpen(false);
    }
  };
  
  

  const handleDeleteConfirm = (id) => {

    dispatch(deleteTrans({ id }));
    if (id === nextId - 1) {
      setNextId(nextId - 1);
    }
    setShowDeleteConfirmation(false);
  };
  const handleSearch = () => {

    dispatch({ type: FILTER_TRANSACTIONS, searchQuery });
  };
  const handleSort = () => {
    const sortedTrans = [...filteredTrans].sort((a, b) => {
      if (sortField === 'id') {
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      } else if (sortField === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

    setFilteredTrans(sortedTrans);
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const transactionsToDisplay = filteredTrans.slice(startIdx, endIdx);

  return (
    <Box>
          <Box>
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px' , justifyContent: 'space-between' }}>
    <TextField
  label=""
  variant="outlined"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  sx={{
    marginLeft: 'auto',
    border: '2px solid white', // Change the border color to blue
    borderRadius: 0,
    padding: 0,
    '& .MuiInputBase-input': {
      border: 'none',
      borderRadius: 0,
      padding: 0,
    },
  }}
/>
    <IconButton
      onClick={handleSearch}
      style={{ marginLeft: '-40px', background:'primary' }} 
    >
      <SearchIcon />
    </IconButton>
  </div>
    </Box>
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '45%', marginBottom:'2%'}}>
    <Button onClick={openAddModal} variant="contained" color="primary">
        Add
      </Button>
    </div>
    <Box>
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1%', marginTop:'-5%' }}>
    <div style={{ marginRight: '10px' }}>   
    <PopupState variant="popover" popupId="demo-popup-menu" >
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Sort By
          </Button>
          <Menu {...bindMenu(popupState)} >
            <MenuItem  onClick={() => {
                  setSortField('title');
                  popupState.close();
                }}>Title</MenuItem>
            <MenuItem                 onClick={() => {
                  setSortField('date');
                  popupState.close();
                }}>Date</MenuItem>
            <MenuItem                 onClick={() => {
                  setSortField('amount');
                  popupState.close();
                }}>Amount</MenuItem>
            <MenuItem                 onClick={() => {
                  setSortField('description');
                  popupState.close();
                }}>Description</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
</div>
<div style={{ marginRight: '10px' }}>
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
          Sort Order
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem                 onClick={() => {
                  setSortOrder('asc');
                  popupState.close();
                }}>Ascending</MenuItem>
            <MenuItem                 onClick={() => {
                  setSortOrder('desc');
                  popupState.close();
                }}>Descending</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
    </div>
    </div>
<Button onClick={handleSort}></Button>
    </Box>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {transactionsToDisplay.map((trans, index) => (
                 <Card
                 key={index}
                 sx={{
                   flexBasis: 'calc(33.33% - 10px)', 
                   margin: '5px',
                   width: '100%', 
                 }}
               >
          <CardContent>
            <Typography variant="h6" color="blue">
              Title: {trans.title}
            </Typography>
            <Typography variant="h6" color="red">
              Date:{trans.date}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Category:{trans.category}
            </Typography>
            <Typography variant="h6" color="text.primary">
              Amount:{trans.amount}
            </Typography>
            <Typography variant="h6" color="gray">
              Description:{trans.description}
            </Typography>
            <Button onClick={() => handleEditClick(trans)}>Edit</Button>
            <Button onClick={() => handleDeleteClick(trans.id)}>Delete</Button>
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
              </Menu>
            </div>
          </CardContent>
        </Card>
      ))}
      </div>

     
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={Math.ceil(tranList.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
      <Dialog
  open={editModalOpen}
  onClose={() => {
    setSelectedTransaction(null);
    setEditModalOpen(false);
  }}
>
  <DialogTitle>Edit Transaction</DialogTitle>
  <DialogContent>
    {selectedTransaction && (
      <form onSubmit={handleEditConfirm}>
        <TextField
          label="Title"
          variant="filled"
          value={selectedTransaction.title}
          onChange={(e) =>
            setSelectedTransaction({
              ...selectedTransaction,
              title: e.target.value,
            })
          }
          fullWidth
        />
        <TextField
          label="Date"
          variant="filled"
          value={selectedTransaction.date}
          onChange={(e) =>
            setSelectedTransaction({
              ...selectedTransaction,
              date: e.target.value,
            })
          }
          fullWidth
        />
          <TextField
          label="Category"
          variant="filled"
          value={selectedTransaction.category}
          onChange={(e) =>
            setSelectedTransaction({
              ...selectedTransaction,
              category: e.target.value,
            })
          }
          fullWidth
        />
        <TextField
          label="Amont"
          variant="filled"
          value={selectedTransaction.amount}
          onChange={(e) =>
            setSelectedTransaction({
              ...selectedTransaction,
              amount: e.target.value,
            })
          }
          fullWidth
        />
                <TextField
          label="Description"
          variant="filled"
          value={selectedTransaction.description}
          onChange={(e) =>
            setSelectedTransaction({
              ...selectedTransaction,
              description: e.target.value,
            })
          }
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    )}
  </DialogContent>
</Dialog>

   {/* Step 3: Modal for adding new data */}
   <Dialog open={isAddModalOpen} onClose={closeAddModal}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="filled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Date"
              variant="filled"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
            />
            <TextField
              label="Category"
              variant="filled"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
            />
            <TextField
              label="Amount"
              variant="filled"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              variant="filled"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" endIcon={<SaveAltIcon />}>
              Save
            </Button>
            </form>
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        open={showEditConfirmation}
        onClose={() => setShowEditConfirmation(false)}
        onConfirm={handleEditConfirm}
        title="Are you sure you want to edit this transaction?"
      />

      <ConfirmationModal
        open={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDeleteConfirm}
        title="Are you sure you want to delete this transaction?"
      />
    </Box>
  );
};

export default Feed;
