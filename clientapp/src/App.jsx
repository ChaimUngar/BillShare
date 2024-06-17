import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Layout from './components/Layout';
import AddParticipant from './Pages/AddParticipantPage';
import ListParticipants from './Pages/ListParticipantsPage';
import AddBill from './Pages/AddBillPage';
import ListBills from './Pages/ListBillsPage';
import BillDetails from './Pages/BillDetailsPage';

class App extends React.Component {
    render() {
        return (
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/add-participant' element={<AddParticipant />} />
                    <Route path='/list-participants' element={<ListParticipants />} />
                    <Route path='/add-bill' element={<AddBill />} />
                    <Route path='/list-bills' element={<ListBills />} />
                    <Route path='/bill-details/:id' element={<BillDetails />} />
                </Routes>
            </Layout>
        );
    }

};

export default App;