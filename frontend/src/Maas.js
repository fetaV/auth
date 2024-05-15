// client/src/Maas.js

import React, { useState, useEffect } from "react"
import axios from "axios"

function Maas() {
  const [maaslar, setMaaslar] = useState([])
  const [maasMiktari, setMaasMiktari] = useState("")
  const [eksi, setEksi] = useState([])
  const [yatirim, setYatirim] = useState("")
  const [luks, setLuks] = useState("")
  const [ihtiyac, setIhtiyac] = useState("")
  const yatirimMiktari = maaslar.length > 0 ? maaslar[0].maasMiktari * 0.2 : ""
  const luksMiktari = maaslar.length > 0 ? maaslar[0].maasMiktari * 0.3 : ""
  const ihtiyacMiktari = maaslar.length > 0 ? maaslar[0].maasMiktari * 0.5 : ""
  const toplamYatirim = maaslar.reduce(
    (total, maas) => total + (maas.yatirim || 0),
    0
  )
  const toplamLuks = maaslar.reduce(
    (total, maas) => total + (maas.luks || 0),
    0
  )
  const toplamIhtiyac = maaslar.reduce(
    (total, maas) => total + (maas.ihtiyac || 0),
    0
  )

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
      handleSave()
    } catch (err) {
      console.error(err)
    }
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
                <th scope="col">Maaş Miktar: {maasMiktari}</th>
                <th scope="col">Yatırım: {yatirimMiktari}</th>
                <th scope="col">Lüks: {luksMiktari}</th>
                <th scope="col">İhtiyaç: {ihtiyacMiktari}</th>
              </tr>
            </thead>
            <tbody>
              {maaslar.map((maas, index) => (
                <>
                  <tr key={maas._id}>
                    <td>
                      <input
                        className="form-control"
                        type="number"
                        value={maas.maasMiktari}
                        onChange={e => e.target.value}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="number"
                        defaultValue={maas.maasMiktari * 0.2}
                        value={maas.yatirim}
                        onChange={e => setYatirim(e.target.value)}
                        disabled={maas.yatirim ? true : false}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="number"
                        defaultValue={maas.maasMiktari * 0.3}
                        value={maas.luks}
                        onChange={e => setLuks(e.target.value)}
                        disabled={maas.luks ? true : false}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="number"
                        defaultValue={maas.maasMiktari * 0.5}
                        value={maas.ihtiyac}
                        onChange={e => setIhtiyac(e.target.value)}
                        disabled={maas.ihtiyac ? true : false}
                      />
                    </td>
                  </tr>
                </>
              ))}
              <tr>
                <td>Toplam Harcanan Tutar</td>
                <td>{toplamYatirim}</td>
                <td>{toplamIhtiyac}</td>
                <td>{toplamLuks}</td>
              </tr>
              <tr>
                <td>Kalan Tutar</td>
                <td>{yatirimMiktari - toplamYatirim}</td>
                <td>{luksMiktari - toplamLuks}</td>
                <td>{ihtiyacMiktari - toplamIhtiyac}</td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={handleSave}>
            Kaydet
          </button>
        </div>
      </div>
    </div>
  )
}

export default Maas
