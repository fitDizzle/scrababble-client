// eslint-disable-next-line import/no-anonymous-default-export
export default function (state, localValue, type) {

  return Object.keys(state)
    .map((key) => {
      if(state[key] == null){
        if(localValue[key] == null){
          return false
        }
        return true
      }else if (typeof state[key] != "object") {
        if (state[key] !== localValue[key]) {
          return true;
        } else {
          return false;
        }
      } else if (Array.isArray(state[key])) {
        if(state[key].length === 0 && localValue[key].length > 0){
          return true
        }
        return state[key]
          .map((val, i) => {
            return val !== localValue[key][i] ? true : false;
          })
          .includes(true)
          ? true
          : false;
      } else {
        return Object.keys(state[key])
          .map((localKey, i) => {
            return state[key][localKey] !== localValue[key][localKey]
              ? true
              : false;
          })
          .includes(true)
          ? true
          : false;
      }
    })
    .includes(true)
    ? true
    : false;
}
