import { Client, Environment } from 'square'
import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import FFmpeg from 'fluent-ffmpeg'
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
  ListBucketsCommand
} from "@aws-sdk/client-s3";

//const client = new Client({
//  bearerAuthCredentials: {
//    accessToken: process.env.SQUARE_ACCESS_TOKEN as string
//  },
//  environment: Environment.Sandbox
//})
//
//const { paymentsApi } = client
//
//const payments = await paymentsApi.listPayments()
//
//console.log(payments.result.payments)

const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY as string,
    secretAccessKey: process.env.MINIO_SECRET_KEY as string,
  },
  endpoint: "http://127.0.0.1:9000"
});

const buckets = await s3.send(new ListBucketsCommand({}));

console.log(buckets);

const app = new Elysia()
  .use(swagger({
    path: '/reference'
  }))
  .get('/', () => 'Hello World!')
  .post('/payment', ({ body }) => {
    try {
      console.log(body!.data.object.payment)
      // Read Current frame of rtsp stream using ffmpeg
      FFmpeg(process.env.RTSP_STREAM as string) // Test rtsp stream
        .format('image2')
        .outputOptions('-vframes 1')
        .saveToFile(`image.png`)
        .on('end', async () => {
          const file = Bun.file('image.png')
          const arr = await file.arrayBuffer()
          const buffer = Buffer.from(arr)
          const command = new PutObjectCommand({
            Bucket: process.env.MINIO_BUCKET as string,
            Key: file.name,
            Body: buffer
          })
          await s3.send(command)
          console.log('The PNG file was uploaded to S3.')
        })
        .on('error', (err) => {
          console.error('Error:', err)
        })

      return { success: true }

    } catch (err) {
      console.error('Error:', err)
      return { error: err }
    }
  }, {
    body: t.Object({
      data: t.Any()
    })
  })
  .listen(8080)

console.log(`Listening on port 8080 🔥`)
