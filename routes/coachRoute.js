//coachRoutes

const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');

router.post('/createCoachSchedule', coachController.createCoachSchedule);

router.get('/getUserSchedule/:userId', coachController.getUserSchedule);

router.post('/subscribeToCoach', coachController.subscribeToCoach);


router.post('/createCoach', coachController.createCoach);

router.delete('/deleteCoach/:id', coachController.deleteCoach);

router.get('/getAllCoaches', coachController.getAllCoaches);

module.exports = router;