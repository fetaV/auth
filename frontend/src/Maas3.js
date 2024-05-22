import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function Maas3() {
  return (
    <div className="container mt-5">
      <ToastContainer />

      <div className="row">
        <div className="col-md-3">
          <h3>Parasal Düzenlemeler</h3>
          <form>
            <div className="form-group mt-3 border p-3 mb-3">
              <label htmlFor="typeRepsX" className="form-label">
                Maaşınızı Giriniz
              </label>
              <input
                type="number"
                className="form-control"
                id="typeRepsX"
                placeholder="Maaş"
                required
              />
              <button type="submit" className="btn btn-primary mt-3">
                Save
              </button>
            </div>
            <div className="border p-3 mb-3">
              <div className="form-group mt-3">
                <label htmlFor="typeTitleX" className="form-label">
                  Harcama
                </label>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Harcaama seçeneği seçiniz
                  </button>
                  <ul className="dropdown-menu w-100">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
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
                    Kullanım seçeneği seçiniz
                  </button>
                  <ul className="dropdown-menu w-100">
                    <li>
                      <a className="dropdown-item" href="#">
                        İhtiyaç
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Yatırım
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
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
            <h4 className="btn btn-info disabled ">
              Toplam Maaş Miktarı: 25000
            </h4>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <table class="table">
                <th>Harcama</th>
                <th>İhtiyaç</th>
                <th>Yatırım</th>
                <th>Lüks</th>
                <th>Aksiyon</th>
                <tbody>
                  <tr>
                    <td data-title="Harcama Seçeneği">Eğlence</td>
                    <td data-title="İhtiyaç">0</td>
                    <td data-title="Yatırım">0</td>
                    <td data-title="Lüks">0</td>
                    <td data-title="Aksiyon">
                      <button
                        className="btn btn-warning me-2 text-white"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
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
                  <tr>
                    <td>Toplam Harcanan Tutar</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Kalan Tutar</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
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
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
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
    </div>
  )
}

export default Maas3
