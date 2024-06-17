import { useState, useEffect } from "react"
import axios from "axios"

const ListParticipants = () => {
    const [list, setList] = useState([])

    useEffect((() => {
        const getList = async () => {
            const { data } = await axios.get('/api/participants/get')
            setList(data)
        }

        getList()
    }), [])

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="container mt-5">
                <h2>Participants List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(p =>
                            <tr key={p.id}>
                                <th scope="row">{p.id}</th>
                                <td>{p.name}</td>
                                <td>{p.email}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListParticipants
