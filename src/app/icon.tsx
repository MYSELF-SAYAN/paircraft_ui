import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    fontWeight:900,
                    background: 'linear-gradient(90deg, #7C3AED 0%, #0072FF 100%)',
                    // backgroundClip: 'text',
                    // WebkitBackgroundClip: 'text',
                    // WebkitTextFillColor: 'transparent',
                    color: 'white',
                    borderRadius: '50%',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {"</>"}
            </div>
        ),
        {

            ...size,
        }
    )
}
