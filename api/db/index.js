const sql = require('mssql/msnodesqlv8')
const { DateTime, Date } = require('msnodesqlv8')

const config = {
    database: 'BillShare',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const addParticipant = async participant => {
    await sql.connect(config)

    const { name, email } = participant
    await sql.query`INSERT INTO Participants (Name, Email) VALUES(${name}, ${email})`

    await sql.close()
}

const getParticipants = async () => {
    await sql.connect(config)
    const { recordset } = await sql.query`SELECT * FROM Participants`
    await sql.close()

    return recordset
}

const addBill = async bill => {
    await sql.connect(config)

    const { total, participants } = bill;
    const { recordset } = await sql.query`INSERT INTO Bills (TotalAmount, NumberOfParticipants, Date) 
                                          VALUES(${total}, ${participants.length}, ${new Date()})
                                          SELECT SCOPE_IDENTITY() as 'Id'`


    for (let i = 0; i < participants.length; i++) {
        const p = participants[i];

        await sql.query`INSERT INTO BillsParticipants (BillId, ParticipantId, Amount)
                        VALUES (${recordset[0].Id}, ${p.id}, ${total / participants.length})`
    }

    await sql.close()
}

const getBills = async () => {
    await sql.connect(config)
    const { recordset } = await sql.query`SELECT * FROM Bills`
    await sql.close()

    return recordset
}

const getBillDetails = async id => {
    await sql.connect(config)

    const { recordset } = await sql.query`SELECT b.TotalAmount, b.Date, bp.Amount, p.Name from Bills b 
                                    JOIN BillsParticipants bp
                                    ON b.id = bp.BillId
                                    JOIN Participants p
                                    ON p.Id = bp.ParticipantId
                                    WHERE b.Id = ${id}`

    await sql.close()

    return recordset
}

module.exports = { addParticipant, getParticipants, addBill, getBills, getBillDetails };