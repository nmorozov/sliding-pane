import React from "react";
import Modal from "react-modal";

import "./react-sliding-pane.css";

const CLOSE_TIMEOUT = 500;

type Props = {
  isOpen: boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  from?: "left" | "right" | "bottom"; // "right" — default
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  width?: string; // CSS string for width
  closeIcon?: React.ReactNode;
  shouldCloseOnEsc?: boolean;
  hideHeader?: boolean;
  onRequestClose: () => void;
  onAfterOpen?: () => void;
};

export function ReactSlidingPane({
  isOpen,
  title,
  subtitle,
  onRequestClose,
  onAfterOpen,
  children,
  className,
  overlayClassName,
  closeIcon,
  from = "right",
  width,
  shouldCloseOnEsc,
  hideHeader = false,
}: Props) {
  const directionClass = `slide-pane_from_${from}`;

  return (
    <Modal
      ariaHideApp={false}
      className={`slide-pane ${directionClass} ${className || ""}`}
      style={{
        content: { width: width || "80%" },
      }}
      overlayClassName={`slide-pane__overlay ${overlayClassName || ""}`}
      closeTimeoutMS={CLOSE_TIMEOUT}
      isOpen={isOpen}
      shouldCloseOnEsc={shouldCloseOnEsc}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      contentLabel={`Modal "${title || ""}"`}
    >
      {!hideHeader && (
        <div className="slide-pane__header">
          <div className="slide-pane__close" onClick={onRequestClose}>
            {closeIcon || <IconClose />}
          </div>
          <div className="slide-pane__title-wrapper">
            <h2 className="slide-pane__title">{title}</h2>
            <div className="slide-pane__subtitle">{subtitle}</div>
          </div>
        </div>
      )}
      <div className="slide-pane__content">{children}</div>
    </Modal>
  );
}

function IconClose() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 22">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4 11l8 8c.6.5.6 1.5 0 2-.5.6-1.5.6-2 0l-9-9c-.6-.5-.6-1.5 0-2l9-9c.5-.6 1.5-.6 2 0 .6.5.6 1.5 0 2l-8 8z"
      />
    </svg>
  );
}

export default ReactSlidingPane;
