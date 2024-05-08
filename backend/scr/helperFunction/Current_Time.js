function getCurrentDateNewFunction() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month
    const day = today.getDate().toString(); // Don't pad the day with zero
    return `${year}-${month}-${day}`;
    
}

console.log("Date is:", getCurrentDate());


function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

module.exports = getCurrentDate , getCurrentDateNewFunction;