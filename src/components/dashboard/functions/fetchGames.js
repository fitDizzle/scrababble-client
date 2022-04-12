import API from "../../../utils/API"

export const fetchAllGames = async (token) => {
    try {
        let result = await API.fetchActiveGames(token)
        let games = result.data.savedGames.map(game => {
            const { id,game_player_score, game_ai_score, game_level, createdAt, game_isPlayerAcive } = game
            let date = new Date(createdAt).toDateString()
            return {
                id,
                playerScore: game_player_score,
                aiScore: game_ai_score,
                level: game_level,
                isPlayerActive: game_isPlayerAcive == 1 ? true : false,
                date
            }
        })
        return games
    } catch (error) {
        console.log(error)
    }


}