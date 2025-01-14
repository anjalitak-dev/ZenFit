document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("customWorkoutForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const goal = document.getElementById("goal").value;
        const difficulty = document.getElementById("difficulty").value;
        const days = parseInt(document.getElementById("days").value, 10);

        const workoutPlan = generateWorkoutPlan(goal, difficulty, days);
        displayWorkoutPlan(workoutPlan);
    });

    function generateWorkoutPlan(goal, difficulty, days) {
        const exercises = {
            strength: {
                beginner: ["Push-Ups", "Bodyweight Squats", "Plank"],
                intermediate: ["Bench Press", "Deadlifts", "Overhead Press"],
                advanced: ["Weighted Pull-Ups", "Squat Clean", "Barbell Snatch"]
            },
            endurance: {
                beginner: ["Walking", "Jumping Jacks", "Low-Intensity Cycling"],
                intermediate: ["Jogging", "Burpees", "Rowing"],
                advanced: ["Interval Sprints", "Mountain Climbers", "HIIT Circuits"]
            },
            flexibility: {
                beginner: ["Cat-Cow Stretch", "Forward Fold", "Child's Pose"],
                intermediate: ["Seated Forward Bend", "Lunge Stretch", "Bridge Pose"],
                advanced: ["Wheel Pose", "Splits", "Advanced Yoga Flows"]
            },
            weight_loss: {
                beginner: ["Brisk Walking", "Bodyweight Circuits", "Jump Rope"],
                intermediate: ["HIIT Workouts", "Rowing", "Aerobic Dance"],
                advanced: ["Stair Running", "Sprint Intervals", "Boxing Workouts"]
            }
        };

        const selectedExercises = exercises[goal][difficulty];
        const plan = [];

        for (let i = 0; i < days; i++) {
            const dayPlan = selectedExercises.map((exercise, index) => `${exercise} x ${(i + index + 1) * 10} reps`).join(", ");
            plan.push(`Day ${i + 1}: ${dayPlan}`);
        }

        return {
            days: plan,
            notes: "Focus on proper form and take rest as needed. Stay consistent and hydrated!",
            goal,
            difficulty
        };
    }

    function displayWorkoutPlan(plan) {
        const container = document.querySelector("#custom-workout-plan .container");
        const existingPlan = document.getElementById("generatedWorkoutPlan");

        if (existingPlan) {
            existingPlan.remove();
        }

        const planSection = document.createElement("div");
        planSection.id = "generatedWorkoutPlan";
        planSection.classList.add("workout-plan");

        const planHeading = document.createElement("h4");
        planHeading.textContent = "Your Custom Workout Plan:";
        planSection.appendChild(planHeading);

        const daysContainer = document.createElement("div");
        daysContainer.classList.add("workout-plan-days");

        plan.days.forEach(day => {
            const dayElement = document.createElement("div");
            dayElement.classList.add("workout-day");
            dayElement.textContent = day;
            daysContainer.appendChild(dayElement);
        });

        planSection.appendChild(daysContainer);

        const notes = document.createElement("p");
        notes.classList.add("workout-notes");
        notes.textContent = `Notes: ${plan.notes}`;
        planSection.appendChild(notes);

        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("workout-plan-buttons");

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete Plan";
        deleteBtn.addEventListener("click", () => showDeleteModal(planSection));

        buttonsContainer.appendChild(deleteBtn);

        planSection.appendChild(buttonsContainer);
        container.appendChild(planSection);
    }

    function showDeleteModal(planSection) {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        const modalHeading = document.createElement("h5");
        modalHeading.textContent = "Are you sure you want to delete this workout plan?";
        modalContent.appendChild(modalHeading);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Yes, Delete";
        deleteBtn.addEventListener("click", () => {
            planSection.remove();
            modal.remove();
        });

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", () => modal.remove());

        modalContent.appendChild(deleteBtn);
        modalContent.appendChild(cancelBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }
});
