const { Router} = require('express');
const IndexController = require("../controllers/IndexController");
const router = Router();

const indexController = new IndexController();

router.post('/contact-us', indexController.sendContact)
router.post('/book-talent/:talent', indexController.bookTalent)
router.get('/talents', indexController.readTalents)
router.get('/talent/:talentId', indexController.readTalent)

module.exports = router;
