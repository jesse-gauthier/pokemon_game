// Function to get a random number between min and max (inclusive)
const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export default getRandomNumber
