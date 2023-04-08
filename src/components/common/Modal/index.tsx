import { createPortal } from "react-dom";
import React, { FC, useEffect, useRef, useState } from "react";

interface ModalProps {
  children: any;
  onClose?: () => void;
  className?: string;
  isModalOpen?: boolean;
}

const Modal: FC<ModalProps> = ({
  children,
  onClose = () => {},
  className,
  isModalOpen = false,
}) => {
  const [mounted, setMounted] = useState(false);

  const [isModalOpenLocalState, setIsModalOpenLocalState] =
    useState(isModalOpen);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      const timer = setTimeout(() => setIsModalOpenLocalState(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsModalOpenLocalState(true);
    }
  }, [isModalOpen]);

  const ref = useRef(null);

  if (mounted) {
    return isModalOpenLocalState
      ? createPortal(
          <div className="absolute top-0 left-0 z-10 h-screen w-screen">
            <span
              className={`fixed top-0 left-0 h-full w-full bg-[#0008] backdrop-blur-sm ${
                isModalOpen ? "" : "fade-out"
              }`}
            />
            <div
              ref={ref}
              className={`
              ${isModalOpen ? "swipe" : "swipe-out"}
              ${
                className || ""
              } fixed top-0 left-0 z-20 flex h-screen w-screen -translate-x-[50%] -translate-y-[50%] items-center justify-center`}
              onClick={(e) => {
                if (e.target === ref.current) {
                  onClose();
                }
              }}
            >
              {children}
            </div>
          </div>,
          document.getElementById("portal")!
        )
      : null;
  } else {
    return children;
  }
};
export default Modal;
