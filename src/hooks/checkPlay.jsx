

export const useCheckPlay = (statePlays) => {
    const { current, lockedIn } = statePlays

    // console.log(statePlays)
    if(lockedIn.length === 0){
        console.log("met")
        if(current.filter(play => play.parentX == 8 && play.parentY == 8).length == 0){
            return false
        }
        return true
    }

    let x = lockedIn.map((lockedMove) => {
       let y = current.map(currentMove => {
           if(currentMove.parentX == lockedMove.parentX){
                if(currentMove.parentY == lockedMove.parentY -1 || currentMove.parentY == lockedMove.parentY + 1){
                    return true
                }
           }
           if(currentMove.parentY == lockedMove.parentY){
            if(currentMove.parentX == lockedMove.parentX -1 || currentMove.parentX == lockedMove.parentX + 1){
                return true
            }
           }
           return false
       })
       return y.includes(true) ? true : false
    })
    console.log(x)
    return x.includes(true) ? true : false

}