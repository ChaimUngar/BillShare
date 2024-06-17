import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddBill = () => {

    const [totalAmount, setTotalAmount] = useState('')
    const [participants, setParticipnats] = useState([])
    const [includedParticipants, setIncludedParticipants] = useState([])
    const navigate = useNavigate()

    useEffect((() => {
        const getParticipants = async () => {
            const { data } = await axios.get('/api/participants/get')
            setParticipnats(data)
        }

        getParticipants()
    }), [])

    const onCheckChange = (p) => {

        if (!includedParticipants.includes(p)) {
            setIncludedParticipants([...includedParticipants, p])
        } else {
            setIncludedParticipants(includedParticipants.filter(participant => participant.id !== p.id))

        }
    }

    const onSubmitClick = async () => {
        const bill = {
            total: totalAmount, 
            participants: includedParticipants
        }

        await axios.post('/api/bills/add', bill)
        navigate('/list-bills')
    }

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px', backgroundColor: 'rgb(248, 249, 250)' }}>

                    <h2 className="card-title text-center mb-4">Add Bill</h2>

                    <div className="mb-3">
                        <label className="form-label">Total Amount</label>
                        <input type="number" className="form-control" id="totalAmount" placeholder="Enter total bill amount"
                            value={totalAmount} onChange={e => setTotalAmount(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Select Participants</label>
                        <div className="form-check">
                            {participants.map(p =>
                                <div key={p.id}>
                                    <input className="form-check-input" type="checkbox"
                                        value={p.id} onChange={() => onCheckChange(p)} />
                                    <label className="form-check-label">{p.name}</label>
                                </div>
                            )}
                        </div>
                    </div>

                    {Boolean(includedParticipants.length) &&
                        <div className="mt-4">
                            <h3 className="text-center">Split Amounts</h3>
                            <ul className="list-group">
                                {includedParticipants.map(p =>
                                    <li className="list-group-item d-flex justify-content-between align-items-center" key={p.id}>
                                        <span>{p.name}</span>
                                        <span>{totalAmount / includedParticipants.length}</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }

                    <button className="btn btn-primary w-100 mt-4" onClick={onSubmitClick}>Submit</button>

                </div>
            </div>
        </div>
    )
}

export default AddBill