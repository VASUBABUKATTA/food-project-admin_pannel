import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from 'dayjs';
import InputAdornment from '@mui/material/InputAdornment';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ArrowBackIosTwoTone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const crads = [
    { name: "ORDER RECEIVED" },
    { name: "ORDER HISTORY" }
]


function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                itemName: 'Ghee Idly',
                quantity: 2,
                amount: 100,
            },
            {
                itemName: 'Ghee Karam Dosa',
                quantity: 3,
                amount: 120,
            },
        ],
    };
}

function Row(props) {
    const { row, selectionType } = props;
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(row.status || 'received'); // Default status

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };


    const getStatusColor = (status) => {
        switch (status) {
            case "received":
                return "green";
            case "inprogress":
                return "orange";
            case "ready":
                return "blue";
            case "delivered":
                return "purple";
            default:
                return "transparent"; // Default color if status is not matched
        }
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center" sx={{ color: 'gray' }} >
                    {selectionType === "ORDER RECEIVED" ? <Select
                        value={status}
                        onChange={handleStatusChange}
                        size="small"
                        sx={{ width: 130, backgroundColor: getStatusColor(status), color: 'white' }}

                    >
                        <MenuItem value="received" sx={{ color: 'green' }}>Received</MenuItem>
                        <MenuItem value="inprogress" sx={{ color: 'orange' }}>In Progress</MenuItem>
                        <MenuItem value="ready" sx={{ color: 'blue' }}>Ready</MenuItem>
                        <MenuItem value="delivered" sx={{ color: 'purple' }}>Delivered</MenuItem>
                    </Select> : "Delivered"}
                </TableCell>
                {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Order Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item Name</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.itemName}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.itemName}
                                            </TableCell>
                                            <TableCell>{historyRow.quantity}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}



const rows = [
    createData('102', 9876543210, 'received', new Date().toLocaleString(),),
    createData('103', 9632147850, 'received', new Date().toLocaleString(),),
    createData('104', 9517364820, 'received', new Date().toLocaleString(),),
    createData('105', 9317862450, 'received', new Date().toLocaleString(),),
    createData('106', 9713684250, 'received', new Date().toLocaleString(),),
    createData('102', 9876543210, 'received', new Date().toLocaleString(),),
    createData('103', 9632147850, 'received', new Date().toLocaleString(),),
    createData('104', 9517364820, 'received', new Date().toLocaleString(),),
    createData('105', 9317862450, 'received', new Date().toLocaleString(),),
    createData('106', 9713684250, 'received', new Date().toLocaleString(),),
];



function CustomInputAdornment(props) {
    const { hasError, children, sx, ...other } = props;
    return (
        <InputAdornment {...other}>
            <PriorityHighIcon
                color="error"
                sx={[
                    hasError
                        ? {
                            opacity: 1,
                        }
                        : {
                            opacity: 0,
                        },
                ]}
            />
            {children}
        </InputAdornment>
    );
}


function AddWarningIconWhenInvalidRange() {
    const [error, setError] = React.useState([null, null]);


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DateRangePicker']}>
                <DateRangePicker
                    sx={{ width: "625px", alignContent: 'center' }}
                    label="Picker with error icon"
                    maxDate={dayjs('2022-04-19')}
                    defaultValue={[dayjs('2022-04-18'), dayjs('2022-04-21')]}
                    onError={setError}
                    slotProps={{
                        textField: (ownerState) => ({
                            InputProps: {
                                endAdornment: (
                                    <CustomInputAdornment
                                        position="end"
                                        hasError={!!error[ownerState.position === 'start' ? 0 : 1]}
                                    />
                                ),
                            },
                        }),
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );

}

const OrderReceived = ({ selectionType,goBack}) => {
   
    

    return (
        <>
            <div>
                {/* Sticky Typography Section */}
                <div style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 1100,  // Higher than TableHead
                    padding: "10px",
                    display:'flex'
                }}>
                     <ArrowBackIosTwoTone
                                            onClick={goBack}
                                            style={{ fontSize: 35, color: "dark", cursor: "pointer", fontWeight: "bold", }}
                                        />
                    <Typography variant="h4" className='mb-5'>
                        {selectionType}
                        {selectionType === 'ORDER HISTORY' && AddWarningIconWhenInvalidRange()}
                    </Typography>
                </div>

                {/* Table Section */}
                <div className='border border-5 rounded'>
                    <TableContainer >
                        <Table aria-label="collapsible table">
                            <TableHead >
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>ORDER ID</TableCell>
                                    <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>MOBILE NUMBER</TableCell>
                                    <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>DATE & TIME</TableCell>
                                    <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>STATUS</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <Row key={row.name} row={row} selectionType={selectionType} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                
            </div>
        </>
    )
}

function Dashboard() {

    const [showOrderReceived, setShowOrderReceived] = useState(false);
    const [selectionType, setSelectionType] = useState('')

    const handleClick = (item) => {
        if (item === "ORDER RECEIVED") {
            setShowOrderReceived(!showOrderReceived);
            setSelectionType('ORDER RECEIVED');
        }
        if (item === "ORDER HISTORY") {
            setShowOrderReceived(!showOrderReceived);
            setSelectionType('ORDER HISTORY');
        }

    }

    const [goBackState,setGoBackState] = useState(false)

   
    const goBack = () => {
        setShowOrderReceived(false); 
    };


    if (showOrderReceived)
        return <OrderReceived selectionType={selectionType} goBack={goBack}  />

    return (
        <>
            <div className='container'>
                <div className='row row-gap-5'>

                    {crads.map((item, index) =>
                    (<div className='col-lg-6 col-sm-12 col-md-12' key={index}>
                        <div className='container'>
                            <div className='d-flex  justify-content-between align-items-center'>
                                <div className='card p-5 w-100 h-100' style={{ cursor: 'pointer' }} onClick={() => handleClick(item.name)}>
                                    <div className='card-body'>
                                        <h3>{item.name}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>))}

                </div>

            </div>
        </>

    )
}

export default Dashboard