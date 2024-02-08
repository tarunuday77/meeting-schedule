/// <reference types="node" />
export declare const encryptUsingKeyIv: (text: string, { key, iv, }: {
    key: Buffer;
    iv: Buffer;
}) => string;
export declare const decryptUsingKeyIv: (encryptedText: string, { key, iv, }: {
    key: Buffer;
    iv: Buffer;
}) => string;
export declare const encrypt: (text: string) => string;
export declare const decrypt: (encryptedText: string) => string;
