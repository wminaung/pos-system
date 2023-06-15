import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuidv4 } from "uuid";
import { config } from "@/config/config";
import QRCode from "qrcode";

const s3Config = new S3Client({
  endpoint: config.spaceEndpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});
export const generateLinkForQRCode = (locationId: number, tableId: number) => {
  return `${config.orderApiBaseUrl}?locationId=${locationId}&tableId=${tableId}`;
};
export const qrCodeImageUpload = async (
  locationId: number,
  tableId: number
) => {
  try {
    const qrImageData = await QRCode.toDataURL(
      generateLinkForQRCode(locationId, tableId)
    );
    const input = {
      Bucket: "msquarefdc",
      Key: `happy-pos/qrcode/msquare/locationId-${locationId}-tableId-${tableId}.png`,
      ACL: "public-read",
      Body: Buffer.from(
        qrImageData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
    };
    const command = new PutObjectCommand(input);
    await s3Config.send(command);
  } catch (err) {
    console.error(err);
  }
};
export const fileUpload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: "msquarefdc",
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `happy-pos/win-min-aung/${uuidv4()}-${file.originalname}`);
    },
  }),
}).array("files", 1);
