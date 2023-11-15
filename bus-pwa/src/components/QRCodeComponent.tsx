import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const mElementID = "mElementID-full-region";

interface QRCodeComponentProps {
    showBox: boolean;
    delay?: number;
    qrCodeSuccessCallback?: (decodedText: string, decodedResult: any) => void;
    qrCodeErrorCallback?: (errorMessage: string) => void;
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = (props) => {
    const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
    const isMounted = useRef(true);
    const isScanning = useRef(false);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {

        const delayMS = props.delay || 1000;
        if (!scanner && props.showBox) {
            Html5Qrcode.getCameras().then(devices => {
                if (devices && devices.length) {
                    const cameraId = devices[0].id; // Select the first camera
                    const qrCodeScanner = new Html5Qrcode(mElementID);

                    let config: any =
                    {
                        fps: 5,
                        qrbox: { width: 250, height: 250 },
                        aspectRatio: 1,
                    };

                    if (devices.length > 1) {
                        config.videoConstraints = {
                            facingMode: { exact: "environment" },
                        };
                    }

                    qrCodeScanner.start(
                        cameraId,
                        config,
                        (decodedText, decodedResult) => {
                            if (!isScanning.current) {
                                isScanning.current = true;
                                if (props.qrCodeSuccessCallback) {
                                    props.qrCodeSuccessCallback(decodedText, decodedResult);
                                }
                                setTimeout(() => {
                                    isScanning.current = false;
                                }, delayMS); // delay of 5 seconds
                            }
                        },
                        props.qrCodeErrorCallback
                    ).then(() => {
                        if (isMounted.current) {
                            setScanner(qrCodeScanner);
                        }
                    }).catch(err => {
                        console.error(`Failed to start scanner: ${err}`);
                    });
                }
            }).catch(err => {
                console.error(`Failed to get camera list: ${err}`);
            });
        } else if (scanner && !props.showBox) {
            scanner.stop().then(() => {
                if (isMounted.current) {
                    setScanner(null);
                }
            });
        }
    }, [props.showBox, scanner]);

    // // Cleanup function
    // useEffect(() => {
    //     return () => {
    //         // scanner?.clear();
    //     };
    // }, [scanner]);

    return (
        <div id={mElementID} />
    );
}

export default QRCodeComponent;
