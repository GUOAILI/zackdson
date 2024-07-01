function dataURItoBlob(dataURI) {  
    // 将base64编码的URI字符串分解为头信息和实际数据  
    const byteString = atob(dataURI.split(',')[1]);  
    
    // 获取MIME类型  
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];  
    
    // 写入数组缓冲区  
    const ia = new Uint8Array(byteString.length);  
    for (let i = 0; i < byteString.length; i++) {  
      ia[i] = byteString.charCodeAt(i);  
    }  
    
    return new Blob([ia], {type:mimeString});  
  }  
    
function base64ToFile(base64Data, fileName) {  
    // 将base64转换为Blob  
    const blob = dataURItoBlob(base64Data);  
    
    // 使用Blob对象和文件名来创建一个新的File对象  
    return new File([blob], fileName, {type: blob.type, lastModified: Date.now()});  
}  

export default base64ToFile;