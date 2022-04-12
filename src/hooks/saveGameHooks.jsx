// PROBABLY MOVE INTO AN ACTION INSTEAD OF A HOOK

export const useSaveActiveGame = (state) => {
    try {
        console.log(state)
        const { player, ai, tiles, plays } = state
        let gameInfo = {
            player,
            ai,
            tiles,
            plays
        }
        
    } catch (error) {
        console.log(error)
    }
}