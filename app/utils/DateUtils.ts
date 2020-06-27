import moment from "moment";

export function getMomentFromTimeStamp(timestamp) {
    const hours = Math.floor(timestamp / 60);
    const minutes = timestamp % 60;
    return moment().hours(hours).minutes(minutes);    
}

export function formatTimeStamp(timestamp) {
    return getMomentFromTimeStamp(timestamp).format("hh:mm A");    
}


