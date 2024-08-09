export default function wasAttackSuccess(move) {
	// Generate a random number between 0 and 100
	const randomValue = Math.random() * 100

	// Check if the random value is less than or equal to the accuracy
	const result = randomValue <= move.accuracy
	console.log(`Was Attack Successful: ${result}`)

	return result
}
