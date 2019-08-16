export interface IUpdateObjectInArrayOrCreateEntryParameters<T> {
  array : T[];
  finder : (el: T) => boolean;
  updatorOnFound : (previousItem: T) => T,
  creatorOnNotFound : () => T
}

export function updateObjectInArrayOrCreateEntry<T>(settings: IUpdateObjectInArrayOrCreateEntryParameters<T>) {

  let isFound = false;
  const updatedArray = settings.array.map((item, index) => {
    if (settings.finder(item)) {
      isFound = true;
      // This isn't the item we care about - keep it as-is
      return settings.updatorOnFound(item)
    }

    // Otherwise, this is the one we want - return an updated value
    return {...item}
  });

  if(!isFound) {
    updatedArray.push(settings.creatorOnNotFound())
  }
  
  return updatedArray;
}