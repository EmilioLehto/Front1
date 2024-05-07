import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';




function Traininglist(){
const[customers, setCustomers] = useState([]);



useEffect(() => fetchData(),[]);

const fetchData = () => {
    fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data._embedded.customers))
}




const columns = [
{
    Header: 'Name',
    accessor: 'firstname'
},
{
    Header: 'Surname',
    accessor: 'lastname'
},
{
    Header: 'Address',
    accessor: 'streetaddress'
},
{
    Header: 'Postal code',
    accessor: 'postcode'
},
{
    Header: 'City',
    accessor: 'city'
},
{
    Header: 'Email',
    accessor: 'email'
},
{
    Header: 'Phone',
    accessor: 'phone'
}
 








]


return(
    <div>
        <ReactTable filterable={true} data={customers} columns={columns} />
    </div>
);

}


 export default Traininglist