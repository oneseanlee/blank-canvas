
'use client'

export function MatrixBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-50"
      >
        <source
          src="https://storage.googleapis.com/msgsndr/HAUHIKH4QhgbgKCPEnEu/media/690fffdc93683ee99998425f.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
    </div>
  )
}
