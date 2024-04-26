// client/src/Maas.js

import React, { useState, useEffect } from "react"
import axios from "axios"

function Maas() {
  const [maaslar, setMaaslar] = useState([])
  const [maasMiktari, setMaasMiktari] = useState("")
  const [extraMaaslar, setExtraMaaslar] = useState([])
  const [eksi, setEksi] = useState([])
  const [yatirim, setYatirim] = useState("")
  const [luks, setLuks] = useState("")
  const [ihtiyac, setIhtiyac] = useState("")

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

  const handleExtraRowInputChange = (e, index, field) => {
    const { value } = e.target
    const updatedExtraMaaslar = [...extraMaaslar]
    updatedExtraMaaslar[index][field] = value
    setExtraMaaslar(updatedExtraMaaslar)
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "/api/maas/eksi",
        {
          yatirim,
          luks,
          ihtiyac,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      console.log(response)
      setEksi(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddRow = () => {
    setExtraMaaslar([
      ...extraMaaslar,
      { maasMiktari: "", yatirim: "", luks: "", ihtiyac: "" },
    ])
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
                required
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
                      value={maas.maasMiktari}
                      onChange={e => e.target.value}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={maas.yatirim}
                      onChange={e => setYatirim(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={maas.luks}
                      onChange={e => setLuks(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={maas.ihtiyac}
                      onChange={e => setIhtiyac(e.target.value)}
                    />
                  </td>
                </tr>
              ))}
              {extraMaaslar.map((extraMaas, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="number"
                      value={extraMaas.maasMiktari}
                      onChange={e =>
                        handleExtraRowInputChange(e, index, "maasMiktari")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={extraMaas.yatirim}
                      onChange={e => setYatirim(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={extraMaas.luks}
                      onChange={e => setLuks(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={extraMaas.ihtiyac}
                      onChange={e => setIhtiyac(e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success" onClick={handleAddRow}>
            +
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Kaydet
          </button>
        </div>
      </div>
    </div>
  )
}

export default Maas
