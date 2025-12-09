const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');

// Rota para listar todas as matérias
router.put('/:id', materiaController.updateMateria);

// Rota para criar uma nova matéria
router.post('/', materiaController.createMateria);

// quantas materias tenho
router.get('/contar', materiaController.contarMaterias);

router.get('/', materiaController.listarMaterias);

router.delete('/:id', materiaController.deleteMateria);


module.exports = router;