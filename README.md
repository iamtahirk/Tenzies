# Tenzies

[Tenzies](https://tenziesreactjs.netlify.app/) is a React-based dice game where the objective is to roll dice until all of them display the same number. This project originated from the React Basic course by [Bob Ziroll](https://twitter.com/bobziroll) as part of the [Scrimba](https://scrimba.com/) Frontend Career Path, with enhancements and additional features incorporated during development.

## Additional Features

Apart from the core functionalities covered in the course, the Tenzies app includes several extra features, inspired by additional credit ideas:

- **Realistic Dice Representation**: The game features realistic-looking dice rendered using CSS.
- **Roll Tracking**: The number of rolls made during the game is tracked and displayed to the user.
- **Time Tracking**: The time taken to achieve Tenzies (all dice showing the same number) is recorded and displayed.
- **High Score Saving**: The app saves the top 10 high scores to local storage for users to track their achievements.

## How to Play

1. Click the "Roll" button to roll the dice.
2. Click on individual dice to hold them at their current value.
3. Continue rolling until all dice display the same number.
4. Once all dice match, the game resets automatically for a new round.
5. Access the modal popup to view the top 10 high scores.

## Technologies Used

- **React**: The entire app is built using React, a JavaScript library for building user interfaces.
- **useState**: React Hooks are used to manage component state.
- **useEffect**: Utilized for handling side effects such as timer updates and high score loading.
- **CSS**: Cascading Style Sheets (CSS) are used for styling components, including the realistic dice representation.

## Usage

To run the Tenzies app locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the development server.
5. Open your browser and navigate to `http://localhost:3000` to view the app.

## Acknowledgements

- Bob Ziroll: For providing the React Basic course on Scrimba, which served as the foundation for this project.
- Scrimba: For offering comprehensive frontend development courses and resources.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to explore, learn, and customize this React application!
