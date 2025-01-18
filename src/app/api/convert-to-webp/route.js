import sharp from 'sharp';

export async function POST(req) {
  try {
    const { image } = await req.json();

    if (!image) {
      return new Response(JSON.stringify({ error: 'Image is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const buffer = Buffer.from(image.split(',')[1], 'base64');
    const webpBuffer = await sharp(buffer).webp().toBuffer();

    return new Response(webpBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Content-Disposition': 'attachment; filename=your_image_converted.webp',
      },
    });
  } catch (error) {
    console.error(error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to process the image' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}