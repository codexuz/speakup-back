import componentLoader from './component-loader.js';
import importExportFeature from "@adminjs/import-export";
import { User } from '../users/entities/user.entity.js';
import { SpeakingPart } from '../speaking-parts/entities/speaking-part.entity.js';
import { SpeakingTests } from '../speaking-tests/entities/speaking-test.entity.js';
import { SpeakingResponse } from '../speaking-response/entities/speaking-response.entity.js';
import { Otp } from '../otp/entities/otp.entity.js';
import { File } from '../files/entities/file.entity.js';
import uploadFileFeature from '@adminjs/upload';
const localProvider = {
    bucket: 'uploads/files',
    opts: {
        baseUrl: '/files',
    },
};
const options = {
    componentLoader,
    rootPath: '/admin',
    branding: {
        companyName: 'SpeakUp Edumo',
        withMadeWithLove: false
    },
    resources: [{
            resource: User,
            options: {
                name: 'Users',
                navigation: 'Auth & Users',
                properties: {
                    password_hash: {
                        isVisible: { list: false, filter: false, show: true, edit: true },
                    },
                },
            },
            features: [
                importExportFeature({ componentLoader }),
            ],
        },
        {
            resource: SpeakingTests,
            options: {
                name: 'Speaking Tests',
                navigation: 'Speaking',
                properties: {
                    createdAt: {
                        isVisible: { list: true, filter: true, show: true, edit: false },
                    },
                    updatedAt: {
                        isVisible: { list: true, filter: true, show: true, edit: false },
                    },
                },
            },
            features: [
                importExportFeature({ componentLoader }),
            ]
        },
        {
            resource: SpeakingPart,
            options: {
                name: 'Speaking Parts',
                navigation: 'Speaking',
                properties: {
                    createdAt: {
                        isVisible: { list: true, filter: true, show: true, edit: false },
                    },
                    updatedAt: {
                        isVisible: { list: true, filter: true, show: true, edit: false },
                    },
                },
            },
            features: [
                importExportFeature({ componentLoader }),
            ]
        },
        {
            resource: SpeakingResponse,
            options: {
                name: 'Speaking Responses',
                navigation: 'Speaking',
                properties: {
                    createdAt: {
                        isVisible: { list: true, filter: true, show: true, edit: false },
                    },
                    updatedAt: {
                        isVisible: { list: true, filter: true, show: true, edit: false },
                    },
                },
            },
            features: [importExportFeature({ componentLoader })]
        },
        {
            resource: Otp,
            options: {
                name: 'OTP',
                navigation: 'Auth & Users',
                properties: {
                    createdAt: {
                        isVisible: { list: true, filter: true, show: true, edit: false },
                    },
                    updatedAt: {
                        isVisible: { list: true, filter: true, show: true, edit: false },
                    },
                },
            },
            features: [importExportFeature({ componentLoader })],
        },
        {
            resource: File,
            options: {
                name: 'Files',
                navigation: 'Media',
                properties: {
                    s3Key: {
                        type: 'string',
                    },
                    bucket: {
                        type: 'string',
                    },
                    mime: {
                        type: 'string',
                    },
                    comment: {
                        type: 'textarea',
                        isSortable: false,
                    },
                },
            },
            features: [
                importExportFeature({ componentLoader }),
                uploadFileFeature({
                    componentLoader,
                    provider: { local: localProvider },
                    validation: { mimeTypes: ['image/jpeg', 'image/png', 'application/pdf', 'audio/mpeg'] },
                    properties: {
                        key: 's3Key',
                        file: 'file',
                        mimeType: 'mime',
                        bucket: 'bucket',
                        size: 'size'
                    }
                })
            ],
        }
    ],
    databases: [],
};
export default options;
//# sourceMappingURL=options.js.map