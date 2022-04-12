import { CLEAR_ERROR } from "../Redux/actions/types/errorTypes"

export const useTest = async (dispatch) => {
    console.log("use test hook")
    await dispatch({
        type: CLEAR_ERROR
    })
    console.log(dispatch, "dispatch in hook")
    return 
}