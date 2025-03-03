import { TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import IconButton from '@mui/material/IconButton';
import { Menu as Vasu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Edit, Delete, Block, ArrowBackIosTwoTone } from "@mui/icons-material"; // Import MUI icons
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Service from '../Api_Services/CategoryService';
import axios from 'axios';
import CounterRegistrationApis from '../Api_Services/CounterRegistrationApis';
import DataTable from 'react-data-table-component';
import { Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';

// const menu = [
//   {
//     name: 'IDLY',
//     menu: [
//       { name: 'Plain Idly', price: '85' },
//       { name: 'Ghee Pudi Idly', price: '114' },
//       { name: 'Ghee Sambar Button Idly', price: '143' },
//       { name: 'Ghee Idly', price: '143' },
//       { name: 'Lemon Idly', price: '114' },
//       { name: 'Kanchipuram Idly', price: '100' },
//       { name: 'Banglore Idli', price: '81' },
//       { name: 'Rasam Tari Idli', price: '140' },
//       { name: 'Ragi Balls', price: '145' },
//       { name: 'Idiyappam', price: '180' },

//     ],
//   },

//   {
//     name: 'VADA',
//     menu: [
//       { name: 'Dahi Vada', price: '149' },
//       { name: 'Mini Vada Sambar Dip', price: '114' },
//       { name: 'Rasam Vada', price: '124' },
//       { name: 'Onion Pakooda', price: '105' },
//       { name: 'Masala Vada', price: '90' },
//     ]
//   },
//   {
//     name: 'ABC',
//     menu: [
//       { name: 'Plain Idly', price: '85' },
//       { name: 'Ghee Pudi Idly', price: '114' },
//       { name: 'Ghee Sambar Button Idly', price: '143' },
//       { name: 'Ghee Idly', price: '143' },
//       { name: 'Lemon Idly', price: '114' },
//       { name: 'Kanchipuram Idly', price: '100' },
//       { name: 'Banglore Idli', price: '81' },
//       { name: 'Rasam Tari Idli', price: '140' },
//       { name: 'Ragi Balls', price: '145' },
//       { name: 'Idiyappam', price: '180' },

//     ],
//   },

//   {
//     name: 'DEF',
//     menu: [
//       { name: 'Dahi Vada', price: '149' },
//       { name: 'Mini Vada Sambar Dip', price: '114' },
//       { name: 'Rasam Vada', price: '124' },
//       { name: 'Onion Pakooda', price: '105' },
//       { name: 'Masala Vada', price: '90' },
//     ]
//   },


// ];


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


const options = [
  'Edit',
  'Delete'
];

const ITEM_HEIGHT = 48;

function LongMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Vasu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Vasu>
    </div>
  );
}

const MenuItems = ({ menuitem, getCategories,goBack,counter_id }) => {
  // console.log(menuitem);

  const [menuitems, setMenuItems] = useState(menuitem)
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuitem.menu || []);
  // setFilteredMenuItems(menuitems)
  // console.log(menuitems);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchText, setSearchText] = useState(""); // Search text
  
  useEffect(() => {
    setFilteredMenuItems(menuitems.menu || []);
  }, [menuitems]);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    const filteredData = menuitems.menu.filter((category) =>
      category.name.toLowerCase().includes(searchValue)
    );
    setFilteredMenuItems(filteredData);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Function to toggle disable state for a specific row
  const [disabledRows, setDisabledRows] = useState({});

  const handleDisable = async (itemId, status) => {

    // console.log(itemId, status);

    const available = !status;
    try {
      const response = await Service.put("/menuitem/updateItemStatus", { itemId, available });
      // console.log(response);

      if (response.status == 201) {
        const data = await getCategories(counter_id);
        toast.success("Item Details Were Updated Successfully")
        // console.log(menuitems.name);
        // console.log(data);
        data.map((item, index) => (
          item.categoryId === menuitems.categoryId ? setMenuItems(item) : ''
        ))
      }
    } catch (error) {
      toast.warn(error.response.data.message);
      // console.error(error);

    }



    setDisabledRows((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
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
        <IconButton
          color="secondary"
          onClick={() => handleDisable(row.itemId, row.itemAvailability)}
          sx={{ color: row.itemAvailability === 1 ? "green" : "red" }}
        >
          <Block />
        </IconButton>
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
    <>

      {
        menuitems.menu.length > 0 ? (<>
          <div className='d-flex'>
            <ArrowBackIosTwoTone
              onClick={goBack}
              style={{ fontSize: 40, color: "dark", cursor: "pointer", fontWeight: "bold", }}
            />
            <h2> Items for {menuitems.name}</h2>
          </div>


          {/* <TableContainer >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                    const isDisabled = disabledRows[item.itemId] || false;

                    return (
                      <StyledTableRow key={item.itemId} sx={{ opacity: item.itemAvailability ? 1 : 0.5, cursor: item.itemAvailability ? "pointer" : "not-allowed" }} >
                        <StyledTableCell align="center">
                          <Typography sx={{
                            color: isDisabled ? "gray" : "black",
                            filter: isDisabled ? "blur(0.3px)" : "none",
                          }}>
                            {index + 1}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography sx={{
                            color: isDisabled ? "gray" : "black",
                            filter: isDisabled ? "blur(0.3px)" : "none",
                          }}>
                            {item.name}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography sx={{
                            color: isDisabled ? "gray" : "black",
                            filter: isDisabled ? "blur(0.3px)" : "none",
                          }}>
                            {item.price}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton
                            color="secondary"
                            onClick={() => handleDisable(item.itemId, item.itemAvailability)}
                            // sx={{ color: isDisabled ? "green" : "red" }}
                            sx={{ color: item.itemAvailability ? "green" : "red" }}
                          >
                            <Block />
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


        </>) : <><h3>Items not found for <span className='text-success'>{menuitems.name}</span></h3></>
      }

    </>
  );
};


function Availability() {
  const [menuitems, setMenuItems] = useState();
  const [showMenuItems, setShowMenuItems] = useState(false);


  const handleCardClick = (item) => {
    setMenuItems(item)
    setShowMenuItems(!showMenuItems)
  }

  const [categoryList, setCategoryList] = useState([]);
  const [counter_id, setCounterId] = useState('')

  //  console.log(sessionStorage.getItem('mobieNo'));
  const mobdata = sessionStorage.getItem('mobieNo');

  useEffect(() => {
    async function fetchCounterId() {
      try {
        const response = await CounterRegistrationApis.counterIdByMobNo(mobdata);
        if (response.status === 200) {
          setCounterId(response.data.message.ID);
        }
      } catch (error) {
        // console.error("Error fetching counter ID:", error);
        // toast.warn("Error fetching counter ID:", error);
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
      // toast.warn("Error fetching counter ID:", error.response.data.message);
    }
  }

  useEffect(() => {
    getCategories(counter_id);
  }, [counter_id])


  const [disabledCards, setDisabledCards] = useState({}); // Store disabled state per card

  const handleDisableCard = async (categoryId, status) => {
    // const categoryId = itemId

    // console.log(status, categoryId);

    const available = !status;

    // console.log(available);

    try {
      const res = await Service.put("/menuItem/updateCategoryStatus", { available, categoryId });
      // console.log(res);

      if (res.status == 201) {
        // console.log(res);
        toast.success("Item Details Were Updated Successfully")
        getCategories(counter_id);
      }
    } catch (error) {
      // console.log(error);
      toast.warn(error.response.status.data.message)

    }

    setDisabledCards((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId], // Toggle only the clicked card
    }));


  };

  const goBack=()=>{
    setShowMenuItems(false);
  }

  if (showMenuItems)
    return <MenuItems menuitem={menuitems} getCategories={getCategories} goBack={goBack} counter_id={counter_id} />
  return (
    <>
      <h3 className='text-start m-3'>Menu Availability Categorys </h3>
      <div className='row row-gap-5'>
        {categoryList.map((item, index) => {
          const isDisabled = disabledCards[item.categoryId] || false; // Check if the card is disabled

          return ( // RETURN the JSX inside parentheses
            <div className="col-lg-4 col-md-6 col-sm-12" key={item.categoryId}>
              <div className="card text-center" style={{ cursor: "pointer",backgroundColor:"aliceblue", border:"2px solid black",opacity: item.categoryAvailability ? 1 : 0.5 }}>
                {/* Disable Button */}
                <IconButton
                  color="secondary"
                  onClick={() => handleDisableCard(item.categoryId, item.categoryAvailability)}
                  // sx={{ color: isDisabled ? "green" : "red", position: "absolute", top: 10, right: 10 }}
                  sx={{ color: item.categoryAvailability ? "green" : "red", position: "absolute", top: 10, right: 10 }}
                >
                  <Block />
                </IconButton>

                {/* Card Content */}
                <div
                  className="card-body p-5"
                  onClick={!isDisabled ? () => handleCardClick(item) : undefined}
                  style={{ cursor: item.categoryAvailability ? "pointer" : "not-allowed" }} // Disable clicks when disabled
                >
                  <h5 className='fw-bold fs-3'>{item.name}</h5>
                </div>
              </div>
            </div>
          );
        })}

      </div >
    </>
  )
}

export default Availability