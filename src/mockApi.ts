const mockApi = () => {
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve({
          message: 'Hello World!!'
        });
      },1000);
    });
}

export default mockApi;