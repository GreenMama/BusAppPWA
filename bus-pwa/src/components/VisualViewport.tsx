import React, { useEffect, useRef, useState, CSSProperties, ReactNode } from "react";

interface VisualViewportProps {
    as?: React.ElementType;
    children?: ReactNode;
    style?: CSSProperties;
    [x: string]: any;
}

export const VisualViewport: React.FC<VisualViewportProps> = ({
    as: Element = "div",
    children,
    style = {},
    ...props
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [viewport, setViewport] = useState({
        maxHeight: "100vh",
        maxWidth: "100vw"
    });

    const updateViewport = () => {
        if (window.visualViewport) {
            setViewport({
                maxHeight: `${window.visualViewport.height}px`,
                maxWidth: `${window.visualViewport.width}px`
            });

            if (ref.current) {
                window.scrollTo(0, ref.current.offsetTop);
            }
        }
    };

    useEffect(() => {
        if (window.visualViewport) {
            updateViewport();

            window.visualViewport.addEventListener("resize", updateViewport);

            return () => {
                if (window.visualViewport) {
                    window.visualViewport.removeEventListener("resize", updateViewport);
                }
            };
        }
    }, []);


    return (
        <Element
            ref={ref}
            style={{ ...style, ...viewport }}
            {...props}
        >
            {children}
        </Element>
    );
};
