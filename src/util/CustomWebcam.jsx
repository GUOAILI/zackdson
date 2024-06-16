import Webcam from "react-webcam";
import { useCallback, useRef,useState,useImperativeHandle,forwardRef } from "react";

const CustomWebcam =(props,ref)=>{
    const webcamRef = useRef(null);
    const [imgSrc,setImgSrc]=useState(null);
    const [mirrored,setMirrored]=useState(false);

    // create a capture function
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        // 2024/6/15 add to share picture photo with father component
        // lmj(imageSrc);
    },[webcamRef]);

    useImperativeHandle(ref,()=>{
        return {
            mjddyz:imgSrc,
        }
    });

    const retake = () => {
        setImgSrc(null);
    }
    return (
        <>
            <div>
                {/* <input type="checkbox" checked={mirrored} onChange={e=>setMirrored(e.target.checked)} > */}
                <input type="checkbox" checked={mirrored} onChange={e=>setMirrored(!mirrored)} id='cwebcam1'/>
                <label for='cwebcam1'>
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
export default forwardRef(CustomWebcam);
