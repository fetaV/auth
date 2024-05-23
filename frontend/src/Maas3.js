import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaPen } from "react-icons/fa6"

function Maas3() {
  const [maaslar, setMaaslar] = useState([])
  const [maasMiktari, setMaasMiktari] = useState("")
  const [newMaas, setNewMaas] = useState("")
  const [miktar, setMiktar] = useState("")
  const [harcama, setHarcama] = useState("")
  const [modalMiktar, setModalMiktar] = useState("")
  const [modalHarcama, setModalHarcama] = useState("")
  const [modalKullanim, setModalKullanim] = useState()
  const [harcamalar, setHarcamalar] = useState([])
  const [maasToEdit, setMaasToEdit] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [selectedOption, setSelectedOption] = useState(
    "Harcama seçeneği seçiniz"
  )
  const [selectedOptionModal, setSelectedOptionModal] = useState(
    "Harcama seçeneği seçiniz"
  )

  const yatirimMiktari = maaslar.length > 0 ? maaslar[0].maasMiktari * 0.2 : ""
  const luksMiktari = maaslar.length > 0 ? maaslar[0].maasMiktari * 0.3 : ""
  const ihtiyacMiktari = maaslar.length > 0 ? maaslar[0].maasMiktari * 0.5 : ""

  const toplamIhtiyac = harcamalar
    .filter(harcama => harcama.kullanim === 0)
    .reduce((acc, harcama) => acc + harcama.miktar, 0)

  const toplamYatirim = harcamalar
    .filter(harcama => harcama.kullanim === 1)
    .reduce((acc, harcama) => acc + harcama.miktar, 0)

  const toplamLuks = harcamalar
    .filter(harcama => harcama.kullanim === 2)
    .reduce((acc, harcama) => acc + harcama.miktar, 0)

  const handleEditModalOpen = userId => {
    const modalEdit = harcamalar.find(modal => modal._id === userId)
    setModalMiktar(modalEdit.miktar)
    setModalHarcama(modalEdit.aciklama)
    setModalKullanim(modalEdit.kullanim)

    // Kullanım değerini belirlemek için
    let kullanimText
    if (modalEdit.kullanim === 0) {
      kullanimText = "İhtiyaç"
    } else if (modalEdit.kullanim === 1) {
      kullanimText = "Yatırım"
    } else if (modalEdit.kullanim === 2) {
      kullanimText = "Lüks"
    }
    setSelectedOptionModal(kullanimText)
    console.log(modalEdit)
  }

  const handleDeleteModalOpen = userId => {
    const modalEdit = harcamalar.find(modal => modal._id === userId)
    console.log(modalEdit)
    setDeleteId(userId)
  }

  const handleOptionSelect = option => {
    setSelectedOption(option)
  }
  const handleOptionSelectModal = option => {
    setSelectedOptionModal(option)

    // Kullanım değerini belirlemek için
    let kullanimValue
    if (option === "İhtiyaç") {
      kullanimValue = 0
    } else if (option === "Yatırım") {
      kullanimValue = 1
    } else if (option === "Lüks") {
      kullanimValue = 2
    }
    setModalKullanim(kullanimValue)
  }

  const parasalDuzenlemeler = async e => {
    e.preventDefault()

    let kullanimTipi
    if (selectedOption === "İhtiyaç") {
      kullanimTipi = 0
    } else if (selectedOption === "Yatırım") {
      kullanimTipi = 1
    } else if (selectedOption === "Lüks") {
      kullanimTipi = 2
    }

    const data = {
      aciklama: harcama,
      kullanim: kullanimTipi,
      miktar: parseInt(miktar, 10),
    }

    console.log("Data to be sent:", data) // Log eklendi

    try {
      const response = await axios.post("/api/maas3", data)
      console.log("Response data:", response.data) // Log eklendi
      setHarcamalar([...harcamalar, response.data])
      toast.success("Harcama eklendi!")
      setHarcama("")
      setMiktar("")
      setSelectedOption("Harcama seçeneği seçiniz")

      // Başarılı kayıttan sonra yapılacak işlemler
    } catch (error) {
      console.error("Error saving the data", error)
    }
  }

  const handleEditMaas = maas => {
    setMaasToEdit(maas) // Düzenlenecek maaşı belirle
    setNewMaas(maas.maasMiktari) // Modal içindeki input değerini belirle
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

    axios
      .get("/api/maas3", {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log(res)
        setHarcamalar(res.data)
      })
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

  const handleDelete = async userId => {
    try {
      console.log("Silinecek ID:", userId) // Debugging için ID'yi yazdır
      const token = localStorage.getItem("token")
      await axios.delete(`/api/maas3/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer eklenerek token gönderimi düzeltildi
        },
      })
      setHarcamalar(harcamalar.filter(harcama => harcama._id !== userId))
      toast.success("Harcama başarıyla silindi!")
    } catch (error) {
      console.error(
        "Hata mesajı:",
        error.response?.data?.message || error.message
      )
      toast.error("Harcama silinirken bir hata oluştu.")
    }
  }

  return (
    <div className="container mt-5">
      <ToastContainer />

      <div className="row">
        <div className="col-md-3">
          <h3>Parasal Düzenlemeler</h3>
          <form className="mt-3">
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
              <form>
                <div className="form-group mt-3">
                  <label htmlFor="harcama" className="form-label">
                    Harcama
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="harcama"
                    value={harcama}
                    onChange={e => setHarcama(e.target.value)}
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
                  <label htmlFor="miktar" className="form-label">
                    Miktar
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="miktar"
                    value={miktar}
                    onChange={e => setMiktar(e.target.value)}
                    placeholder="Miktar"
                    required
                  />
                </div>
                <button
                  type="submit"
                  onClick={parasalDuzenlemeler}
                  className="btn btn-primary mt-3"
                >
                  Save
                </button>
              </form>
            </div>
          </form>
        </div>
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Harcama Tablosu</h3>
            {maaslar.map((maas, index) => (
              <h4
                key={index}
                className="btn btn-info d-flex justify-content-center align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#maasEditModal"
                onClick={() => handleEditMaas(maas)}
              >
                Toplam Maaş Miktarı: {maas.maasMiktari}
                <FaPen className="ms-2" />
              </h4>
            ))}
          </div>
          <ul className="list-group mt-1">
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
                  {harcamalar.map((harcama, index) => (
                    <tr key={index}>
                      <td data-title="Harcama Seçeneği">{harcama.aciklama}</td>
                      {harcama.kullanim === 0 ? (
                        <>
                          <td data-title="İhtiyaç">{harcama.miktar}</td>
                          <td data-title="Yatırım" className="text-danger">
                            <b>0</b>
                          </td>
                          <td data-title="Lüks" className="text-danger">
                            <b>0</b>
                          </td>
                        </>
                      ) : harcama.kullanim === 1 ? (
                        <>
                          <td data-title="İhtiyaç" className="text-danger">
                            <b>0</b>
                          </td>
                          <td data-title="Yatırım">{harcama.miktar}</td>
                          <td data-title="Lüks" className="text-danger">
                            <b>0</b>
                          </td>
                        </>
                      ) : (
                        <>
                          <td data-title="İhtiyaç" className="text-danger">
                            <b>0</b>
                          </td>
                          <td data-title="Yatırım" className="text-danger">
                            <b>0</b>
                          </td>
                          <td data-title="Lüks">{harcama.miktar}</td>
                        </>
                      )}
                      <td data-title="Aksiyon">
                        <button
                          className="btn btn-warning me-2 text-white"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => handleEditModalOpen(harcama._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
                          onClick={() => handleDeleteModalOpen(harcama._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <b>Toplam Harcanan Tutar</b>
                    </td>
                    <td data-title="İhtiyaç">{toplamIhtiyac}</td>
                    <td data-title="Yatırım">{toplamYatirim}</td>
                    <td data-title="Lüks">{toplamLuks}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Kalan Tutar</b>
                    </td>
                    <td data-title="Kalan İhtiyaç Tutarı">
                      {ihtiyacMiktari - toplamIhtiyac}
                    </td>
                    <td data-title="Kalan Yatırım Tutarı">
                      {yatirimMiktari - toplamYatirim}
                    </td>
                    <td data-title="Kalan Lüks Tutarı">
                      {luksMiktari - toplamLuks}
                    </td>
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
              <form>
                <div className="form-group mt-3">
                  <label htmlFor="harcama" className="form-label">
                    Harcama
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="harcama"
                    value={modalHarcama}
                    onChange={e => setModalHarcama(e.target.value)}
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
                      {selectedOptionModal}
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleOptionSelectModal("İhtiyaç")}
                        >
                          İhtiyaç
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleOptionSelectModal("Yatırım")}
                        >
                          Yatırım
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleOptionSelectModal("Lüks")}
                        >
                          Lüks
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="miktar" className="form-label">
                    Miktar
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="miktar"
                    value={modalMiktar}
                    onChange={e => setModalMiktar(e.target.value)}
                    placeholder="Miktar"
                    required
                  />
                </div>
              </form>
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
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleDelete(deleteId)}
              >
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
                  value={newMaas}
                  onChange={e => setNewMaas(e.target.value)}
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
