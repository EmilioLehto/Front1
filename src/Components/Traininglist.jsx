import { useEffect, useState } from "react";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import dayjs from "dayjs";




function Customerlist() {
  const[training, setTraining] = useState([]);
  const[customer, setCustomer] = useState([]);

  useEffect(() => {
    fetchData();
    fetchCustomerList();
  }, []);


  const fetchData = () => {
    fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings')
    .then(response => response.json())
    .then(data => setTraining(data._embedded.trainings))
  }

  const fetchCustomerList = () => {
    fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
    .then(response => {
        if (!response.ok) {
            throw new Error("Error in retreiveing customer list " + response.statusText);
        }
        return response.json();
    })
    .then(data => { console.log("Customer data:", data);
    setCustomer(data._embedded.customers);
  })
    .catch(err => console.log(err))
  };

  const saveTraining = (training) => {
    fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
        method: 'POST', 
        headers: {
            'Content-Type': 'applications/json'
        },
        body: JSON.stringify(training)
    })
    .then(res => fetchData())
    .catch(err => console.log(err))
}



const columns = [
  {
    Header: 'Date',
    accessor: 'date',
    Cell: row => dayjs(row.value).format("DD.MM.YYYY HH:mm"),
    width: 300
  },
  {
    Header: 'Duration',
    accessor: 'duration',
    width: 100
  },
  {
    Header: 'Activity',
    accessor: 'activity',
    width: 200
  },
  {
    Header: 'Customer',
    accessor: 'customer',
    Cell: row => {
      const customerId = row.original.customer;
      const matchedCustomer = customer.find(cust => cust.id === customerId);
      return matchedCustomer ? `${matchedCustomer.firstname} ${matchedCustomer.lastname}` : 'N/A';
    },
    suppressHeaderMenuButton: true,
    width: "150",
  },
    

      

  ]

 
  return(
    <div>
     

      <div>
      <ReactTable
        filterable={true}
        data={training}
        columns={columns} />
    
      </div>
    </div>

  );

  }

  export default Customerlist