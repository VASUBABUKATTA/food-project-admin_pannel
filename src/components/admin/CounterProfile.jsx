import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography'
import Header from './Header';
import Footer from './Footer';
import { ArrowBackIosTwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const itemData = [
  {
    img: 'https://teatimegroup.com/wp-content/uploads/2022/03/Tea-Time-franchise.jpg',
    title: 'Counter 3',
    author: '@Vendor3',
    featured: true,
  },
]


function CounterProfile({goBack}) {
  return (
    <>
      <div className='row mb-2 ms-3'>
        <div className='col-6 mt-3 d-flex ms-5'> <Link to="" className='ms-5' style={{textDecoration:"none"}}> <ArrowBackIosTwoTone
                            onClick={goBack}
                            style={{ fontSize: 30, color: "dark", cursor: "pointer", fontWeight: "bold" }}
                        /></Link><Typography variant='h5' className='text-center fw-bold fs-4 ms-2' color='midnightblue'>Counter Profile Information :</Typography></div>
        

        </div>
      <div className='bg-seondary ms-3 mb-2'>
        <div className=''>
          <div className='row'>
            
            <div className="col-6 d-flex justify-content-center align-items-center">
              <div className="d-inline-block">
                <Typography variant="h5" className='fw-bold fs-4' sx={{ mb: 2 }}>
                  Counter Name: <span style={{ fontWeight: "normal",color:"darkblue" }}>Counter 3</span>
                </Typography>
                <Typography variant="h5" className='fw-bold fs-4' sx={{ mb: 2 }}>
                  Mobile Number: <span style={{ fontWeight: "normal",color:"royalblue" }}>9876543210</span>
                </Typography>
                <Typography variant="h5" className='fw-bold fs-4'>
                  From: <span style={{ fontWeight: "normal",color:"blue" }}>{new Date().toLocaleDateString()}</span>
                </Typography>
              </div>
            </div>
            <div className='col-6'>
              <img src="https://teatimegroup.com/wp-content/uploads/2022/03/Tea-Time-franchise.jpg" alt="Smiley face" width={500} height={300} className='rounded-circle' />
            </div>

          </div>
          <div className='row my-3'>
            <div className="col-6 d-flex justify-content-center align-items-center  " >
              <div className='d-inline-block p-4 rounded text-white fw-bold fs-4' style={{backgroundColor:"midnightblue"}}>
                <Typography variant="h5" sx={{ mb: 4 }}>
                  Vendor Name: <span style={{ fontWeight: "normal" }}>VASUBABU KATTA</span>
                </Typography>
                <Typography variant="h5">
                  Email: <span style={{ fontWeight: "normal" }}>counter3@gmail.com</span>
                </Typography>
              </div>
            </div>
            <div className="col-6 mt-2 d-flex justify-content-center align-items-center " >
              <div className='d-inline-block p-3 ms-4 rounded text-white fw-bold fs-4'style={{backgroundColor:"darkblue"}}>
                <Typography variant="h5" sx={{ mb: 5 }}>
                  Total Orders: <span style={{ fontWeight: "normal" }}>852</span>
                </Typography>
                <Typography variant="h5">
                  Total Amout: <span style={{ fontWeight: "normal" }}>9874560</span>
                </Typography>
              </div>
            </div>
          </div>

        </div >
      </div>
     
    </>

  )
}

export default CounterProfile