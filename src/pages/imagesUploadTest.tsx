import supabase from "@/utils/supabaseClient";
import Image from "next/image";
import { useState } from "react";

export default function ImagesUploadTest() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setSelectedImages(files);
    }
  };

  return (
    <>
      <div className="h-screen mx-auto mt-10 mb-10">
        <h1 className="text-5xl m-16">Images Upload Test</h1>
        <div className="flex border border-black w-auto h-auto min-h-56">
          {
            selectedImages.length === 0
            ? <h2 className="flex items-center m-auto text-2xl">Images Preview</h2>
            : selectedImages.map((image, index) => (
              <div key={index} className="w-1/4 h-[250px] flex items-center justify-center">
                <Image
                  src={URL.createObjectURL(image)}
                  width={500}
                  height={500}
                  sizes="100vw"
                  className="max-h-full max-w-full object-contain"
                  alt="placeholder"
                />
              </div>
            ))
          }
        </div>
        <div className="m-12">
          <input type="file" id="image" name="image" accept="image/*" multiple onChange={handleImagesChange} />
        </div>
      </div>
    </>
  );
}
