import React, { useState } from "react"

function Maas() {
  const [maas, setMaas] = useState("")
  const [kaydedilenMaas, setKaydedilenMaas] = useState(null)
  const [rows, setRows] = useState([{ id: 1 }]) // Initial row

  const save = () => {
    setKaydedilenMaas(maas)
  }

  const addRow = () => {
    const newRowId = rows.length + 1
    setRows([...rows, { id: newRowId }])
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <form>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Maaş Miktarı"
                value={maas}
                onChange={e => setMaas(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary btn-block"
              onClick={save}
              type="button"
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h2 className="text-center">Maaşlar</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  Toplam Maaş:
                  <input className="form-control" value={kaydedilenMaas} />
                </th>
                <th scope="col">
                  Yatırım
                  <input
                    className="form-control"
                    value={kaydedilenMaas * 0.2}
                    disabled
                  />
                </th>
                <th scope="col">
                  Lüks
                  <input
                    className="form-control"
                    value={kaydedilenMaas * 0.3}
                    disabled
                  />
                </th>
                <th scope="col">
                  İhtiyaç
                  <input
                    className="form-control"
                    value={kaydedilenMaas * 0.5}
                    disabled
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id}>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Dropdown button
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <div className="dropdown-item">Eğlence</div>
                          <div className="dropdown-item">Giyim</div>
                          <div className="dropdown-item">Yemek</div>
                          <div className="dropdown-item">Yatırım</div>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <input className="form-control" />
                  </td>
                  <td>
                    <input className="form-control" />
                  </td>
                  <td>
                    <input className="form-control" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success" onClick={addRow}>
            +
          </button>
          <button className="btn btn-primary">Kaydet</button>
        </div>
      </div>
    </div>
  )
}

export default Maas
