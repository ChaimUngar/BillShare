import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const ListBills = () => {

    const [bills, setBills] = useState([])

    useEffect((() => {
        const getList = async () => {
            const { data } = await axios.get('/api/bills/get')
            setBills(data)
        }

        getList()
    }), [])

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="container mt-5">
                <h2>Bills List</h2>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">Participants</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bills.map(b =>
                            <tr key={b.id}>
                                <th scope="row">{b.id}</th>
                                <td>{b.date}</td>
                                <td>{b.totalAmount}</td>
                                <td>{b.numberOfParticipants}</td>
                                <td>
                                    <Link className="btn btn-primary btn-sm" to={`/bill-details/${b.id}`}>View Details</Link>
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default ListBills