const testBaseURL = "http://localhost:3001/";
const fetchCall = async (url) => {
    try {
        console.log(url)
        let resp = await fetch(testBaseURL + url);
        return await resp.json();

    } 
    
    catch (error) {

        console.log("Error: " + error);
        throw error;

    }
};   

export default fetchCall;