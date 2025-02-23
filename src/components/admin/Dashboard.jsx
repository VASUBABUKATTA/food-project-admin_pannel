import React, { useEffect, useState } from 'react'
import {
    IconButton, Menu,
    MenuItem,
    Button,
    TextField, Container, Typography, Box
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CounterProfile from './CounterProfile';
import Header from './Header';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import SideNav1 from './SideNav1';

const counters = [
    { counterName: 'counter1', mobileNumber: '9876543210', email: 'counter1@gmail.com', vendorName: 'vendor1', createdAt: new Date(), counterImage: 'https://media.istockphoto.com/id/509172658/photo/composition-with-cup-of-starbucks-coffee-and-beans.jpg?s=612x612&w=0&k=20&c=3FqaIJzw2820mKX_OUSLiey4ZtTsGWlT0JYk3qRAJDU=' },
    { counterName: 'counter2', mobileNumber: '9876543211', email: 'counter2@gmail.com', vendorName: 'vendor2', createdAt: new Date(), counterImage: 'https://images.deliveryhero.io/image/fd-th/LH/v9nq-hero.jpg?width=480&height=360&quality=45' },
    { counterName: 'counter3', mobileNumber: '9876543212', email: 'counter3@gmail.com', vendorName: 'vendor3', createdAt: new Date(), counterImage: 'https://teatimegroup.com/wp-content/uploads/2022/03/Tea-Time-franchise.jpg' },
    { counterName: 'counter4', mobileNumber: '9876543213', email: 'counter4@gmail.com', vendorName: 'vendor4', createdAt: new Date(), counterImage: 'https://www.foodbusinessnews.net/ext/resources/2023/12/12/McDonalds-Lead_adst_Nitiphol.jpg?height=667&t=1702400888&width=1080' },
    { counterName: 'counter5', mobileNumber: '9876543214', email: 'counter5@gmail.com', vendorName: 'vendor5', createdAt: new Date(), counterImage: 'https://images.jdmagicbox.com/comp/rajahmundry/q2/9999px883.x883.220423104048.q1q2/catalogue/-ybs6vdhcsw.jpg' },
    { counterName: 'counter6', mobileNumber: '9876543215', email: 'counter6@gmail.com', vendorName: 'vendor6', createdAt: new Date(), counterImage: 'https://i.ytimg.com/vi/95VS8bfdi_M/maxresdefault.jpg' },
    { counterName: 'counter7', mobileNumber: '9876543216', email: 'counter7@gmail.com', vendorName: 'vendor7', createdAt: new Date(), counterImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4LXm432XjlaiaWMHBJNoRh7lJxe2HtMjzqQ&s' },
    { counterName: 'counter8', mobileNumber: '9876543217', email: 'counter8@gmail.com', vendorName: 'vendor8', createdAt: new Date(), counterImage: 'https://res.cloudinary.com/purnesh/image/upload/w_540,f_auto,q_auto:eco,c_limit/11708001666338.jpg' },
    // { counterName: 'counter9', mobileNumber: '9876543218', email: 'counter9@gmail.com', vendorName: 'vendor9', createdAt: new Date(), counterImage: 'https://i.ytimg.com/vi/uXf3xXeu1x4/maxresdefault.jpg' },
]


const Cards = () => {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [showModal, setShowModal] = useState(false);

    const [counter, setCounter] = useState('');

    const [counterEdit, setEditCounter] = useState(false)

    const handleCardClick = (counter) => {
        console.log("handleCardClick");
        setCounter(counter);
        setShowModal(true);
    }

    // Function to go back to category view
    const goBack = () => {
        setShowModal(false);
    };

    if (showModal)
        return <CounterProfile counter={counter} goBack={goBack} />


    const editCounter = () =>
        setEditCounter(!counterEdit);


    return (
        <>
            <div>

            </div>
            <div className='container mx-2 '>
                <div className='row row-gap-4'>
                    {counters.map((counter, index) => (
                        <div className='col-3'>
                            <div className='card rounded profile_Cards' >
                                <div className='text-end' style={{ height: '200px', width: '100%', backgroundImage: `url(${counter.counterImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '100% 100%', borderRadius: '5px 5px 0 0' }} >
                                    <div class="btn  dropdown-toggle" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <SettingsIcon style={{ width: '20px', color: 'white', }} />
                                    </div>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <li><button class="dropdown-item" type="button" onClick={editCounter}>Edit</button></li>
                                        <li><button class="dropdown-item" type="button">Delete</button></li>
                                    </ul>
                                </div>
                                <div className='card-body counter_card' onClick={() => handleCardClick(counter)}  >
                                    <h5 className='card-title text-center'>{counter.counterName}</h5>
                                    <h6 className='' style={{ fontWeight: "bold" }} >Vendor Name:  <span className='text-primary'>{counter.vendorName} </span></h6>
                                    <h6 className='' style={{ fontWeight: "bold" }}>vendor Mobile: <span className='text-primary'> {counter.mobileNumber}</span></h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {counterEdit && < UpdateCounter open={true} />}
            </div>
          
        </>
    )
}


const UpdateCounter = ({ open }) => {

    const [show, setShow] = useState(open);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        ownerName: "",
        mobileNo: "",
        email: "",
        counterName: "",
        imagePath: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, imagePath: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        alert("Form submitted successfully!");
        setShow(!show);
    };

    useEffect(() => {
        setShow(true)
    }, [open])

    return (
        <>
            <Modal
                show={show}
                // onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                {/* <Modal.Header closeButton>
                    <Modal.Title>UPDATE COUNTER</Modal.Title>
                </Modal.Header> */}

                <Modal.Body>
                    <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', fontWeight: "bold", fontSize: '20px' }}>
                        UPDATE COUNTER
                    </Typography>
                    <Container maxWidth="sm">
                        <Box  >
                            {/* //sx={{ mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }} */}
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Owner Name"
                                    name="ownerName"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    margin="normal"
                                    required
                                />

                                <TextField
                                    fullWidth
                                    label="Mobile Number"
                                    name="mobileNo"
                                    type="tel"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                    margin="normal"
                                    required
                                />

                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    margin="normal"
                                    required
                                />

                                <TextField
                                    fullWidth
                                    label="Counter Name"
                                    name="counterName"
                                    value={formData.counterName}
                                    onChange={handleChange}
                                    margin="normal"
                                    required
                                />

                                {/* <Button variant="contained" component="label" sx={{ mt: 2 }}>
                                    Upload Image
                                    <input type="file" hidden onChange={handleImageChange} />
                                </Button>

                                {formData.imagePath && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        Selected: {formData.imagePath.name}
                                    </Typography>
                                )} */}
                                <div className="d-flex align-items-center gap-2 mt-3">
                                    <Button
                                        variant="contained" component="label"
                                        sx={{ width: "40%", height: "40px" }}
                                    >
                                        Upload Image
                                        <input type="file" hidden required onChange={handleImageChange} />
                                    </Button>
                                    {formData.imagePath && (
                                        <Typography variant="body2">
                                            Selected: {formData.imagePath.name}
                                        </Typography>
                                    )}
                                </div>
                                <div className='row container justify-content-between align-items-center'>
                                    <div className='col-6'>
                                        <Button variant="contained" color="white" sx={{ mt: 3 }} onClick={handleClose}>
                                            Cancel
                                        </Button></div>
                                    <div className='col-6'>
                                        <Button type='submit' variant="contained" color="primary" sx={{ mt: 3 }}>
                                            Submit
                                        </Button></div>


                                </div>
                            </form>
                        </Box>
                    </Container>
                </Modal.Body>

            </Modal>
        </>
    )
}


function Dashboard() {
    const [tab, setTab] = useState("cards");

    const [showUpdateCounter, setShowUpdateCounter] = useState(false);

    const navigate = useNavigate();

    const [counter, setCounter] = useState(false)

    const handleMenuItemClick = (tab, counter) => {
        setTab(tab);
        console.log(counter);

        if (tab === 'counterProfile') {
            navigate('/counterProfile');
            // setCounter(counter)
        }

        if (tab === 'counterEdit') {
            setCounter(true);
        }


    };

    // if (counter) {
    //     return <UpdateCounter />
    // }

    const handleBack = () => {
        setTab("cards");
        navigate(`/admin/cards`);
    };

    return (
        <>
            <div className=''>
                <Typography variant='h5'className='ms-3 mb-4 text-primary' fontWeight="bold">List of Counters Profiles :</Typography>
                                 
                <div  >
                    {(tab === 'cards') && (< Cards onMenuItemClick={handleMenuItemClick}  />)}
                </div>
            </div>
         
        </>


    );
};

export default Dashboard