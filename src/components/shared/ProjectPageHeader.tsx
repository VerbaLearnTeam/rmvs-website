import Image from "next/image";
import { ReactNode } from "react";

interface ProjectPageHeaderProps {
  stickerSrc: string;
  stickerAlt: string;
  children: ReactNode;
}

export default function ProjectPageHeader({
  stickerSrc,
  stickerAlt,
  children,
}: ProjectPageHeaderProps) {
  return (
    <div className="project-header">
      <div className="project-header-content">{children}</div>
      <div className="project-header-sticker-wrap">
        <Image
          src={stickerSrc}
          alt={stickerAlt}
          width={512}
          height={512}
          className="project-header-sticker"
          priority
        />
      </div>
    </div>
  );
}
