import { useState } from "react";
import { Box, Image, Flex } from "@mantine/core";

const RocketImageGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]); // Set first image as default

  return (
    <Box>
      {/* Large Image */}
      <Image src={selectedImage} fit="contain" height={400} width="100%" radius="md" alt="Rocket" />

      {/* Thumbnails */}
      <Flex gap="sm" mt="md" wrap="wrap" justify="center">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            height={80}
            width={80}
            radius="sm"
            style={{
              cursor: "pointer",
              border: selectedImage === img ? "2px solid blue" : "none",
            }}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default RocketImageGallery;
