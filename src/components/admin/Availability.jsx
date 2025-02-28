
import React, { use, useEffect, useState } from 'react'
import { Card, Typography, Button, Switch, FormControlLabel, Container,Badge , TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import CounterRegistrationApis from '../Api_Services/CounterRegistrationApis';
import DataTable from 'react-data-table-component'





function Availability() {
    const [counters, setCounters] = useState([]);
    const [switchStates, setSwitchStates] = useState({}); 
    const [searchText, setSearchText] = useState(""); // Search text
    const [filteredCounters, setFilteredCounters] = useState([]); // Filtered data
  
    const fetchData = async () => {
        try {
            const response = await CounterRegistrationApis.fetchAllRegisteredCounterDetails();
            if (response.status === 200) {
                setCounters(response.data);
                setFilteredCounters(response.data)
            }
        } catch (error) {
            // console.error("API call failed:", error);
            alert("API was not called");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

   
    const handleChange = async (counter) => {
       
        const id = counter.ID;
        const availability = counter.AVAILABLE == 1 ? 0 : 1; 

        console.log(counter,id,availability);
        

        try {
            const response = await CounterRegistrationApis.registerCounterUpdateForAvailability(id, availability);
            console.log(response);

            if (response.status === 201) {
                alert(response.data.message);
                fetchData();
            } else {
                throw new Error("Failed to update availability");
            }
        } catch (error) {
            alert("Error: " + (error.response?.data?.message || "API call failed"));
            
        }
    };

 const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    const filteredData = counters.filter((counter) =>
        counter.COUNTERNAME.toLowerCase().includes(searchValue)
    );
    setFilteredCounters(filteredData);
};
  
    const columns = [
        {
            name: "Counter Name",
            selector: (row) => row.COUNTERNAME,
            sortable: true,
            wrap: true,
            cell: (row) => <b>{row.COUNTERNAME}</b>,
            
        },
        // {
        //     name: "Owner Name",
        //     selector: (row) => row.OWNERNAME,
        //     sortable: true,
        //     center: true,
        //     cell: (row) => <b>{row.OWNERNAME}</b>,
        // },
        // {
        //     name: "Mobile Number",
        //     selector: (row) => row.MOBILENO,
        //     sortable: true,
        //     center: true,
        //     cell: (row) => <b>{row.MOBILENO}</b>,
        // },
        {
            name: "Status",
            selector: (row) => row.AVAILABLE,
            sortable: true,
            center: true,
            cell: (row) => (
                <Badge bg={row.AVAILABLE === 1 ? "success" : "danger"} className="p-2">
                    {row.AVAILABLE === 1 ? "Open" : "Closed"}
                </Badge>
            ),
        },
        
        {
            name: "Actions",
            center: true,
            cell: (row) => (
                <Button
                    variant="contained"
                    className="px-3 py-1 fw-bold rounded-pill w-50 h-75"
                    onClick={() => handleChange(row)}
                >
                    Change
                </Button>
            ),
        },
    ];


const tableStyles = {
    tableHead: {
        backgroundColor: "darkblue",
        color: "white",
        fontSize: "16px",
        padding: "12px",
        Margin:'10px',
    },
    tableRow: {
        borderBottom: "1px solid #ccc",
    },
    tableRowHover: {
        backgroundColor: "#f8f9fa",
    },
    searchInput: {
        width: "100%",
        padding: "10px",
        borderRadius: "10px",
        border: "2px solid #007bff",
        fontSize: "16px",
        marginBottom: "10px",
    },
};

    return (
        <Container className="mt-4">
            <h4 className="text-primary mb-3">Counters Availability</h4>
            
                        <TextField
                            type="text"
                            placeholder="🔍 Search Counter Name..."
                            value={searchText}
                            onChange={handleSearch}
                            className="search-input mb-3"
                        />
                  
            <DataTable
                        columns={columns}
                        data={filteredCounters}
                        pagination
                        highlightOnHover
                        striped
                        responsive
                        defaultSortField="COUNTERNAME"
                        customStyles={{
                            headCells: {
                                style: tableStyles.tableHead,
                            },
                            rows: {
                                style: tableStyles.tableRow,
                                hoverStyle: tableStyles.tableRowHover,
                            },
                        }}
                       className="custom-table"
                    />
        </Container>
    );
}

export default Availability;

