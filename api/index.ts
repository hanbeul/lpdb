import { Client, Environment } from 'square'
import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import FFmpeg from 'fluent-ffmpeg'

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

const app = new Elysia()
  .use(swagger({
    path: '/reference'
  }))
  .get('/', () => 'Hello World!')
  .post('/payment', ({ body }) => {
    try {
      console.log(body!.data.object.payment)
      // Read Current frame of rtsp stream using ffmpeg
      FFmpeg('rtsp://localhost:8554/mystream') // Test rtsp stream
        .format('image2')
        .outputOptions('-vframes 1')
        .saveToFile(`image.png`)
        .on('end', async () => {
          console.log('The PNG file was created.')
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
