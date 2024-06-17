import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const AddParticipant = () => {

    const [participant, setParticipant] = useState({
        name: '',
        email: ''
    })
    const navigate = useNavigate()

    const onTextChange = (e) => {
        const copy = { ...participant }
        copy[e.target.name] = e.target.value
        setParticipant(copy)
    }

    const onAddClick = async () => {
        await axios.post('/api/participants/add', participant)
        navigate('/list-participants')
    }

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px', backgroundColor: 'rgb(248, 249, 250)' }}>
                    <h2 className="card-title text-center mb-4">Add Participant</h2>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Enter participant name" name="name"
                            value={participant.name} onChange={onTextChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email (optional)</label>
                        <input type="email" className="form-control" placeholder="Enter participant email" name="email"
                            value={participant.email} onChange={onTextChange} />
                    </div>
                    <button className="btn btn-primary w-100" onClick={onAddClick}>Add Participant</button>
                </div>
            </div>
        </div>
    )
}

export default AddParticipant