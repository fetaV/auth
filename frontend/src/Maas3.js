import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaPen } from "react-icons/fa6"

function Maas3() {
  const [maaslar, setMaaslar] = useState([])
  const [maasMiktari, setMaasMiktari] = useState("")
  const [selectedOption, setSelectedOption] = useState(
    "Harcama seçeneği seçiniz"
  )

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

  const handleOptionSelect = option => {
    setSelectedOption(option)
  }

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

  return (
    <div className="container mt-5">
      <ToastContainer />

      <div className="row">
        <div className="col-md-3">
          <h3>Parasal Düzenlemeler</h3>
          <form>
            {!maaslar.some(maas => maas.maasMiktari) && (
              <div className="form-group mt-3 border rounded p-3 mb-3">
                <label htmlFor="typeRepsX" className="form-label">
                  Maaşınızı Giriniz
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="typeRepsX"
                  placeholder="Maaş"
                  value={maasMiktari}
                  required
                  onChange={e => setMaasMiktari(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary mt-3"
                >
                  Save
                </button>
              </div>
            )}
            <div className="border rounded p-3 mb-3">
              <div className="form-group mt-3">
                <label htmlFor="editIhtiyac" className="form-label">
                  Harcama
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editIhtiyac"
                  placeholder="Harcanan yeri giriniz"
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="typeTitleX" className="form-label">
                  Kullanım
                </label>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedOption}
                  </button>
                  <ul className="dropdown-menu w-100">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleOptionSelect("İhtiyaç")}
                      >
                        İhtiyaç
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleOptionSelect("Yatırım")}
                      >
                        Yatırım
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleOptionSelect("Lüks")}
                      >
                        Lüks
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="typeLoadX" className="form-label">
                  Miktar
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="typeLoadX"
                  placeholder="Miktar"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Harcama Tablosu</h3>
            {maaslar.map((maas, index) => (
              <h4
                key={index}
                className="btn btn-info d-flex justify-content-center align-items-center "
                data-bs-toggle="modal"
                data-bs-target="#maasEditModal"
              >
                Toplam Maaş Miktarı: {maas.maasMiktari}
                <FaPen className="ms-2" />
              </h4>
            ))}
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <table className="table">
                <thead>
                  <tr>
                    <th>Harcama</th>
                    <th>İhtiyaç</th>
                    <th>Yatırım</th>
                    <th>Lüks</th>
                    <th>Aksiyon</th>
                  </tr>
                </thead>
                <tbody>
                  {maaslar.map((maas, index) => (
                    <tr key={index}>
                      <td data-title="Harcama Seçeneği">Eğlence</td>
                      <td data-title="İhtiyaç"></td>
                      <td data-title="Yatırım"></td>
                      <td data-title="Lüks"></td>
                      <td data-title="Aksiyon">
                        <button
                          className="btn btn-warning me-2 text-white"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Toplam Harcanan Tutar</td>
                    <td>{toplamIhtiyac}</td>
                    <td>{toplamYatirim}</td>
                    <td>{toplamLuks}</td>
                  </tr>
                  <tr>
                    <td>Kalan Tutar</td>
                    <td>{ihtiyacMiktari - toplamIhtiyac}</td>
                    <td>{yatirimMiktari - toplamYatirim}</td>
                    <td>{luksMiktari - toplamLuks}</td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>
      </div>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">
                Harcama Düzenleme
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group mt-3">
                <label htmlFor="editIhtiyac" className="form-label">
                  İhtiyaç
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="editIhtiyac"
                  placeholder="İhtiyac"
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="editReps" className="form-label">
                  Yatirim
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="editYatirim"
                  placeholder="Yatirim"
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="editLuks" className="form-label">
                  Luks
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="editLuks"
                  placeholder="Luks"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                Bu işlemi silmek istediğinize emin misiniz?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Hayır
              </button>
              <button type="button" className="btn btn-success">
                Evet
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Maaş Düzenleme Modal */}
      <div
        className="modal fade"
        id="maasEditModal"
        tabIndex="-1"
        aria-labelledby="maasEditLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="maasEditLabel">
                Maaş Düzenleme
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  id="editMaas"
                  placeholder="Maas"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Maas3
