import { Html5QrcodeScanner } from 'html5-qrcode';
import React from 'react';
import { useEffect } from 'react';
import '../App.css';

const qrcodeRegionId = "html5qr-code-full-region";

interface Props {
    fps?: number;
    qrbox?: number;
    aspectRatio?: number;
    disableFlip?: boolean;
    verbose?: boolean;
    qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void;
    qrCodeErrorCallback?: (errorMessage: string) => void;
}

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: Props) => {
    let config: any = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }

    config.rememberLastUsedCamera = true;
    config.videoConstraints = {
        facingMode: { exact: "environment" },
    };


    return config;
};

const Html5QrcodePlugin: React.FC<Props> = (props) => {

    useEffect(() => {
        // when component mounts
        const config = createConfig(props);
        const verbose = props.verbose === true;
        // Suceess callback is required.
        if (!(props.qrCodeSuccessCallback)) {
            throw "qrCodeSuccessCallback is required callback.";
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);
        // html5QrcodeScanner.resume();

        // const scannerElement = document.getElementById(qrcodeRegionId);
        // if (scannerElement) {
        //     scannerElement.click();
        // }
        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    return (
        <div id={qrcodeRegionId} />
    );
};

export default Html5QrcodePlugin;
