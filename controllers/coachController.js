
const Coach = require('../models/coachModel');
let User = require("../models/user")
let Meal = require("../models/meal")
let CoachSch = require("../models/coachSchModel")

//1-createCoach

exports.createCoach = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, isAdmin } = req.body;
        console.log(name);
        const newCoach = new Coach({ name, email, password, isAdmin });
        const savedCoach = await newCoach.save();
        res.json(savedCoach);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//2-deleteCoach
exports.deleteCoach = async (req, res) => {
    try {
        const deletedCoach = await Coach.findByIdAndDelete(req.params.id);
        if (!deletedCoach) {
            return res.status(404).json({ message: 'Coach not found' });
        }
        res.json({ message: 'Coach deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//3-getAllCoaches
exports.getAllCoaches = async (req, res) => {
    try {
        const coaches = await Coach.find();
        res.json(coaches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//4-sub=> params{userId,coachId} then push the ids 

exports.subscribeToCoach = async (req, res) => {
    try {
        const { userId, coachId } = req.body;


        if (!userId || !coachId) {
            return res.status(400).json({ message: 'User ID and Coach ID are required' });
        }


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the coach exists
        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }

        // Check if the user is already subscribed to the coach
        if (coach.subscribe.includes(userId)) {
            return res.status(400).json({ message: 'User already subscribed to this coach' });
        }

        // Subscribe the user to the coach
        coach.subscribe.push(userId);
        await coach.save();

        res.json({ message: 'User subscribed to coach successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//5-createCoachSch=> body{userId,coachId,lunch.dinner,Exercises}

exports.createCoachSchedule = async (req, res) => {
    try {
        const { userId, coachId, lunch, dinner, exercises } = req.body;

        // Check if user, coach, lunch meal, and dinner meal exist
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }

        const lunchMeal = await Meal.findById(lunch);
        if (!lunchMeal) {
            return res.status(404).json({ message: 'Lunch meal not found' });
        }

        const dinnerMeal = await Meal.findById(dinner);
        if (!dinnerMeal) {
            return res.status(404).json({ message: 'Dinner meal not found' });
        }

        // Create coach schedule record
        const newCoachSchedule = new CoachSch({
            userId,
            coachId,
            details: {
                lunch: lunchMeal._id,
                dinner: dinnerMeal._id,
                ex: exercises
            }
        });
        const savedCoachSchedule = await newCoachSchedule.save();

        res.json(savedCoachSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};





//6-getUserSch by userId
exports.getUserSchedule = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find coach schedules for the given user ID
        const userSchedule = await CoachSch.find({ userId }).populate('coachId').populate('lunch').populate('dinner');

        res.json(userSchedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};