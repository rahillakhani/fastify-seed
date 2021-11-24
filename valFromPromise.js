
const valFromPromise = new Promise((resolve, reject)=> {
    const testNum = 11;
    setTimeout(() => {
        if(testNum % 5 == 0){
            resolve({msg: "it has been resolved", data: {value: testNum}});
        } else {
            reject({msg: "it has failed to resolve", data: {value: testNum}});
        }
    }, 2000);
});

const getPromise = async () => {
    return await valFromPromise.then((data) => data).catch(err => err);
};

export default getPromise;