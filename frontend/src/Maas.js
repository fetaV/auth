import React, { useState, useEffect } from "react"
import axios from "axios"

function Maas() {
  const [maaslar, setMaaslar] = useState([])
  const [maasMiktari, setMaasMiktari] = useState("")
  const [extraRows, setExtraRows] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem("token")

    axios
      .get("/api/maas", {
        headers: {
          Authorization: token,
        },
      })
      .then(res => setMaaslar(res.data))
      .catch(err => console.error(err))
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "/api/maas",
        {
          maasMiktari,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      setMaaslar([...maaslar, response.data])
      setMaasMiktari("")
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddRow = () => {
    setExtraRows(extraRows + 1)
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const updatedMaaslar = [...maaslar]
    updatedMaaslar[index][name] = value
    setMaaslar(updatedMaaslar)
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Maaş Miktarı"
                value={maasMiktari}
                onChange={e => setMaasMiktari(e.target.value)}
              />
            </div>
            <button className="btn btn-primary btn-block" type="submit">
              Kaydet
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
                <th scope="col">Maaş Miktarı</th>
                <th scope="col">Yatırım</th>
                <th scope="col">Lüks</th>
                <th scope="col">İhtiyaç</th>
              </tr>
            </thead>
            <tbody>
              {maaslar.map((maas, index) => (
                <tr key={maas._id}>
                  <td>
                    <input
                      type="number"
                      name="maasMiktari"
                      value={maas.maasMiktari}
                      onChange={e => handleInputChange(e, index)}
                    />
                  </td>
                  <td>{maas.yatirim}</td>
                  <td>{maas.luks}</td>
                  <td>{maas.ihtiyac}</td>
                </tr>
              ))}
              {[...Array(extraRows)].map((_, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="number"
                      name="maasMiktari"
                      value={maaslar[maaslar.length - 1]?.maasMiktari || ""}
                      onChange={e => handleInputChange(e, maaslar.length - 1)}
                    />
                  </td>
                  <td>{/* Yatırım */}</td>
                  <td>{/* Lüks */}</td>
                  <td>{/* İhtiyaç */}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success" onClick={handleAddRow}>
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default Maas
