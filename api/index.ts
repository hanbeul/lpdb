import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import FFmpeg from 'fluent-ffmpeg'
import {
  S3Client,
  PutObjectCommand,
  ListBucketsCommand
} from "@aws-sdk/client-s3";
import { db, visitTable } from './db';

async function testReadLicensePlate(imageUrl: string) {
  // Random 7 character long string
  const licensePlate = Math.random().toString(36).substring(2, 9);
  return licensePlate;
}

const lp = await testReadLicensePlate("https://www.example.com/image.png");
console.log(lp);

const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY as string,
    secretAccessKey: process.env.MINIO_SECRET_KEY as string,
  },
  endpoint: process.env.MINIO_ENDPOINT as string,
  forcePathStyle: true
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
      console.log(body!.data)
      const amount_money = body!.data.object.payment.amount_money.amount
      const imageKey = `${Date.now().toString()}.png`

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
            Key: imageKey,
            Body: buffer
          })
          await s3.send(command)
          console.log('The PNG file was uploaded to S3.')
          const imageUrl = `http://0.0.0.0:9000/${process.env.MINIO_BUCKET}/${imageKey}`

          const licensePlate = await testReadLicensePlate(imageUrl)
          console.log("licensePlate", licensePlate)

          await db.insert(visitTable).values({
            license_plate: licensePlate,
            image: imageUrl,
            amount_money: amount_money,
            metadata: body!.data.object.payment
          })

          console.log('Visit inserted into database')


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
  .get('/visits', async () => {
    const visits = await db.select().from(visitTable)
    console.log(visits)
    return visits
  })
  .listen(8080)

console.log(`Listening on port 8080 🔥`)
