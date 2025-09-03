import { AdminJSOptions } from "adminjs";

import componentLoader from "./component-loader.js";
import importExportFeature from "@adminjs/import-export";

import { User } from "../users/entities/user.entity.js";
import { SpeakingPart } from "../speaking-parts/entities/speaking-part.entity.js";
import { SpeakingTests } from "../speaking-tests/entities/speaking-test.entity.js";
import { SpeakingResponse } from "../speaking-response/entities/speaking-response.entity.js";
import { Otp } from "../otp/entities/otp.entity.js";
import { File } from "../files/entities/file.entity.js";
import { Reading } from "../reading/entities/reading.entity.js";
import { ReadingPassages } from "../reading-passages/entities/reading-passage.entity.js";
import { ReadingQuestion } from "../reading-questions/entities/reading-question.entity.js";
import { ReadingAnswer } from "../reading-answers/entities/reading-answer.entity.js";
import { Test } from "../tests/entities/test.entity.js";
import uploadFileFeature from "@adminjs/upload";
import { MyPurchasedTest } from "../my-purchased-tests/entities/my-purchased-test.entity.js";

const localProvider = {
  bucket: "uploads/files",
  opts: {
    baseUrl: "/files",
  },
};

const options: AdminJSOptions = {
  componentLoader,
  rootPath: "/admin",

  branding: {
    companyName: "SpeakUp Edumo",
    withMadeWithLove: false,
  },
  resources: [
    {
      resource: User,
      options: {
        name: "Users",
        navigation: "Auth & Users",
        properties: {
          password_hash: {
            isVisible: { list: false, filter: false, show: true, edit: true },
          },
        },
      },
      features: [importExportFeature({ componentLoader })],
    },
    {
      resource: SpeakingTests,
      options: {
        name: "Speaking Tests",
        navigation: "Speaking",
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
      resource: SpeakingPart,
      options: {
        name: "Speaking Parts",
        navigation: "Speaking",
        properties: {
          createdAt: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          updatedAt: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          sample_answer: { type: "richtext" },
          question: { type: "richtext" },
        },
      },
      features: [importExportFeature({ componentLoader })],
    },
    {
      resource: SpeakingResponse,
      options: {
        name: "Speaking Responses",
        navigation: "Speaking",
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
      resource: Otp,
      options: {
        name: "OTP",
        navigation: "Auth & Users",
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
        name: "Files",
        navigation: "Media",
        properties: {
          s3Key: {
            type: "string",
          },
          bucket: {
            type: "string",
          },
          mime: {
            type: "string",
          },
          comment: {
            type: "textarea",
            isSortable: false,
          },
        },
      },
      features: [
        importExportFeature({ componentLoader }),
        uploadFileFeature({
          componentLoader,
          provider: { local: localProvider },
          validation: {
            mimeTypes: [
              "image/jpeg",
              "image/png",
              "application/pdf",
              "audio/mpeg",
            ],
          },
          properties: {
            key: "s3Key",
            file: "file",
            mimeType: "mime",
            bucket: "bucket",
            size: "size",
          },
        }),
      ],
    },
    {
      resource: Reading,
      options: {
        name: "Reading Tests",
        navigation: "Reading",
        properties: {
          created_at: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          title: {
            isTitle: true,
          },
          isActive: {
            type: "boolean",
          },
        },
      },
      features: [importExportFeature({ componentLoader })],
    },
    {
      resource: ReadingPassages,
      options: {
        name: "Reading Passages",
        navigation: "Reading",
        properties: {
          created_at: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          part: {
            availableValues: [
              { value: "part1", label: "Part 1" },
              { value: "part2", label: "Part 2" },
              { value: "part3", label: "Part 3" },
              { value: "part4", label: "Part 4" },
              { value: "part5", label: "Part 5" },
            ],
          },
          reading_text: {
            type: "textarea",
            props: { rows: 20 },
          },
        },
      },
      features: [importExportFeature({ componentLoader })],
    },
    {
      resource: ReadingQuestion,
      options: {
        name: "Reading Questions",
        navigation: "Reading",
        properties: {
          created_at: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          content: {
            type: "textarea",
            props: { rows: 20 },
          },
          part: {
            availableValues: [
              { value: "part1", label: "Part 1" },
              { value: "part2", label: "Part 2" },
              { value: "part3", label: "Part 3" },
              { value: "part4", label: "Part 4" },
              { value: "part5", label: "Part 5" },
            ],
          },
        },
      },
      features: [importExportFeature({ componentLoader })],
    },
    {
      resource: ReadingAnswer,
      options: {
        name: "Reading Answers",
        navigation: "Reading",
        properties: {
          created_at: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          reading_answers: {
            type: "mixed",
            isSortable: false,
          },
        },
      },
      features: [importExportFeature({ componentLoader })],
    },
    {
      resource: Test,
      options: {
        name: "Tests",
        navigation: "Tests",
        properties: {
          created_at: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          title: {
            isTitle: true,
          },
          description: {
            type: "textarea",
            isSortable: false,
          },
          isPublished: {
            type: "boolean",
          },
        },
      },
      features: [importExportFeature({ componentLoader })],
    },
    {
      resource: MyPurchasedTest,
      options: {
        name: "Purchased Tests",
        navigation: "Tests",
      },
      features: [importExportFeature({ componentLoader })],
    },
  ],
  databases: [],
};

export default options;
