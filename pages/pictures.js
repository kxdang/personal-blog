import { useState } from 'react'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'

// This is a work-in-progress page - not linked in navigation
export default function Pictures() {
  const [selectedImage, setSelectedImage] = useState(null)

  // TODO: Replace with actual Cloudinary images
  // Example structure:
  const images = [
    // {
    //   url: 'https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1234567890/photo1.jpg',
    //   alt: 'Description',
    //   width: 800,
    //   height: 600,
    // },
  ]

  return (
    <>
      <PageSEO
        title={`Photography - ${siteMetadata.author}`}
        description="My photography collection"
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            📸 Photography
          </h1>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">
              Work in Progress
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This page is currently being developed
            </p>
          </div>
        </div>

        <div className="py-12">
          {images.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">No photos uploaded yet</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add images to the images array in pages/pictures.js
              </p>
            </div>
          ) : (
            <>
              {/* Masonry Grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {images.map((image, idx) => (
                  <div
                    key={idx}
                    className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative">
                      <Image
                        src={image.url}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Lightbox Modal */}
              {selectedImage && (
                <div
                  className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <button
                    className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
                    onClick={() => setSelectedImage(null)}
                  >
                    ×
                  </button>
                  <div className="relative max-w-7xl max-h-[90vh]">
                    <Image
                      src={selectedImage.url}
                      alt={selectedImage.alt}
                      width={selectedImage.width}
                      height={selectedImage.height}
                      className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
