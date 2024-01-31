const totalDocumentCatch = new Map();

export const getTotalPageNumber = (totalLength : number, limit : number) : number => {

    if(limit <= 0) return 0;

    let totalPageNumbers = Math.ceil(totalLength / limit);
    return totalPageNumbers;

}