import { Transition } from "@headlessui/react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface FeedbackProps {
    message: string;
    color: "green" | "red" | "blue" | "yellow";
    show: boolean;
    onDismiss: () => void;
}
const colorStyles = {
    green: {
        bgColor: "bg-green-50",
        textColor: "text-green-800",
        iconColor: "text-green-400",
        btnBgColor: "bg-green-50",
        btnHoverColor: "hover:bg-green-100",
        btnFocusRingColor: "focus:ring-green-600 focus:ring-offset-green-50",
    },
    red: {
        bgColor: "bg-red-50",
        textColor: "text-red-800",
        iconColor: "text-red-400",
        btnBgColor: "bg-red-50",
        btnHoverColor: "hover:bg-red-100",
        btnFocusRingColor: "focus:ring-red-600 focus:ring-offset-red-50",
    },
    blue: {
        bgColor: "bg-blue-50",
        textColor: "text-blue-800",
        iconColor: "text-blue-400",
        btnBgColor: "bg-blue-50",
        btnHoverColor: "hover:bg-blue-100",
        btnFocusRingColor: "focus:ring-blue-600 focus:ring-offset-blue-50",
    },
    yellow: {
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-800",
        iconColor: "text-yellow-400",
        btnBgColor: "bg-yellow-50",
        btnHoverColor: "hover:bg-yellow-100",
        btnFocusRingColor: "focus:ring-yellow-600 focus:ring-offset-yellow-50",
    },
};

export default function Feedback({
    message,
    color,
    show,
    onDismiss,
}: FeedbackProps) {
    const styles = colorStyles[color];

    return (
        <Transition
            show={show}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div
                className={`${styles.bgColor} fixed top-0 left-0 right-0 z-50 rounded-md p-4`}
            >
                <div className="flex">
                    <div className="flex-shrink-0">
                        <CheckCircleIcon
                            className={`${styles.iconColor} h-5 w-5`}
                            aria-hidden="true"
                        />
                    </div>
                    <div className="ml-3">
                        <p
                            className={`${styles.textColor} text-sm font-medium`}
                        >
                            {message}
                        </p>
                    </div>
                    <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                            <button
                                type="button"
                                className={`inline-flex rounded-md ${styles.btnBgColor} p-1.5 text-green-500 ${styles.btnHoverColor} focus:outline-none focus:ring-2 ${styles.btnFocusRingColor}`}
                                onClick={onDismiss}
                            >
                                <span className="sr-only">masquer</span>
                                <XMarkIcon
                                    className={`${styles.iconColor} h-5 w-5`}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
}
