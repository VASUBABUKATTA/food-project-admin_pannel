import React, { use, useState } from 'react'
import { Card, Typography, Button, Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const counters = [
    { counterName: 'counter1', mobileNumber: '9876543210', email: 'counter1@gmail.com', vendorName: 'vendor1', createdAt: new Date(), counterImage: 'https://media.istockphoto.com/id/509172658/photo/composition-with-cup-of-starbucks-coffee-and-beans.jpg?s=612x612&w=0&k=20&c=3FqaIJzw2820mKX_OUSLiey4ZtTsGWlT0JYk3qRAJDU=' },
    { counterName: 'counter2', mobileNumber: '9876543211', email: 'counter2@gmail.com', vendorName: 'vendor2', createdAt: new Date(), counterImage: 'https://images.deliveryhero.io/image/fd-th/LH/v9nq-hero.jpg?width=480&height=360&quality=45' },
    { counterName: 'counter3', mobileNumber: '9876543212', email: 'counter3@gmail.com', vendorName: 'vendor3', createdAt: new Date(), counterImage: 'https://teatimegroup.com/wp-content/uploads/2022/03/Tea-Time-franchise.jpg' },
    { counterName: 'counter4', mobileNumber: '9876543213', email: 'counter4@gmail.com', vendorName: 'vendor4', createdAt: new Date(), counterImage: 'https://www.foodbusinessnews.net/ext/resources/2023/12/12/McDonalds-Lead_adst_Nitiphol.jpg?height=667&t=1702400888&width=1080' },
    { counterName: 'counter5', mobileNumber: '9876543214', email: 'counter5@gmail.com', vendorName: 'vendor5', createdAt: new Date(), counterImage: 'https://images.jdmagicbox.com/comp/rajahmundry/q2/9999px883.x883.220423104048.q1q2/catalogue/-ybs6vdhcsw.jpg' },
    { counterName: 'counter6', mobileNumber: '9876543215', email: 'counter6@gmail.com', vendorName: 'vendor6', createdAt: new Date(), counterImage: 'https://i.ytimg.com/vi/95VS8bfdi_M/maxresdefault.jpg' },
    { counterName: 'counter7', mobileNumber: '9876543216', email: 'counter7@gmail.com', vendorName: 'vendor7', createdAt: new Date(), counterImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4LXm432XjlaiaWMHBJNoRh7lJxe2HtMjzqQ&s' },
    { counterName: 'counter8', mobileNumber: '9876543217', email: 'counter8@gmail.com', vendorName: 'vendor8', createdAt: new Date(), counterImage: 'https://res.cloudinary.com/purnesh/image/upload/w_540,f_auto,q_auto:eco,c_limit/11708001666338.jpg' },
    { counterName: 'counter9', mobileNumber: '9876543218', email: 'counter9@gmail.com', vendorName: 'vendor9', createdAt: new Date(), counterImage: 'https://i.ytimg.com/vi/uXf3xXeu1x4/maxresdefault.jpg' },
]

function Availability() {
    const [status, setStatus] = useState(true);  // true = Open, false = Closed

    const handleStatusChange = (event) => {
        setStatus(event.target.checked);
    };

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

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const [state, setState] = useState({
        gilad: true,
        jason: false,
        antoine: true,
    });

    const [switchStates, setSwitchStates] = useState({

        counter1: true,
        counter2: true,
        counter3: true,
        counter4: true,
        counter5: true,
        counter6: true,
        counter7: true,
        counter8: true,
        // counter9: true,
        // counter10: true,
    });

    const handleChange = (event) => {
        const { name, checked } = event.target;

        setSwitchStates((prevState) => ({
            ...prevState,
            [name]: checked,
        }));


    };

    console.log(switchStates);




    return (
        <div>
            {/* <Card
                sx={{
                    p: 3,
                    maxWidth: 400,
                    margin: 'auto', opacity: status ? 1 : 0.5,  // Reduce opacity when status is closed (muted effect)
                    transition: 'filter 0.1s ease-in-out'  // Smooth transition for blur effect
                }}
            >
                <Typography variant="h5">Counter Name: Counter 3</Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Mobile Number: 9876543210
                </Typography>

                <FormControlLabel
                    control={
                        <Switch
                            checked={status}
                            onChange={handleStatusChange}
                            name="status"
                            color="primary"
                        />
                    }
                    label={status ? 'Open' : 'Closed'}
                />

                <Button variant="contained" sx={{ mt: 2 }} onClick={() => alert("Status saved!")}>
                    Save Status
                </Button>
            </Card> */}
            <>


                <TableContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '40px', borderRadius: '20px' }}>
                        <Table sx={{ maxWidth: 1000, borderRadius: '20px' }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    {/* <StyledTableCell align="center">Counter ID</StyledTableCell> */}
                                    <StyledTableCell align="">Counter Name</StyledTableCell>
                                    <StyledTableCell align="" className='counter_name_switch'>Status</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {counters.map((counter, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell align=""><b className='fs-3 counter_name '>{counter.counterName}</b></StyledTableCell>
                                        <StyledTableCell align="" className='counter_name_switch'>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={!!switchStates[counter.counterName]}
                                                        onChange={handleChange}
                                                        name={counter.counterName}
                                                        color="success"
                                                    />
                                                }
                                                label={switchStates[counter.counterName] ? "open" : "closed"}
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </TableContainer>
            </>


        </div >
    )
}

export default Availability