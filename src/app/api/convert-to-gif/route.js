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
    const gifBuffer = await sharp(buffer).gif().toBuffer();

    return new Response(gifBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/gif',
        'Content-Disposition': 'attachment; filename=your_image_converted.gif',
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