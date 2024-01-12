import React, { useState, useEffect } from "react";
import {Dialog,DialogTitle,DialogContent,Box,Button,Pagination,TextField,IconButton,Menu,MenuItem,} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { tranList } from "../store/Data";
import { addTrans, deleteTrans, updateTrans } from "../store/TranReducer";
import { useDispatch, useSelector } from "react-redux";
import AddTransactionModal from "../component/AddTransactionModal";
import EditTransactionModal from "../component/EditTransactionModal";
import TransactionCard from "../component/TransactionCard";
import ConfirmationModal from "../component/ConfirmationModal";

const Feed = () => {
  const trans = useSelector((state) => state.trans);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredTrans, setFilteredTrans] = useState(trans);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [nextId, setNextId] = useState(
    trans.length > 0 ? trans[trans.length - 1].id + 1 : 1
  );
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const FILTER_TRANSACTIONS = "FILTER_TRANSACTIONS";
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
      if (sortField === "id") {
        return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
      } else if (sortField === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortField === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      } else if (sortField === "date") {
        return sortOrder === "asc" ? a.date - b.date : b.date - a.date;
      } else if (sortField === "description") {
        return sortOrder === "asc"
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description);
      }

      return 0;
    });

    setFilteredTrans(sortedTrans);
  }, [trans, searchQuery, sortField, sortOrder, dispatch]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDeleteConfirmation(true);
  };

  const handleEditConfirm = (editedTransaction) => {
    dispatch(updateTrans(editedTransaction));
    setEditModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleDeleteConfirm = () => {
    const id = selectedTransaction.id;
    dispatch(deleteTrans({ id }));
    if (id === nextId - 1) {
      setNextId(nextId - 1);
    }
    setSelectedTransaction(null);
    setShowDeleteConfirmation(false);
  };

  const handleSearch = () => {
    dispatch({ type: FILTER_TRANSACTIONS, searchQuery });
  };

  const handleSort = () => {
    const sortedTrans = [...filteredTrans].sort((a, b) => {
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
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            margin: "10px",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label=""
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              marginLeft: "auto",
              border: "2px solid white",
              borderRadius: 0,
              padding: 0,
              "& .MuiInputBase-input": {
                border: "none",
                borderRadius: 0,
                padding: 0,
              },
            }}
          />
          <IconButton
            onClick={handleSearch}
            style={{ marginLeft: "-40px", background: "primary" }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: "1%",
          marginBottom: "2%",
        }}
      >
        <Button onClick={openAddModal} variant="contained" color="primary">
          Add Transaction
        </Button>
        <AddTransactionModal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          onSubmit={(newTransaction) => {
            dispatch(addTrans({ id: nextId, ...newTransaction }));
            setNextId(nextId + 1);
          }}
        />
      </Box>
      <Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "1%",
            marginTop: "-5%",
          }}
        >
          <Box style={{ marginRight: "10px" }}>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" {...bindTrigger(popupState)}>
                    Sort By
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                      onClick={() => {
                        setSortField("title");
                        popupState.close();
                      }}
                    >
                      Title
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortField("date");
                        popupState.close();
                      }}
                    >
                      Date
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortField("amount");
                        popupState.close();
                      }}
                    >
                      Amount
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortField("description");
                        popupState.close();
                      }}
                    >
                      Description
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </Box>
          <Box style={{ marginRight: "10px" }}>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" {...bindTrigger(popupState)}>
                    Sort Order
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                      onClick={() => {
                        setSortOrder("asc");
                        popupState.close();
                      }}
                    >
                      Ascending
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortOrder("desc");
                        popupState.close();
                      }}
                    >
                      Descending
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </Box>
        </Box>
        <Button onClick={handleSort}></Button>
      </Box>
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {transactionsToDisplay.map((transaction, index) => (
          <TransactionCard
            key={index}
            transaction={transaction}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onMenuClick={handleMenuClick}
            anchorEl={anchorEl}
            onCloseMenu={handleCloseMenu}
          />
        ))}
      </Box>
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
            <EditTransactionModal
              selectedTransaction={selectedTransaction}
              onEditConfirm={handleEditConfirm}
              onClose={() => setEditModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          count={Math.ceil(tranList.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <ConfirmationModal
        open={showEditConfirmation}
        onClose={() => setShowEditConfirmation(false)}
        onConfirm={handleEditConfirm}
        title="Are you sure you want to edit this transaction?"
      />

      <ConfirmationModal
        open={showDeleteConfirmation}
        onClose={() => {
          setSelectedTransaction(null);
          setShowDeleteConfirmation(false);
        }}
        onConfirm={() => handleDeleteConfirm()}
        title="Are you sure you want to delete this transaction?"
      />
    </Box>
  );
};

export default Feed;

