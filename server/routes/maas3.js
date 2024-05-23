// server/routes/maas3.js

const express = require("express")
const router = express.Router()
const Maas3 = require("../models/Maas3")

// Yeni maaş kaydı oluşturma
router.post("/", async (req, res) => {
  try {
    console.log("POST request received") // Log eklendi
    console.log("Request body:", req.body) // Log eklendi

    const { aciklama, kullanim, miktar } = req.body

    const newMaas = new Maas3({
      aciklama,
      kullanim,
      miktar,
    })
    console.log("newmaas", newMaas)

    const savedMaas = await newMaas.save()
    console.log("Saved document:", savedMaas) // Log eklendi
    res.status(201).json(savedMaas)
  } catch (error) {
    console.error("Error saving data:", error) // Log eklendi
    res.status(500).json({ error: "Failed to save the data" })
  }
})

// Tüm maaşları getir
router.get("/", async (req, res) => {
  try {
    const maaslar = await Maas3.find()
    res.json(maaslar)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
