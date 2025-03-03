import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import IconButton from '@mui/material/IconButton';
import { Menu as Vasu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Modal, ModalBody } from 'react-bootstrap';
import Service from '../../components/Api_Services/CategoryService';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Block, ArrowBackIosTwoTone } from "@mui/icons-material"; // Import MUI icons
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import CounterRegistrationApis from '../Api_Services/CounterRegistrationApis';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import {Badge } from 'react-bootstrap'
import { toast } from 'react-toastify';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



function PaperComponent(props) {
    const nodeRef = React.useRef(null);
    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} ref={nodeRef} />
        </Draggable>
    );
}

function CounterMenuItems() {

    const [menuitems, setMenuItems] = useState();

    const [showMenuItems, setShowMenuItems] = useState(false);
    const [categoryName, setCategoryName] = useState();
    const [editedCategoryName, setEditCategoryName] = useState();
    const [categoryList, setCategoryList] = useState([])
    const [category, setCategory] = useState()
    const [showCategoryEdit, setShowCategoryEdit] = useState(false);
    const [itemName, seItemName] = useState();
    const [price, setPrice] = useState()
    const [item, setItem] = useState();
    const [editedItemName, setEditedItemName] = useState();
    const [editedPrice, setEditedPrice] = useState()

    const [showItemEdit, setShowItemEdit] = useState(false)
    const [counter_id, setCounterId] = useState('')

    //  console.log(sessionStorage.getItem('mobieNo'));
    const mobdata = sessionStorage.getItem('mobieNo');

    
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);
      
    
      const [searchText, setSearchText] = useState(""); // Search text

    useEffect(() => {
        async function fetchCounterId() {
            try {
                const response = await CounterRegistrationApis.counterIdByMobNo(mobdata);
                if (response.status === 200) {
                    setCounterId(response.data.message.ID);
                }
            } catch (error) {
                // console.error("Error fetching counter ID:", error);
            }
        }

        fetchCounterId();
    }, [mobdata]);



    const getCategories = async (counter_id) => {
        try {
            const response = await Service.fetchAllCategoryDetailsByCounterId(counter_id);
            // console.log(response);

            if (response.status == 200) {
                // console.log(response)
                setCategoryList(response.data)
                return response.data;
            }
        } catch (error) {
            // console.log(error);
        }
    }

    useEffect(() => {
        getCategories(counter_id);
    }, [counter_id])


    const handleCardClick = async (item) => {
        const data = item.menu;
        // console.log(item.menu,data);
     
        // console.log(item);
        setFilteredMenuItems(data);
        setMenuItems(item)
        setShowMenuItems(!showMenuItems)
    }

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open)
    }

    const handleClose = () => setOpen(!open);

    const handleAddCategory = async () => {

        const available = 1;
        await Service.post("/menuItem/addCategory", { categoryName, counter_id, available }).then((res) => {
            getCategories(counter_id);

            setOpen(!open)
            setCategoryName()
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })

    }



    const handleEditCategory = async () => {
        const categoryId = category.categoryId;
        const categoryName = editedCategoryName;
        // const counter_id = counter_id;
        await Service.put("/menuItem/updateCategory", { categoryName, categoryId, counter_id }).then((res) => {
            // console.log(res);
            getCategories(counter_id);
            setShowCategoryEdit(!showCategoryEdit);
            if (res === 201) {
                alert(res.data.message);
            }
            toast.success(res.data.message)

        }).catch((err) => {
            toast.error(err.response.data.message)
            // console.log(err);

        })
    }

    const deleteCategory = async (categoryId) => {
        // console.log(categoryId);

        alert("Are you sure want to delete category: " + categoryId)
        await Service.delete(`/menuItem/deleteCategory/${categoryId}`).then((res) => {
            // console.log(res);
            getCategories(counter_id);
            toast.success("Category Details Deleted SuccessFully");
        }).catch((err) => {
            toast.error(err.response.data.message)

        })
    }

    useEffect(() => {
        if (menuitems?.menu) {
            setFilteredMenuItems(menuitems.menu);
        }
    }, [menuitems]);
    

    const [showAddItem, setShowAddItem] = useState(false);

    const handleAddItem = async () => {
        const category_id = menuitems.categoryId;
        const available = 1;
        // console.log(itemName, category_id, available, price);


        try {
            const res = await Service.post("/menuItem/addItems", { itemName, category_id, available, price });
            if (res.status == 201) {
                const updatedCategories = await getCategories(counter_id);
                toast.success(res.data.message)
                seItemName('')
                setPrice('')
                // Find the updated category and set menu items
                const updatedCategory = updatedCategories.find(item => item.categoryId === menuitems.categoryId);
                if (updatedCategory) {
                    setMenuItems(updatedCategory);
                    setFilteredMenuItems(updatedCategory.menu); // Refresh table data
                    setShowAddItem(false)
                }

                // console.log(menuitems.name);
                // console.log(data);
                data.map((item, index) => (
                    item.categoryId === menuitems.categoryId ? setMenuItems(item) : ''
                ))
            }
            setShowAddItem(false);
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }

    const handleEditItem = async () => {

        // await Service.put("/menuItem/updateItem",)
        // console.log(item);

        const itemId = item.itemId;
        const itemName = editedItemName;
        const price = editedPrice;
        const category_id = menuitems.categoryId;
        // console.log(itemId);
        // console.log(itemName);
        // console.log(price);

        try {
            const res = await Service.put("/menuItem/updateItem", { itemName, itemId, price, category_id })
            // console.log(res)
            if (res.status == 201) {
                toast.success(res.data.message)
                const updatedCategories = await getCategories(counter_id);
                setShowItemEdit(false);
            // Find the updated category and set menu items
            const updatedCategory = updatedCategories.find(item => item.categoryId === menuitems.categoryId);
            if (updatedCategory) {
                setMenuItems(updatedCategory);
                setFilteredMenuItems(updatedCategory.menu); // Refresh table data
            }
                // console.log(menuitems.name);
                // console.log(data);
                // setFilteredMenuItems(data.menu)
                handleCardClick(data)
                data.map((item, index) => (
                    item.categoryId === menuitems.categoryId ? setMenuItems(item) : ''
                ))

            }
            setShowItemEdit(false);
        } catch (error) {
            toast.error(error.response.data.message)
            // alert(error.response.data.message);
            // console.log(error);
        }
    };

    

    const deleteItem = async (itemId) => {
        alert("Are you sure want to delete Item: " + itemId)
        try {
            const res = await Service.delete(`/menuItem/deleteItem/${itemId}`);
            
            if (res.status === 204 ) {
                const updatedCategories = await getCategories(counter_id);
    
                // Find the updated category and set menu items
                const updatedCategory = updatedCategories.find(item => item.categoryId === menuitems.categoryId);
                if (updatedCategory) {
                    setMenuItems(updatedCategory);
                    setFilteredMenuItems(updatedCategory.menu); // Refresh table data
                }
            }
            toast.success('Item Was deleted successfully')
        } catch (error) {
            // console.log(error);
            toast.error(err.response.data.message)
        }
    };
    

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const [disabledRows, setDisabledRows] = useState({});
    const handleDisable = (itemId) => {
        setDisabledRows((prev) => ({
            ...prev,
            [itemId]: !prev[itemId],
        }));
    };

    const [err, setErr] = useState({
        addCategoryErr: ''
    })

    const addCategoryonChangeHandler = (e) => {
        setCategoryName(e.target.value)
        const value = e.target.value;

        // setCategoryName(value);
        setErr({
            ...err,
            addCategoryErr: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(value) && value.length >= 3 && value.length <= 20 ? "" : "3-20 characters"

        })

    }

    const goBack = () => {
        setShowMenuItems(true);
        setMenuItems('')
    }

      
    //   useEffect(() => {
    //     setFilteredMenuItems(item || []);
    //   }, [item]);
    
    //   const handleSearch = (event) => {
    //     const searchValue = event.target.value.toLowerCase();
    //     setSearchText(searchValue);
    
    //     const filteredData = item?.menu.filter((category) =>
    //       category.name.toLowerCase().includes(searchValue)
    //     );
    //     setFilteredMenuItems(filteredData);
    //   };

      const handleSearch = (e) => {
       
        const searchValue = event.target.value.toLowerCase();
        setSearchText(searchValue);
    
        if (searchValue.trim() === "") {
            setFilteredMenuItems(menuitems?.menu || []);
        } else {
            const filtered = menuitems?.menu?.filter((category) =>
                category.name.toLowerCase().includes(searchValue)
              );
            setFilteredMenuItems(filtered);
        }
    };
    

    const columns = [
        { name: "ID", selector: (row) => row.itemId, sortable: true, width: "70px" },
        { name: "Item Name", selector: (row) => row.name, sortable: true },
        {
            name: "Available", selector: (row) => <Badge bg={row.itemAvailability === 1 ? "success" : "danger"} className="p-2">
                {row.available === 1 ? "Open" : "Closed"}
            </Badge>, sortable: true
        },
        { name: "Price", selector: (row) => row.price, sortable: true, width: "120px" },
        {
          name: "Actions",
          selector: (row) => (
           <>
            <IconButton sx={{ color: 'blue' }}  onClick={() => { setShowItemEdit(!showItemEdit), setItem(row), setEditedPrice(row.price), setEditedItemName(row.name) }}>
                                                                            <Edit />
                                                                        </IconButton>
                                                                        <IconButton sx={{ color: 'red' }}  onClick={() => deleteItem(row.itemId)}>
                                                                            <Delete />
                                                                        </IconButton>
           </>
          ),
          width: "120px",
        },
    ];
    
    const customStyles = {
        headRow: {
            style: {
                backgroundColor: 'darkblue',
                fontSize: '14px',
                fontWeight: 'bold',
            },
        },
        headCells: {
            style: {
                color: 'white',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                fontSize: '13px',
            },
        },
        pagination: {
            style: {
                backgroundColor: 'aliceblue',
                color: 'black',
                fontSize: '13px',
                fontWeight: 'bold',
            },
        },
    };
    


    return (
        <div>
            <>



                <div className='row row-gap-5'>


                    {!menuitems ? (<>

                        <div className='d-flex justify-content-between align-items-center'>
                            <h3 className='text-start m-3'>Categories</h3>
                            <Button variant="contained" sx={{
                                width: { xs: '100%', sm: '100%', md: '50%', lg: '25%', xl: '25%' }
                            }} onClick={handleClick}>ADD</Button>
                        </div>
                        {categoryList.map((item, index) => (
                            <div className='col-12 col-md-6 col-lg-4 ' >
                                <div className='card text-center w-100 h-100' style={{ cursor: 'pointer',border:"2px solid black",backgroundColor:"aliceblue" }} key={index}>
                                    <div class="dropdown text-end">
                                        <span class="dropdown-toggle" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                            <MoreVertIcon />
                                        </span>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button class="dropdown-item" type="button" onClick={() => {
                                                setCategory(item)
                                                setShowCategoryEdit(!showCategoryEdit)
                                                setEditCategoryName(item.name);
                                            }}>Edit</button></li>
                                            <li><button class="dropdown-item" type="button" onClick={() => deleteCategory(item.categoryId)}>Delete</button></li>
                                        </ul>
                                    </div>
                                    <div className='card-body p-5 ' onClick={() => handleCardClick(item)}>
                                        <h5 className='fw-bold fs-3 '>{item.name}</h5>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </>)

                        : (
                            <>

                                <div className='d-flex justify-content-between align-items-center'>
                                    <h3 className='text-start m-3'>
                                        <ArrowBackIosTwoTone
                                            onClick={goBack}
                                            style={{ fontSize: 35, color: "dark", cursor: "pointer", fontWeight: "bold", }}
                                        />
                                        Items for {menuitems.name}</h3>
                                    <Button variant="contained" sx={{
                                        width: { xs: '100%', sm: '100%', md: '50%', lg: '25%', xl: '25%' }
                                    }} onClick={() => setShowAddItem(!showAddItem)}>ADD</Button>
                                </div>
                                <div className='row'>

                                    <div className=''>


                                        {/* <TableContainer >
                                            <Table sx={{ minWidth: 200 }} aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="center">ID</StyledTableCell>
                                                        <StyledTableCell align="center">Item Name</StyledTableCell>
                                                        <StyledTableCell align="center">Price</StyledTableCell>
                                                        <StyledTableCell align="center">Actions</StyledTableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {menuitems.menu
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((item, index) => {
                                                            const isDisabled = disabledRows[item.itemId];

                                                            return (
                                                                <StyledTableRow key={item.itemId} disabled={isDisabled} sx={{ cursor: isDisabled ? "not-allowed" : "pointer" }}>
                                                                    <StyledTableCell align="center">
                                                                        <Typography
                                                                            sx={{ color: isDisabled ? "gray" : "black" }}
                                                                        >
                                                                            {index + 1}
                                                                        </Typography>
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        <Typography
                                                                            sx={{ color: isDisabled ? "gray" : "black" }}
                                                                        >
                                                                            {item.name}
                                                                        </Typography>
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        <Typography
                                                                            sx={{ color: isDisabled ? "gray" : "black" }}
                                                                        >
                                                                            {item.price}
                                                                        </Typography>
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        <IconButton sx={{ color: 'blue' }} disabled={isDisabled} onClick={() => { setShowItemEdit(!showItemEdit), setItem(item), setEditedPrice(item.price), setEditedItemName(item.name) }}>
                                                                            <Edit />
                                                                        </IconButton>
                                                                        <IconButton sx={{ color: 'red' }} disabled={isDisabled} onClick={() => deleteItem(item.itemId)}>
                                                                            <Delete />
                                                                        </IconButton>

                                                                    </StyledTableCell>
                                                                </StyledTableRow>
                                                            );
                                                        })}
                                                </TableBody>
                                            </Table>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 15]}
                                                component="div"
                                                count={menuitems.menu.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                        </TableContainer> */}
<TextField
                        type="text"
                        placeholder="🔍 Search Item Name..."
                        value={searchText}
                        onChange={handleSearch}
                        className="search-input mb-3"
                    />
 <DataTable
            columns={columns}
            data={filteredMenuItems}
            defaultSortField="name"
            pagination
            highlightOnHover
            striped
            responsive
            customStyles={customStyles}
          />


                                        <React.Fragment>
                                            <Dialog
                                                open={showItemEdit}
                                                onClose={handleClose}
                                                PaperComponent={PaperComponent}
                                                aria-labelledby="draggable-dialog-title"
                                            >
                                                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                                    Edit Item
                                                </DialogTitle>
                                                <DialogContent className='px-5'>
                                                    <TextField
                                                        fullWidth
                                                        label="Item Name"
                                                        name="editedItemName"
                                                        value={editedItemName}
                                                        onChange={(e) => setEditedItemName(e.target.value)}
                                                        margin="normal"
                                                        required
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        label="Price"
                                                        name="editedPrice"
                                                        value={editedPrice}
                                                        onChange={(e) => setEditedPrice(e.target.value)}
                                                        margin="normal"
                                                        required
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button autoFocus onClick={() => setShowItemEdit(!showItemEdit)}>
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={handleEditItem}>Submit</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </React.Fragment>

                                        <React.Fragment>
                                            <Dialog
                                                open={showAddItem}
                                                onClose={handleClose}
                                                PaperComponent={PaperComponent}
                                                aria-labelledby="draggable-dialog-title"
                                            >
                                                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                                    Add Item
                                                </DialogTitle>
                                                <DialogContent className='px-5'>
                                                    <TextField
                                                        fullWidth
                                                        label="Item Name"
                                                        name="itemName"
                                                        value={itemName}
                                                        onChange={(e) => seItemName(e.target.value)}
                                                        margin="normal"
                                                        required
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        label="Price"
                                                        name="price"
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                        margin="normal"
                                                        required
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button autoFocus onClick={() => setShowAddItem(!showAddItem)}>
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={handleAddItem}>Submit</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </React.Fragment>


                                    </div>
                                </div>

                            </>)
                    }













                    <React.Fragment>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                        >
                            <DialogTitle style={{ cursor: 'move', }} id="draggable-dialog-title">
                                Add Category
                            </DialogTitle>
                            <DialogContent className='px-5'>
                                <TextField
                                    fullWidth
                                    label="Category"
                                    name="categoryName"
                                    value={categoryName}
                                    // onChange={(e) => setCategoryName(e.target.value)}
                                    onChange={addCategoryonChangeHandler}
                                    // onChange={(e) => {
                                    //     const value = e.target.value;
                                    //     if (/^[a-zA-Z\s]*$/.test(value) && value.length >= 3 && value.length <= 20) {
                                    //         setCategoryName(value);
                                    //     }
                                    // }}
                                    onKeyPress={(e) => {
                                        // const charCode = e.which || e.keyCode;
                                        if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    inputProps={{
                                        minLength: 3,
                                        maxLength: 20,
                                    }}
                                    error={err.addCategoryErr}
                                    helperText={err.addCategoryErr}
                                    margin="normal"
                                    required
                                />
                                {/* {err.addCategoryErr && <span className='text-danger'>{err.addCategoryErr}</span>} */}
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={() => setOpen(!open)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleAddCategory}>Submit</Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                    <React.Fragment>
                        <Dialog
                            open={showCategoryEdit}
                            onClose={handleClose}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                        >
                            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                Update Category
                            </DialogTitle>
                            <DialogContent className='px-5'>
                                <TextField
                                    fullWidth
                                    label="Category"
                                    name="editedCategoryName"
                                    value={editedCategoryName}
                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                    margin="normal"
                                    required
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={() => setShowCategoryEdit(!showCategoryEdit)} >
                                    Cancel
                                </Button>
                                <Button onClick={handleEditCategory}>Submit</Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                </div >
            </>
        </div>
    )
}

export default CounterMenuItems
