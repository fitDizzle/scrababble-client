import letterValue from "../data/letter-value.json"



export function useDragoverHandler(e, type) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  if(type){
    return e.clientX

  }
}

export function useDropHandler(e, type, startX) {
  e.preventDefault();


  if(type){
    const data = e.dataTransfer.getData("block-letter-data");
    console.log(`${type} yo`)
    const tile = document.getElementById(data)

    let tileInfo = {
      tile: tile.attributes[3].nodeValue,
      id: data,
      value: letterValue[tile.attributes[3].nodeValue],
      difference: startX - e.clientX
    }
    
    return tileInfo
  }

  if (e.target.children.length === 0) {
    const data = e.dataTransfer.getData("block-letter-data");
    const tile = document.getElementById(data)
    let newMove = {
      tile: tile.attributes[3].nodeValue,
      value: letterValue[tile.attributes[3].nodeValue],
      id: data,
      parentX: parseInt(e.target.attributes[1].nodeValue),
      parentY: parseInt(e.target.attributes[2].nodeValue),
      tileState: "set",
      isAI: data.split("_")[0] == "AI" ? true : false,
      multiplier: e.target.attributes[3].nodeValue 
    };
    return newMove;
  }else {
    return false
  }
}

export const useBlockRefreshCheck = (passedBlock) => {
  console.log(
    "!!!!!!!!!!!!!!!block refresh check started!!!!!!!!!!!!!!!!!!!!!!"
  );
  let matchingBlock = Array.from(
    document.getElementsByClassName("block")
  ).filter(
    (block) =>
      block.attributes[1].nodeValue == passedBlock.x &&
      block.attributes[2].nodeValue == passedBlock.y
  );

  if (matchingBlock[0].children.length > 1) {
    console.log(matchingBlock[0].children, "children");
    let childToRemove = Array.from(matchingBlock[0].children).filter(
      (child) => child.attributes[1].nodeValue
    );
    console.log(childToRemove[0]);
    // matchingBlock[0].removeChild(childToRemove[0])
  }
  console.log("!!!!!!!!!!!!!!!!!!block refresh check ended!!!!!!!!!!!!!!!!!");
};

export function useChildCheck(passedBlock) {
  try {
    // console.log(passedBlock)

    let blocks = document.getElementsByClassName("block");
    // console.log(blocks)
    let matchingBlock = Array.from(blocks).filter(
      (block) =>
        parseInt(block.attributes[1].nodeValue) == parseInt(passedBlock.x) &&
        parseInt(block.attributes[2].nodeValue) == parseInt(passedBlock.y)
    );
    console.log(matchingBlock[0].childElementCount);
    // if (matchingBlock[0].children.length > 0) {
    //   return true

    // }
    // return false
  } catch (error) {
    console.log(error);
  }
}
