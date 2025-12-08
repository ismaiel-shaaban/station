// components/common/ConfirmationModal.js
import { useTranslation } from "@/utils/useTranslation";
import { useEffect } from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, isDisappearConfirm }) => {
    const { $t } = useTranslation();
    
    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Handle Escape key
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscapeKey);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="modal-backdrop" 
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999
            }}
            onClick={handleBackdropClick}
        >
            <div 
                className="modal-content" 
                style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    width: "500px",
                    maxWidth: "90%",
                    maxHeight: "90vh",
                    overflow: "auto",
                    position: "relative",
                    zIndex: 10000
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header" style={{ borderBottom: "1px solid #dee2e6", padding: "1rem" }}>
                    <h5 className="modal-title">
                        {title}
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={onClose}
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body" style={{ padding: "1rem" }}>
                    {message}
                </div>
                <div className="modal-footer" style={{ borderTop: "1px solid #dee2e6", padding: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        إلغاء
                    </button>
                    {!isDisappearConfirm && (
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >
                            تأكيد
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;