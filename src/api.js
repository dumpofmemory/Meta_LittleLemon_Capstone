// src/api.js

const seededRandom = function (seed) {
    var m = 2**35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
}

const fetchAPI = function(date) {
    let result = [];
    // Ensure date is a Date object before calling getDate()
    let inputDate = date instanceof Date ? date : new Date(date);
    let random = seededRandom(inputDate.getDate());

    for(let i = 17; i <= 23; i++) {
        if(random() < 0.5) {
            result.push(i + ':00');
        }
        if(random() < 0.5) {
            result.push(i + ':30');
        }
    }
    // Simulate async behavior slightly (optional but good practice)
    // return new Promise(resolve => setTimeout(() => resolve(result), 250)); // Example delay
    return result; // Keep it synchronous as per original code unless you want to simulate async
};

const submitAPI = function(formData) {
    // Simulate async behavior slightly (optional)
    // return new Promise(resolve => setTimeout(() => resolve(true), 500)); // Example delay
    console.log("Form data submitted to mock API:", formData); // Add console log
    return true; // Keep it synchronous and always successful as per original
};

// Add this export line at the bottom
export { fetchAPI, submitAPI };
