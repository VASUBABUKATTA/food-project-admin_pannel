import React, { useEffect, useState } from 'react'
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
import Service from '../Api_Services/CategoryService';
// import Service, { socket } from '../Api_Services/CategoryService';
import { Button, Modal } from 'react-bootstrap';
import { ArrowBackIosTwoTone, History, HistoryEdu, Inventory, Payments, RestaurantMenu, Shop, ShoppingBag } from '@mui/icons-material';
import { toast } from 'react-toastify';
import CounterRegistrationApis from '../Api_Services/CounterRegistrationApis';

// import InventoryIcon from "@mui/icons-material/Inventory";



const crads = [
    { name: "ORDER RECEIVED", imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/006/800/354/small_2x/acknowledgment-received-abstract-concept-illustration-acknowledgment-receipt-letter-payment-received-confirmation-message-order-status-correct-delivery-notification-abstract-metaphor-vector.jpg', icon: <HistoryEdu /> },
    { name: "ORDER HISTORY", imageUrl: 'https://cdn.vectorstock.com/i/preview-1x/66/88/history-textbook-on-school-chalkboard-background-vector-47556688.jpg',icon: <History /> },
    { name: "FINANCIAL REPORT", imageUrl: 'https://macquariegreekstudiesfoundation.org.au/wp-content/uploads/2023/02/financial-statements-importance.jpg',icon: <Payments /> }
]







function Dashboard() {



    const [counterDetails, setCounterId] = useState('')

    //  console.log(sessionStorage.getItem('mobieNo'));
    const mobdata = sessionStorage.getItem('mobieNo');

    // async function fetchCounterId() {
    //     try {
    //         const response = await CounterRegistrationApis.counterIdByMobNo(mobdata);
    //         // console.log(response)
    //         if (response.status === 200) {
    //             setCounterId(response.data.message);
    //         }
    //     } catch (error) {
    //         // console.error("Error fetching counter ID:", error);
    //         toast.warn("Error fetching counter ID:", error);
    //     }
    // }


    const [rows, setRows] = useState([]);

    const [orderHistory, setOrderHistory] = useState([]);


    // const getOrders = async () => {

    //     // console.log(counterDetails);
    //     // (counterDetails)
    //     try {
    //         const res = await Service.get(`/order/getOrdersByCounterId/${counterDetails.ID}`);
    //         if (res.status == 200) {
    //             console.log(res);
    //             console.log(res.data);
    //             setRows(res.data);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const getOrderHistory = async () => {

    //     try {
    //         const res = await Service.get(`/order/getOrderHistoryByCounterId/${counterDetails.ID}`)
    //         if (res.status == 200) {
    //             console.log(res.data);

    //             setOrderHistory(res.data);
    //         }
    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    const [dayWiseReport, setDayWiseReport] = useState([])
    const getDayWiseReport = async () => {
        try {
            const res = await Service.get("/order/getCounterWiseTotalPerDay/1")
            if (res.status == 200) {
                console.log(res.data);
                setDayWiseReport(res.data);
            }
        } catch (error) {
            console.log(error);

        }
    }


    // Handle new orders from WebSocket
    const handleNewOrder = (newOrder) => {
        console.log("New order received:", newOrder);
        setRows(prevOrders => [newOrder, ...prevOrders]); // Add new order at the top
    };



    // Fetch Counter ID
    const fetchCounterId = async () => {
        try {
            const response = await CounterRegistrationApis.counterIdByMobNo(mobdata);
            if (response.status === 200) {
                setCounterId(response.data.message);
            }
        } catch (error) {
            toast.warn("Error fetching counter ID:", error);
        }
    };

    // Fetch Orders
    const getOrders = async () => {
        if (!counterDetails?.ID) return; // Prevent fetching with undefined ID
        try {
            const res = await Service.get(`/order/getOrdersByCounterId/${counterDetails.ID}`);
            if (res.status === 200) {
                setRows(res.data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // Fetch Order History
    const getOrderHistory = async () => {
        if (!counterDetails?.ID) return; // Prevent fetching with undefined ID
        try {
            const res = await Service.get(`/order/getOrderHistoryByCounterId/${counterDetails.ID}`);
            if (res.status === 200) {
                setOrderHistory(res.data);
            }
        } catch (error) {
            console.error("Error fetching order history:", error);
        }
    };









    useEffect(() => {
        fetchCounterId();
    }, [mobdata]);


    useEffect(() => {
        if (counterDetails?.ID) {
            getOrders();
            getOrderHistory();
            getDayWiseReport();
        }
    }, [counterDetails]);

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

        if (item === 'FINANCIAL REPORT') {
            setSelectionType('FINANCIAL REPORT');
        }

    }

    const goBack = () => {
        setShowOrderReceived(false);
    }

    const [dayReport, setdayReport] = useState(false)

    const goBack1 = () => {
        setSelectionType('');
    }

    if (selectionType == 'FINANCIAL REPORT') {
        return (<DayWiseReport dayWiseReport={dayWiseReport} goBack1={goBack1} />)
    }



    const OrderReceived = ({ selectionType, rows, orderHistory, goBack }) => {

        console.log(rows);


        const [dateRange, setDateRange] = useState([null, null]);

        // Filter orders based on Delivered Date
        const filteredOrders = orderHistory.filter(order => {
            if (!dateRange[0] || !dateRange[1]) return true; // No filter if range is not set
            const deliveredDate = dayjs(order.deliveredDateTime); // Convert delivered date to dayjs
            return deliveredDate.isAfter(dateRange[0], 'day') && deliveredDate.isBefore(dateRange[1], 'day');
        });

        const date = new Date();

        const newDate = date.toLocaleDateString('default', { year: 'numeric', month: 'long' });

        console.log(newDate);

        const downloadExcel = () => {
            const date = new Date();
            if (date.getDate == 1) {
                console.log("first of month");

            }
        }

        useEffect(() => {
            downloadExcel();
        }, [])




        return (
            <>
                <>
                    <div className='col-12 col-xs-12 col-sm-12 col-md-8 col-lg-9 col-xl-9'>
                        <div className='text-start mt-2 text-primary fs-4 fw-bold'>
                            <ArrowBackIosTwoTone
                                onClick={goBack}
                                style={{ fontSize: 30, color: "dark", cursor: "pointer", fontWeight: "bold", }}
                            />
                            {selectionType}</div>
                    </div>
                </>
                {rows.length > 0 || orderHistory.length > 0 ? (
                    <div>
                        {/* Sticky Typography Section */}
                        <div style={{
                            position: "sticky",
                            top: 0,
                            backgroundColor: "white",
                            zIndex: 1100,  // Higher than TableHead
                            padding: ""
                        }}>
                            <Typography variant="h4" className=' mb-2'>

                                <div className='d-flex justify-content-end '>
                                    {selectionType === 'ORDER HISTORY' && (
                                        <div className='d-flex justify-content-end '>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateRangePicker
                                                    value={dateRange}
                                                    onChange={setDateRange}
                                                    format="YYYY-MM-DD"
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    )}
                                </div>
                            </Typography>
                        </div>

                        {/* Table Section */}
                        <div className='border border-5 rounded'>
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell />
                                            {selectionType === 'ORDER HISTORY' && <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>SI.NO</TableCell>}
                                            <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>ORDER ID</TableCell>
                                            <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>MOBILE NUMBER</TableCell>
                                            <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>{selectionType === 'ORDER HISTORY' ? 'ORDERED DATE & TIME' : 'DATE & TIME'}</TableCell>
                                            {selectionType === 'ORDER HISTORY' && <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>DELIVERED DATE & TIME</TableCell>}
                                            <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>STATUS</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {selectionType === 'ORDER HISTORY' ?
                                            filteredOrders.map((order, index) => (
                                                <Row key={order.id} selectionType={selectionType} orderHistory={order} index={index + 1} />
                                            )) :
                                            rows.map((row) => (
                                                <Row key={row.id} row={row} selectionType={selectionType} />
                                            ))
                                        }


                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                ) : <h3>No Orderes yet</h3>}


            </>
        )
    }



    function Row(props) {

        console.log(props);

        const { row, selectionType, orderHistory } = props;
        console.log(orderHistory);


        const [open, setOpen] = useState(false);
        const [status, setStatus] = useState(selectionType === "ORDER RECEIVED" ? row.status[0].orderStatus || 'received' : ''); // Default status



        const handleStatusChange = async (event, orderId, counterId) => {
            const newStatus = event.target.value; // Capture the new status

            try {
                setStatus(newStatus); // Update the state

                const data = {
                    orderId,
                    counterIdToUpdate: counterId,
                    statusToUpdate: newStatus // Use the updated status
                };

                console.log("Sending Data:", data);

                const res = await Service.put("/order/updateOrderStatus", data);
                console.log("Response:", res);
                getOrderHistory()
                getOrders()
            } catch (error) {
                console.error("Error updating status:", error);
            }
        };


        const getStatusColor = (status) => {
            switch (status) {
                case "Received":
                    return "green";
                case "InProgress":
                    return "orange";
                case "Ready":
                    return "blue";
                case "Delivered":
                    return "purple";
                default:
                    return "transparent"; // Default color if status is not matched
            }
        };

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon sx={{ color: 'black' }} /> : <KeyboardArrowDownIcon sx={{ color: 'black' }} />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                        {selectionType === "ORDER RECEIVED" ? row.id : orderHistory.id}
                    </TableCell>
                    {selectionType === "ORDER RECEIVED" ? "" : <TableCell align="center">{orderHistory.orderId}</TableCell>}
                    {/* <TableCell align="center">{ selectionType === "ORDER RECEIVED" ? orderHistory.OrderId : ""}</TableCell> */}
                    <TableCell align="center">{selectionType === "ORDER RECEIVED" ? row.userMobile : orderHistory.userMobile}</TableCell>
                    <TableCell align="center">{selectionType === "ORDER RECEIVED" ? row.orderedAt : orderHistory.orderedAt}</TableCell>
                    {selectionType === "ORDER RECEIVED" ? '' : <TableCell align="center">{orderHistory.delivered_at}</TableCell>}


                    <TableCell align="center" sx={{ color: 'gray' }} >
                        {selectionType === "ORDER RECEIVED" ? <Select
                            value={status}
                            onChange={(event) => handleStatusChange(event, row.id, row.status[0].counterId, status)}
                            size="small"
                            sx={{ width: 130, backgroundColor: getStatusColor(status), color: 'white' }}

                        >

                            <MenuItem value="Received" sx={{ color: 'green' }}>Received</MenuItem>
                            <MenuItem value="InProgress" sx={{ color: 'orange' }}>In Progress</MenuItem>
                            <MenuItem value="Ready" sx={{ color: 'blue' }}>Ready</MenuItem>
                            <MenuItem value="Delivered" sx={{ color: 'purple' }}>Delivered</MenuItem>


                        </Select> : "Delivered"}
                    </TableCell>
                    {/* <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, color: 'black', paddingTop: 0 }} colSpan={7}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Order Details
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><span className='fw-bold'>Item Name</span></TableCell>
                                            <TableCell><span className='fw-bold'>Quantity</span></TableCell>
                                            <TableCell align="right"><span className='fw-bold'>Amount</span></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectionType === "ORDER RECEIVED" ?
                                            row.orderDetails.map((item) => (
                                                item.items.map((item) => (
                                                    < TableRow key={item.itemName} >
                                                        <TableCell component="th" scope="row">
                                                            {item.itemName}
                                                        </TableCell>
                                                        <TableCell>{item.quantity}</TableCell>
                                                        <TableCell align="right">{item.price * item.quantity}</TableCell>
                                                    </TableRow>
                                                ))
                                            ))
                                            :
                                            orderHistory.orderDetails.map((item) => (
                                                item.items.map((item) => (
                                                    < TableRow key={item.itemName} >
                                                        <TableCell component="th" scope="row">
                                                            {item.itemName}
                                                        </TableCell>
                                                        <TableCell>{item.quantity}</TableCell>
                                                        <TableCell align="right">{item.price * item.quantity}</TableCell>
                                                    </TableRow>
                                                ))


                                            ))}
                                        <TableRow>
                                            <TableCell colSpan={2} align="right"><strong>Total:</strong></TableCell>
                                            <TableCell align="right">
                                                <strong>
                                                    {selectionType === "ORDER RECEIVED"
                                                        ? row.orderDetails.reduce((total, items) =>
                                                            total + items.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0), 0).toFixed(2)
                                                        : orderHistory.orderDetails.reduce((total, items) =>
                                                            total + items.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0), 0).toFixed(2)}
                                                </strong>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment >
        );
    }


    function DayWiseReport({ dayWiseReport, goBack1 }) {
        return (
            <>
                <>
                    <div className='col-12 col-xs-12 col-sm-12 col-md-8 col-lg-9 col-xl-9'>
                        <h3 className='text-start mt-2 text-primary'>
                            <ArrowBackIosTwoTone
                                onClick={goBack1}
                                style={{ fontSize: 30, color: "dark", cursor: "pointer", fontWeight: "bold", }}
                            />
                            Go Back </h3>
                    </div>
                </>
                <div className='text-center'>
                    <h4>DAY WISE FINANCIAL REPORT</h4>
                </div>
                <div>
                    <table className='table table-bordered text-center  '>
                        <thead className='table-dark'>
                            <tr>
                                <th>SI.NO</th>
                                <th>Date</th>
                                <th>No of Orders</th>
                                <th>Total Price (₹)</th>
                                <th>Admin Share (₹)</th>
                                <th>Counter Share (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dayWiseReport.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.date}</td>
                                    <td>{item.numOrders}</td>
                                    <td>{item.totalPrice.toFixed(2)}</td>
                                    <td>{item.adminShare.toFixed(2)}</td>
                                    <td>{item.counterShare.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }



    if (showOrderReceived)
        return <OrderReceived selectionType={selectionType} rows={rows} orderHistory={orderHistory} goBack={goBack} />




    return (
        <>
            <div className='container mt-1'>
                <div className='row row-gap-5'>

                    {crads.map((item, index) =>
                    (<div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4' key={index}>
                        <div className='container'>
                            <div className='  justify-content-between align-items-center'>
                                <div className='' style={{ cursor: 'pointer' }} onClick={() => handleClick(item.name)}>
                                    <div className="card card_data" style={{
                                        backgroundColor: 'aliceblue',
                                        border: '2px solid black ',
                                        borderRadius: '10px',
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.3s ease',
                                    }}>
                                        <div className="card-body">
                                            <img src={item.imageUrl} alt="Counter Images" style={{ height: "200px", width: "100%", objectFit: "cover" }} />
                                        </div>
                                        <div className="card-footer text-center" style={{
                                            backgroundColor: "darkblue",
                                            color: "white",
                                            borderTopLeftRadius: "0px",
                                            borderTopRightRadius: "0px",
                                        }}>
                                            <h3>
                                                {item.name}{" "}
                                                {item.icon && <span className="text-white">{item.icon}</span>}
                                            </h3>
                                        </div>
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