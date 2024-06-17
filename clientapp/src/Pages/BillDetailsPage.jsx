import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { FaUser } from 'react-icons/fa';
import axios from "axios";

const BillDetails = () => {

    const [details, setDetails] = useState([])
    const [total, setTotal] = useState()
    const [date, setDate] = useState()
    const { id } = useParams()


    useEffect(() => {
        const getDetails = async () => {
            const { data } = await axios.get(`/api/bills/get-details?id=${id}`)
            setDetails(data)

            setTotal(data[0].totalAmount)
            setDate(data[0].date)
        }

        getDetails()

    }, [])

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card shadow-lg" style={{ width: '100%', maxWidth: '600px' }}>
                    <div className="card-header bg-dark text-white">
                        <h2 className="card-title text-center mb-0">Bill Details</h2>
                    </div>
                    <div className="card-body">
                        <p><strong>Date:</strong> {date}</p>
                        <p><strong>Total Amount:</strong> {total}</p>
                        <h3 className="mt-4">Participants</h3>
                        <ul className="list-group">
                            {details.map(d =>
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={d.name}>
                                    <span>
                                        <FaUser className="me-2" />
                                        {d.name}
                                    </span>
                                    <span className="badge bg-success rounded-pill">{d.amount}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillDetails