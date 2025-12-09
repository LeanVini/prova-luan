const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');  // Certifique-se que o nome e o caminho do controlador estão corretos

// Defina as rotas corretamente
router.get('/', professorController.listarProfessores);           // Para listar todos os professores
router.get('/:id', professorController.getProfessorById);         // Para buscar um professor pelo ID
router.post('/', professorController.createProfessor);             // Para criar um novo professor
router.put('/:id', professorController.updateProfessor);           // Para atualizar um professor
router.delete('/:id', professorController.deleteProfessor);       // Para deletar um professor

module.exports = router;
