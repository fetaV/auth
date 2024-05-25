// server/routes/maas3.js

const express = require("express")
const jwt = require("jsonwebtoken")
const Maas3 = require("../models/Maas3")
const User = require("../models/User")

const router = express.Router()
// Middleware: JWT doğrulama
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  console.log("Received token:", token) // Debug satırı
  if (!token) return res.status(403).send("Token required")
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token")
    req.user = decoded
    next()
  })
}

// Yeni harcama kaydı oluşturma
router.post("/", verifyToken, async (req, res) => {
  try {
    const { aciklama, kullanim, miktar } = req.body
    const newMaas = new Maas3({
      aciklama,
      kullanim,
      miktar,
      userId: req.user._id, // UserId JWT'den alınıyor
    })
    const savedMaas = await newMaas.save()
    console.log("Saved document:", savedMaas)
    res.status(201).json(savedMaas)
  } catch (error) {
    console.error("Error saving data:", error)
    res.status(500).json({ error: "Failed to save the data" })
  }
})

// Tüm harcamaları getir
router.get("/", verifyToken, async (req, res) => {
  try {
    const harcamalar = await Maas3.find({ userId: req.user._id }) // UserId JWT'den alınıyor
    res.json(harcamalar)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Harcama sil
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params

  try {
    const harcama = await Maas3.findByIdAndDelete(id)

    if (!harcama) {
      return res.status(404).json({ error: "Harcama bulunamadı" })
    }

    console.log("Harcama silindi:", harcama)
    res.status(204).end()
  } catch (error) {
    console.error("Hata oluştu:", error)
    res.status(500).json({ error: "Harcama silinirken bir hata oluştu" })
  }
})

// Harcama düzenle
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params
  const { aciklama, kullanim, miktar } = req.body

  try {
    const updatedHarcama = await Maas3.findByIdAndUpdate(
      id,
      { aciklama, kullanim, miktar },
      { new: true }
    )

    if (!updatedHarcama) {
      return res.status(404).json({ error: "Harcama düzenlenemedi" })
    }

    console.log("Harcama düzenlendi:", updatedHarcama)
    res.json(updatedHarcama)
  } catch (error) {
    console.error("Hata oluştu:", error)
    res.status(500).json({ error: "Harcama düzenlenirken bir hata oluştu" })
  }
})

module.exports = router
