import React from 'react';

interface PlatingImageGeneratorProps {
  title: string;
  platingDescription: string;
}

export const PlatingImageGenerator: React.FC<PlatingImageGeneratorProps> = ({ title, platingDescription }) => {
  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{
          __html: `
            <iframe
              src="https://earnest-dolphin-7a7313.netlify.app"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style="border: none;"
            ></iframe>
          `
        }}
      />
    </div>
  );
};