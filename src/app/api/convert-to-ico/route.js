import sharp from 'sharp';
import toIco from 'image-to-ico';

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
    const pngBuffer = await sharp(buffer).resize(64, 64).png().toBuffer();
    const icoBuffer = await toIco([pngBuffer]);

    return new Response(icoBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/x-icon',
        'Content-Disposition': 'attachment; filename=your_image_converted.ico',
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