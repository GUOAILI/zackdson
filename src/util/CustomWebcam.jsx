
import Webcam from "react-webcam";
import { useCallback, useRef,useState } from "react";

const CustomWebcam =()=>{
    const webcamRef = useRef(null);
    const [imgSrc,setImgSrc]=useState(null);
    const [mirrored,setMirrored]=useState(false);

    // create a capture function
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    },[webcamRef]);

    const retake = () => {
        setImgSrc(null);
    }
    return (
        <>
            <div>
                {/* <input type="checkbox" checked={mirrored} onChange={e=>setMirrored(e.target.checked)} > */}
                <input type="checkbox" checked={mirrored} onChange={e=>setMirrored(!mirrored)} />
                <label>
                    是否水平镜像
                </label>
            </div>
            <div>
                {imgSrc ? (
                    <img src={imgSrc} alt="webcam" />
                    ) :(
                    <Webcam 
                        height={480} 
                        width={640} 
                        ref={webcamRef} 
                        mirrored={mirrored} 
                        screenshotFormat="image/jpeg"    
                        screenshotQuality={0.8}
                    />
                )}
            </div>
            <div>
                {imgSrc ? (
                    <button onClick={retake}>重新拍照</button>
                ) : (
                    <button onClick={capture}>请拍照</button>
                )}
            </div>
        </>
    );
}
export default CustomWebcam;
