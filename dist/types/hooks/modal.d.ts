import { PropsWithChildren, ReactNode, JSX } from "react";
type ModalContext = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
};
export declare function useModalContext(): ModalContext | null;
export declare function useModal(children: ReactNode, Container: ((props: PropsWithChildren<object>) => JSX.Element) | undefined, props: object): () => (import("react/jsx-runtime").JSX.Element | import("react").Dispatch<import("react").SetStateAction<boolean>>)[];
export {};
//# sourceMappingURL=modal.d.ts.map