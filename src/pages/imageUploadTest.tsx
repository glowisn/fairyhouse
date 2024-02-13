import supabase from "@/utils/supabaseClient";
import Image from "next/image";
import { useState } from "react";

export default function ImageUploadTest() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="h-screen mx-auto mt-10 mb-10">
        <h1 className="text-5xl m-16">Image Upload Test</h1>
        <div>
          {selectedImage && (
            <div className="w-2/4 h-[500px] flex items-center justify-center">
              <Image
                src={URL.createObjectURL(selectedImage)}
                width={500}
                height={500}
                sizes="100vw"
                className="max-h-full max-w-full object-contain"
                alt="placeholder"
              />
            </div>
          )}
        </div>
        <div className="m-12">
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
        </div>
      </div>
    </>
  );
}
