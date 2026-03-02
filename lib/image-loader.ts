/**
 * Custom loader for Cloudinary images.
 * This offloads image optimization (resizing, format conversion) to Cloudinary's infrastructure.
 */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If it's not a Cloudinary URL, return as is (Next.js will use its default optimization for these)
  if (!src.includes("res.cloudinary.com")) {
    return src;
  }

  // Cloudinary URL format: https://res.cloudinary.com/[cloud_name]/image/upload/[transformations]/[public_id]
  // We want to inject or update transformations: f_auto (auto format), q_auto (auto quality), w_[width]
  const params = [
    `w_${width}`,
    `q_${quality || "auto"}`,
    "f_auto",
    "c_limit", // Maintain aspect ratio, don't enlarge
  ].join(",");

  // If the URL already has transformations, we need to be careful.
  // Most of our URLs look like: https://res.cloudinary.com/dzl5ymhof/image/upload/v1772231057/Detco/products/gallery/hobl4bdl6irucfceqsup.jpg
  // We insert transformations after '/upload/'
  if (src.includes("/upload/")) {
    return src.replace("/upload/", `/upload/${params}/`);
  }

  return src;
}
